import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { HUBS, SITE, TRUST_PAGES, recipeUrl } from '@/lib/site';

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char] ?? char);

export const GET: APIRoute = async () => {
  const recipes = await getCollection('recipes');
  const stableDate = '2026-07-10';
  const urls = [
    { loc: `${SITE.url}/`, lastmod: stableDate },
    ...Object.keys(HUBS).map((slug) => ({ loc: `${SITE.url}/${slug}/`, lastmod: stableDate })),
    ...TRUST_PAGES.map(([slug]) => ({ loc: `${SITE.url}/${slug}/`, lastmod: stableDate })),
    ...recipes.map((recipe) => ({ loc: `${SITE.url}${recipeUrl(recipe.data.hub, recipe.data.slug)}`, lastmod: recipe.data.updatedAt.toISOString().slice(0, 10) }))
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({ loc, lastmod }) => `  <url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
