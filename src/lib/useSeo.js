import { useEffect } from 'react';
import { site } from '../assets/data/site';

const setMeta = (selector, value) => {
  const el = document.head.querySelector(selector);
  if (!el || value == null) return () => {};
  const attr = el.tagName === 'LINK' ? 'href' : 'content';
  const previous = el.getAttribute(attr);
  el.setAttribute(attr, value);
  return () => el.setAttribute(attr, previous);
};

/**
 * Sets the page title, description, canonical address and social-preview tags for a route,
 * and restores the site defaults from index.html when the page unmounts.
 *
 *   useSeo({ title: 'Anivad', description: '...', path: '/project/anivad', image: cover });
 *   useSeo({ title: 'Page not found', noindex: true });
 */
export const useSeo = ({ title, description, path, image, noindex = false } = {}) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : null;
    const base = site.url.replace(/\/+$/, ''); // with or without a trailing slash
    const url = path ? `${base}${path}` : null;
    const imageUrl = image ? new URL(image, site.url).href : null;

    const previousTitle = document.title;
    if (fullTitle) document.title = fullTitle;

    const undo = [
      setMeta('meta[name="description"]', description),
      setMeta('meta[property="og:description"]', description),
      setMeta('meta[name="twitter:description"]', description),
      setMeta('meta[property="og:title"]', fullTitle),
      setMeta('meta[name="twitter:title"]', fullTitle),
      setMeta('link[rel="canonical"]', url),
      setMeta('meta[property="og:url"]', url),
      setMeta('meta[property="og:image"]', imageUrl),
      setMeta('meta[name="twitter:image"]', imageUrl),
      setMeta('meta[name="robots"]', noindex ? 'noindex, follow' : null),
    ];

    return () => {
      document.title = previousTitle;
      undo.forEach((fn) => fn());
    };
  }, [title, description, path, image, noindex]);
};
