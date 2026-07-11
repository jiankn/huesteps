# Cloudflare Pages Deployment

HueSteps is a pure static Astro build. It does not need Pages Functions, Workers, D1, KV, R2, Queues, or paid bindings.

## Build Settings

- Production branch: `main`
- Build command: `pnpm build`
- Output directory: `dist`
- Node version: 22 or newer
- Root directory: repository root
- Plan: Free

Set these environment variables:

```text
PUBLIC_DEPLOY_ENV=production
PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=
```

For branch preview environments set `PUBLIC_DEPLOY_ENV=preview`. The generated HTML and Cloudflare `_headers` rules both add noindex protection to preview surfaces.

## Canonical Host

Attach `huesteps.com` as the production custom domain. Cloudflare Pages `_redirects` does not support domain-level redirects, so create one Cloudflare Redirect Rule outside Pages:

- Incoming hostname equals `www.huesteps.com`
- Target: a dynamic `https://huesteps.com` URL that preserves the original path and query string
- Status: 301

Cloudflare Universal SSL handles HTTP to HTTPS. Verify the final chain is a single redirect for both HTTP and `www` requests.

## Zero-Cost Guardrail

- Do not add Pages Functions or a `_worker.js` file.
- Do not add storage or AI bindings.
- Do not enable a paid plan automatically.
- Review Cloudflare Usage monthly and keep the infrastructure invoice at `$0.00` until a separately approved capacity need exists.

## Post-Deploy Checks

1. Open representative home, hub, recipe, trust, 404, robots, sitemap, and RSS URLs.
2. Confirm `https://huesteps.com` is the only canonical origin.
3. Confirm `*.pages.dev` responses include `X-Robots-Tag: noindex`.
4. Submit `/sitemap.xml` to Google Search Console only after production checks pass.
5. Add a Cloudflare Web Analytics token only after the separate HueSteps property exists.
