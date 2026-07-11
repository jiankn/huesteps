import type { APIRoute } from 'astro';
import { SITE } from '@/lib/site';

export const GET: APIRoute = () => {
  const preview = import.meta.env.PUBLIC_DEPLOY_ENV === 'preview';
  const body = preview
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
