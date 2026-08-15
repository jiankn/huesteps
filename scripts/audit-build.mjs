import { existsSync } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const recipes = JSON.parse(await readFile(path.join(root, 'src', 'data', 'recipes.json'), 'utf8'));
const fail = [];
const warn = [];

const asPosix = (value) => value.split(path.sep).join('/');

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
};

const stripTags = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const decodeBasicEntities = (value) => value
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;|&#x27;/g, "'");

const routeForHtmlFile = (file) => {
  const rel = asPosix(path.relative(distDir, file));
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
};

const routeFileForPathname = (pathname) => {
  const relative = pathname.replace(/^\/+/, '');
  if (!relative) return path.join(distDir, 'index.html');
  if (pathname.endsWith('/')) return path.join(distDir, relative, 'index.html');

  const direct = path.join(distDir, relative);
  if (existsSync(direct)) return direct;
  if (existsSync(`${direct}.html`)) return `${direct}.html`;
  return path.join(direct, 'index.html');
};

const allDistFiles = await walk(distDir);
const htmlFiles = allDistFiles.filter((file) => file.endsWith('.html'));
const siteFiles = new Set(allDistFiles.map((file) => `/${asPosix(path.relative(distDir, file))}`));
const titles = new Map();
const descriptions = new Map();
const incoming = new Map();
const pages = new Map();

const routeExists = (href) => {
  if (href === '/') return existsSync(path.join(distDir, 'index.html'));
  const noHash = href.split('#')[0].split('?')[0];
  if (!noHash || noHash.startsWith('mailto:') || noHash.startsWith('http') || noHash.startsWith('//')) return true;
  if (siteFiles.has(noHash)) return true;
  return existsSync(routeFileForPathname(noHash));
};

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const rel = `/${asPosix(path.relative(distDir, file))}`;
  const route = routeForHtmlFile(file);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) fail.push(`${rel} has ${h1Count} h1 elements.`);

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1]?.trim();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1]?.trim();
  const robotsMeta = html.match(/<meta name="robots" content="([^"]+)"/i)?.[1] ?? '';
  if (!title) fail.push(`${rel} is missing a title.`);
  if (!description) fail.push(`${rel} is missing a meta description.`);
  if (!canonical) fail.push(`${rel} is missing a canonical URL.`);
  if (title) {
    if (titles.has(title)) fail.push(`${rel} duplicates title from ${titles.get(title)}.`);
    titles.set(title, rel);
  }
  if (description) {
    if (descriptions.has(description)) fail.push(`${rel} duplicates description from ${descriptions.get(description)}.`);
    descriptions.set(description, rel);
  }

  if (/noindex/i.test(robotsMeta) && !['/404.html', '/admin/index.html'].includes(rel)) warn.push(`${rel} contains noindex.`);

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      fail.push(`${rel} has invalid JSON-LD: ${error.message}`);
    }
  }

  const visible = decodeBasicEntities(stripTags(html));
  if (/[–—]/.test(visible)) fail.push(`${rel} contains visible en dash or em dash characters.`);
  if (/鈥|�/.test(visible)) fail.push(`${rel} contains mojibake characters.`);

  for (const match of html.matchAll(/\shref="([^"]+)"/gi)) {
    const href = decodeBasicEntities(match[1]);
    if (href.startsWith('/') && !href.startsWith('//')) {
      const target = href.split('#')[0].split('?')[0] || '/';
      const sources = incoming.get(target) ?? new Set();
      if (target !== route) sources.add(route);
      incoming.set(target, sources);
      if (!routeExists(href)) fail.push(`${rel} links to missing ${href}.`);
    }
  }

  for (const match of html.matchAll(/\ssrc="([^"]+)"/gi)) {
    const src = decodeBasicEntities(match[1]);
    if (src.startsWith('/') && !src.startsWith('//') && !routeExists(src)) fail.push(`${rel} references missing asset ${src}.`);
  }

  pages.set(route, { rel, canonical, robotsMeta });
}

const homepageCanonical = pages.get('/')?.canonical;
let siteOrigin;
try {
  siteOrigin = new URL(homepageCanonical).origin;
} catch {
  fail.push('The generated homepage does not have a valid absolute canonical URL.');
}

const sitemapPath = path.join(distDir, 'sitemap.xml');
const sitemap = await readFile(sitemapPath, 'utf8');
const sitemapLocs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeBasicEntities(match[1]));
const sitemapSet = new Set(sitemapLocs);
if (!sitemapLocs.length) fail.push('sitemap.xml contains no URLs.');
if (sitemapSet.size !== sitemapLocs.length) fail.push(`sitemap.xml contains ${sitemapLocs.length - sitemapSet.size} duplicate URL entries.`);

for (const loc of sitemapLocs) {
  let url;
  try {
    url = new URL(loc);
  } catch {
    fail.push(`sitemap.xml contains an invalid absolute URL: ${loc}`);
    continue;
  }
  if (siteOrigin && url.origin !== siteOrigin) fail.push(`Sitemap URL uses the wrong origin: ${loc}`);
  if (url.search || url.hash) fail.push(`Sitemap URL must not contain a query or fragment: ${loc}`);

  const file = routeFileForPathname(url.pathname);
  if (!existsSync(file)) {
    fail.push(`Sitemap URL has no generated route: ${loc}`);
    continue;
  }

  const route = routeForHtmlFile(file);
  const page = pages.get(route);
  if (!page) {
    fail.push(`Sitemap URL does not resolve to an audited HTML page: ${loc}`);
    continue;
  }
  if (page.canonical !== loc) fail.push(`${page.rel} canonical ${page.canonical ?? '(missing)'} does not exactly match sitemap URL ${loc}.`);
  if (/noindex/i.test(page.robotsMeta)) fail.push(`Sitemap URL is noindex: ${loc}`);
}

if (siteOrigin) {
  const indexablePages = [...pages.entries()].filter(([, page]) => !/noindex/i.test(page.robotsMeta));
  for (const [route, page] of indexablePages) {
    const expectedCanonical = new URL(route, `${siteOrigin}/`).toString();
    if (page.canonical !== expectedCanonical) fail.push(`${page.rel} canonical should be ${expectedCanonical}, found ${page.canonical ?? '(missing)'}.`);
    if (!sitemapSet.has(expectedCanonical)) fail.push(`Indexable generated page is missing from sitemap.xml: ${expectedCanonical}`);
  }
  if (sitemapSet.size !== indexablePages.length) {
    fail.push(`sitemap.xml has ${sitemapSet.size} unique URLs but the build has ${indexablePages.length} indexable HTML pages.`);
  }
}

const recipeRoutes = recipes.map((recipe) => `/${recipe.hub}/${recipe.slug}/`);
if (new Set(recipeRoutes).size !== recipeRoutes.length) fail.push('Recipe data generates duplicate public routes.');
for (const route of recipeRoutes) {
  if (!pages.has(route)) fail.push(`Recipe has no generated HTML route: ${route}`);
  if (siteOrigin && !sitemapSet.has(new URL(route, `${siteOrigin}/`).toString())) fail.push(`Recipe route is missing from sitemap.xml: ${route}`);
}

const robots = await readFile(path.join(distDir, 'robots.txt'), 'utf8');
if (siteOrigin && !robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`)) fail.push(`robots.txt is missing the production sitemap URL ${siteOrigin}/sitemap.xml.`);
if (!existsSync(path.join(distDir, 'rss.xml'))) fail.push('rss.xml was not generated.');

const pinsDir = path.join(root, 'public', 'pins');
const pinFiles = (await walk(pinsDir)).filter((file) => file.endsWith('.png'));
const additionalPinVariants = {
  'natural-no-makeup-makeup': ['before-after'],
};
const expectedPinCount = recipes.length * 3
  + Object.values(additionalPinVariants).reduce((total, variants) => total + variants.length, 0);
if (pinFiles.length !== expectedPinCount) fail.push(`Expected ${expectedPinCount} Pin images for ${recipes.length} recipes, found ${pinFiles.length}.`);
for (const recipe of recipes) {
  const variants = ['final', 'steps', 'fix', ...(additionalPinVariants[recipe.slug] ?? [])];
  for (const variant of variants) {
    const file = path.join(pinsDir, `${recipe.slug}-${variant}.png`);
    if (!existsSync(file)) fail.push(`Missing Pin image ${recipe.slug}-${variant}.png.`);
    else if ((await stat(file)).size < 90_000) warn.push(`Pin image looks unexpectedly small: ${recipe.slug}-${variant}.png.`);
  }

  const currentHero = recipe.heroImage.replace(/\.png$/i, '.webp');
  const heroFile = path.join(root, 'src', 'assets', 'recipes-v5', currentHero);
  if (!existsSync(heroFile)) fail.push(`Missing production hero image asset for ${recipe.slug}: recipes-v5/${currentHero}`);
}

if (!existsSync(path.join(root, 'public', 'social', 'huesteps-default.png'))) fail.push('Missing default social image.');

for (const route of recipeRoutes) {
  const sources = incoming.get(route);
  if (!sources?.size) warn.push(`${route} has no internal incoming links detected in HTML anchors.`);
}

if (fail.length) {
  console.error('Build audit failed:');
  for (const item of fail) console.error(`- ${item}`);
  process.exit(1);
}

if (warn.length) {
  console.warn('Build audit warnings:');
  for (const item of warn) console.warn(`- ${item}`);
}

console.log(`Build audit passed: ${htmlFiles.length} HTML pages, ${sitemapSet.size} sitemap URLs, ${recipes.length} recipe routes, ${pinFiles.length} Pin images.`);
