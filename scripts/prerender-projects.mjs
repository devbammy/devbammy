// Writes dist/project/<slug>/index.html for every project after the build.
// Each file is the normal app page with that project's title, description and
// preview image already in the <head>, so WhatsApp, LinkedIn, X and Facebook
// (which don't run JavaScript) show the right card when a project link is shared.
// The app still boots from the same scripts, so the page itself is unchanged.
//
// Preview images: if public/og/<slug>.jpg (or .png/.webp) exists, that file is used;
// otherwise the project's cover is copied. Keep preview images under ~300 KB so
// WhatsApp shows them.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const read = (file) => readFileSync(resolve(root, file), 'utf8');

const siteSrc = read('src/assets/data/site.js');
// Accepts the address with or without a trailing slash.
const siteUrl = siteSrc.match(/url:\s*'([^']+)'/)?.[1]?.replace(/\/+$/, '');
const siteName = siteSrc.match(/\bname:\s*'([^']+)'/)?.[1];
if (!siteUrl || !siteName) throw new Error('site.url or site.name is missing from site.js');

// --- Read projects.js without importing it (its image imports only work inside Vite).
const projectsSrc = read('src/assets/data/projects.js');
const imports = Object.fromEntries(
  [...projectsSrc.matchAll(/^import\s+(\w+)\s+from\s+'([^']+)';/gm)].map((m) => [m[1], m[2]]),
);
const str = (block, key) => {
  const m = block.match(new RegExp(`\\b${key}:\\s*'((?:\\\\'|[^'])*)'`));
  return m ? m[1].replace(/\\'/g, "'") : null;
};

const projects = projectsSrc
  .split(/\n\s*\{\s*\n(?=\s*slug:)/)
  .slice(1)
  .map((block) => {
    const coverVar = block.match(/\bcover:\s*(\w+)/)?.[1];
    return {
      slug: str(block, 'slug'),
      name: str(block, 'name'),
      summary: str(block, 'summary'),
      coverFile: coverVar && imports[coverVar],
    };
  })
  .filter((p) => p.slug && p.name);

// --- Helpers
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const MIME = { '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };

// Sniff the real image type, since a file named .png can be a JPEG.
const imageType = (buf) => {
  if (buf[0] === 0x89 && buf[1] === 0x50) return { ext: '.png', mime: 'image/png' };
  if (buf[0] === 0xff && buf[1] === 0xd8) return { ext: '.jpg', mime: 'image/jpeg' };
  if (buf.slice(8, 12).toString() === 'WEBP') return { ext: '.webp', mime: 'image/webp' };
  return null;
};

const setAttr = (html, selector, attr, value) => {
  // selector like: meta property="og:title"  |  link rel="canonical"
  const [tag, ...rest] = selector.split(' ');
  const key = rest.join(' ');
  const re = new RegExp(`(<${tag}\\s+${key}\\s+${attr}=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`index.html is missing <${selector}>`);
  return html.replace(re, `$1${esc(value)}$2`);
};

// --- Build each page
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');
mkdirSync(resolve(dist, 'og'), { recursive: true });

for (const p of projects) {
  const title = `${p.name} | ${siteName}`;
  const description = p.summary || `${p.name}, a project by ${siteName}.`;
  const url = `${siteUrl}/project/${p.slug}`;

  // Use a prepared preview image from public/og if there is one; otherwise copy the cover
  // to a stable address (/og/<slug>.<ext>).
  let image = `${siteUrl}/og.png`;
  let mime = 'image/png';
  const prepared = Object.entries(MIME).find(([ext]) =>
    existsSync(resolve(dist, 'og', `${p.slug}${ext}`)),
  );
  if (prepared) {
    image = `${siteUrl}/og/${p.slug}${prepared[0]}`;
    mime = prepared[1];
  } else if (p.coverFile) {
    const src = resolve(root, 'src/assets/data', p.coverFile);
    const type = imageType(readFileSync(src)) ?? { ext: extname(src), mime: 'image/png' };
    copyFileSync(src, resolve(dist, 'og', `${p.slug}${type.ext}`));
    image = `${siteUrl}/og/${p.slug}${type.ext}`;
    mime = type.mime;
  }

  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setAttr(html, 'meta name="description"', 'content', description);
  html = setAttr(html, 'link rel="canonical"', 'href', url);
  html = setAttr(html, 'meta property="og:url"', 'content', url);
  html = setAttr(html, 'meta property="og:title"', 'content', title);
  html = setAttr(html, 'meta property="og:description"', 'content', description);
  html = setAttr(html, 'meta property="og:image"', 'content', image);
  html = setAttr(html, 'meta property="og:image:alt"', 'content', `${p.name} screens`);
  html = setAttr(html, 'meta name="twitter:title"', 'content', title);
  html = setAttr(html, 'meta name="twitter:description"', 'content', description);
  html = setAttr(html, 'meta name="twitter:image"', 'content', image);
  // The site card's 1200x630 size doesn't apply to project covers.
  html = html
    .replace(/\s*<meta\s+property="og:image:width"[^>]*>/, '')
    .replace(/\s*<meta\s+property="og:image:height"[^>]*>/, '')
    .replace(/(<meta\s+property="og:image"[^>]*>)/, `$1\n    <meta property="og:image:type" content="${mime}" />`)
    .replace(/(<meta\s+property="og:type"\s+content=")website(")/, '$1article$2');

  const out = resolve(dist, 'project', p.slug);
  mkdirSync(out, { recursive: true });
  writeFileSync(resolve(out, 'index.html'), html);
}

// 404 page: the same app shell, kept out of search results. Hosts serve it for unknown
// addresses (for example /project/<old-slug>), and the app shows its own "not found" screen.
writeFileSync(
  resolve(dist, '404.html'),
  template.replace(/(<meta\s+name="robots"\s+content=")[^"]*(")/, '$1noindex, follow$2'),
);

console.log(`prerender: ${projects.length} project pages with their own share previews, 404.html`);
