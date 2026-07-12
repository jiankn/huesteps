# Cloudflare Pages Deployment

HueSteps serves static Astro pages through Cloudflare Pages and uses Pages Functions plus D1 only for first-party Pinterest referral analytics. Static page delivery must remain available if analytics fails.

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

## Pinterest Analytics Setup

1. Create the D1 database and copy the returned database ID into the `d1_databases` entry in `wrangler.jsonc`:

   ```powershell
   pnpm exec wrangler d1 create huesteps-pinterest-analytics
   ```

2. Apply the checked-in migrations locally for verification, then to production:

   ```powershell
   pnpm exec wrangler d1 migrations apply huesteps-pinterest-analytics --local
   pnpm exec wrangler d1 migrations apply huesteps-pinterest-analytics --remote
   ```

3. Add both values as encrypted production secrets for the Pages project. `PINTEREST_IP_HASH_SALT` must be a cryptographically random value of at least 32 bytes. `ADMIN_ANALYTICS_TOKEN` must be a separate high-entropy token and must never be placed in a public environment variable, URL, or repository file.

   ```powershell
   pnpm exec wrangler pages secret put PINTEREST_IP_HASH_SALT --project-name huesteps
   pnpm exec wrangler pages secret put ADMIN_ANALYTICS_TOKEN --project-name huesteps
   ```

4. Confirm the Pages project has the D1 binding declared in `wrangler.jsonc`, then deploy normally through the connected Git production branch. The checked-in `_routes.json` should invoke Pages Functions only for `/api/*`.

5. Protect `/admin*` and `/api/admin/*` with Cloudflare Access in addition to the API bearer token. Use a same-origin Access application and allow only the site operator identity. Do not expose the bearer token in browser local storage; the dashboard keeps it in session storage only.

Pinterest event rows use a secret-keyed HMAC identifier rather than a raw IP address and have a 400-day retention target. The tracking Function runs low-frequency opportunistic cleanup because Pages has no scheduled trigger. Verify the cutoff after production setup and add a separately approved scheduled Worker only if traffic becomes too sparse to enforce it reliably.

## Canonical Host

Attach `huesteps.com` as the production custom domain. Cloudflare Pages `_redirects` does not support domain-level redirects, so create one Cloudflare Redirect Rule outside Pages:

- Incoming hostname equals `www.huesteps.com`
- Target: a dynamic `https://huesteps.com` URL that preserves the original path and query string
- Status: 301

Cloudflare Universal SSL handles HTTP to HTTPS. Verify the final chain is a single redirect for both HTTP and `www` requests.

## Cost Guardrail

- Keep `_routes.json` limited to `/api/*` so ordinary static requests do not invoke Functions.
- Use only the declared Pinterest analytics D1 binding; do not add unrelated storage or AI bindings without approval.
- Do not enable a paid plan automatically.
- Review Pages Functions and D1 read/write/storage usage monthly. Change plan or architecture only after a separately approved capacity need exists.

## Post-Deploy Checks

1. Open representative home, hub, recipe, trust, 404, robots, sitemap, and RSS URLs.
2. Confirm `https://huesteps.com` is the only canonical origin.
3. Confirm `*.pages.dev` responses include `X-Robots-Tag: noindex`.
4. Open a Pinterest-tagged URL and confirm one event is accepted, a repeat load in the same tab session is deduplicated, and GPC/DNT produces no event.
5. Confirm `/admin` is noindex and Access-protected, and that `/api/admin/pinterest` rejects missing or invalid authorization.
6. Confirm the dashboard shows the recorded visit without exposing a raw IP or pseudonymous identifier.
7. Submit `/sitemap.xml` to Google Search Console only after production checks pass.
8. Add a Cloudflare Web Analytics token only after the separate HueSteps property exists.
