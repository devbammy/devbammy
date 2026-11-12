// Writes public/sitemap.xml and public/robots.txt from the project list.
// Runs automatically before every build (see "prebuild" in package.json),
// so adding a project to projects.js is enough to get it into the sitemap.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(resolve(root, file), 'utf8');

const siteUrl = read('src/assets/data/site.js').match(/url:\s*'([^']+)'/)?.[1];
if (!siteUrl) throw new Error('site.url is missing from src/assets/data/site.js');

const slugs = [...read('src/assets/data/projects.js').matchAll(/^\s*slug:\s*'([^']+)'/gm)].map(
  (m) => m[1],
);

const today = new Date().toISOString().slice(0, 10);
const pages = [
  { path: '/', priority: '1.0' },
  ...slugs.map((slug) => ({ path: `/project/${slug}`, priority: '0.7' })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);
writeFileSync(resolve(root, 'public/robots.txt'), robots);
console.log(`sitemap: ${pages.length} pages, robots.txt written`);
