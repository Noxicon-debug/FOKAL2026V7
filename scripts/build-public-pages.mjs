import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const origin = 'https://fokalltd.com';
const pages = JSON.parse(await readFile('src/lib/public-pages.json', 'utf8'));
const template = await readFile('dist/index.html', 'utf8');

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
}

for (const [route, page] of Object.entries(pages)) {
  const canonical = origin + route;
  const image = new URL(page.image ?? '/media/home-1280.webp', origin).href;
  const tags = [
    ['name', 'description', page.description],
    ['property', 'og:title', page.title],
    ['property', 'og:description', page.description],
    ['property', 'og:url', canonical],
    ['property', 'og:image', image],
    ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.description],
    ['name', 'twitter:url', canonical],
    ['name', 'twitter:image', image],
  ].map(([attribute, name, value]) => `<meta data-rh="true" ${attribute}="${name}" content="${escapeHtml(value)}">`);

  const head = [
    `<title data-rh="true">${escapeHtml(page.title)}</title>`,
    `<link data-rh="true" rel="canonical" href="${canonical}">`,
    ...tags,
  ].join('\n    ');
  let html = template.replace(/<!-- page-metadata:start -->[\s\S]*?<!-- page-metadata:end -->/, () => head);
  if (route !== '/') html = html.replace(/<form name="(?:booking|contact)"[\s\S]*?<\/form>/g, '');

  const output = join('dist', route === '/' ? 'index.html' : `${route.slice(1)}.html`);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

const redirectFile = 'dist/_redirects';
const redirects = await readFile(redirectFile, 'utf8');
const publicRewrites = Object.keys(pages).filter(route => route !== '/')
  .map(route => `${route}  ${route}.html  200`).join('\n');
await writeFile(redirectFile, `${publicRewrites}\n${redirects}`);

const urls = Object.keys(pages).map(route => `  <url><loc>${origin}${route}</loc></url>`);
await writeFile('dist/sitemap.xml', [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  '</urlset>',
  '',
].join('\n'));
