# HueSteps MVP Build Tasks

Status: the static MVP and its automated release gates are complete. Browser QA uses a repeatable local Chrome DevTools script because the session does not expose the dedicated Chrome DevTools MCP endpoint.

This checklist turns `PRD.md` into a verifiable build plan. A task is complete only when its generated output passes the stated check.

## 1. Foundation

- [x] Scaffold an Astro + TypeScript static site with trailing-slash URLs and `https://huesteps.com` as the canonical origin.
- [x] Add project scripts for development, production build, preview, content QA, and Pin generation.
- [x] Define a single token source for light/dark color, type, spacing, radius, shadow, focus, and motion.
- [x] Self-host Newsreader Variable and Geist Variable with `font-display: swap`.
- [x] Add Cloudflare Pages redirects and security headers without Functions or paid bindings.

## 2. Content Model and Inventory

- [x] Define an Astro Content Collection schema that rejects incomplete recipes at build time.
- [x] Author 24 English makeup recipes across Occasion (8), Eye Shape (6), Skin Tone (5), and Everyday (5).
- [x] Give every recipe a direct answer, quick facts, product-role recipe, preparation, 6-10 steps, adaptations, at least 3 fixes, optional product tiers, and 3-6 related recipes.
- [x] Make each recipe independently useful without a purchase and avoid unsupported testing, wear-time, price, stock, rating, or review claims.
- [x] Add unique titles, descriptions, H1s, dates, slugs, image alt text, AI disclosure, and article sources.

## 3. Visual Assets

- [x] Generate original, realistic makeup visualizations with no logos, watermarks, text, celebrity likeness, or misleading before/after claims.
- [x] Save project-bound source images in the repo and let Astro emit responsive AVIF/WebP variants.
- [x] Add an AI visualization disclosure beside every generated hero image.
- [x] Create accessible code-native placement guides with text alternatives.
- [x] Generate two substantively different 1000x1500 Pin assets per recipe: a final-look Pin and a steps/adaptation Pin.

## 4. Public Pages

- [x] Build the homepage with one primary `Find a look` CTA, four task entrances, 6-8 featured recipes, a Choose/Follow/Adapt process, editorial boundaries, and trust links.
- [x] Build four task-oriented hub pages with decision guidance, grouped recipes, an information-gain matrix, and cross-hub paths.
- [x] Build recipe pages in the PRD order with a no-JS core reading path and a focus-safe `Start the steps` anchor.
- [x] Build About, Editorial Policy, AI Image & Content Policy, Affiliate Disclosure, Privacy, Terms, and Contact & Corrections pages.
- [x] Build a useful static 404 page with paths back to hubs.

## 5. SEO, Trust, and Distribution

- [x] Emit self-canonicals, unique metadata, Organization/WebSite/Article/BreadcrumbList JSON-LD, and one H1 per indexable page.
- [x] Generate sitemap, robots.txt, RSS, and a consistent trailing-slash crawl surface.
- [x] Exclude preview hosts from indexing and keep production canonicals stable.
- [x] Ensure every recipe has a crawlable internal incoming link and no orphan route.
- [x] Add optional, disabled-by-default Cloudflare Web Analytics configuration.
- [x] Include affiliate disclosure before commercial links and use `rel="sponsored nofollow"` when links are enabled.

## 6. UX and Accessibility

- [x] Use semantic landmarks, skip link, sequential headings, descriptive links, and meaningful image alt text.
- [x] Keep all controls keyboard-operable with visible 2px+ focus and 44x44px touch targets.
- [x] Support system light/dark preferences and reduced motion with no content hidden when animation is disabled.
- [x] Verify 375, 768, 1024, and 1440px layouts with no horizontal overflow.
- [x] Keep the navigation single-line on desktop and usable without JavaScript on mobile.

## 7. Performance and Release QA

- [x] Keep recipe-page client JavaScript near zero and avoid React, GSAP, Three.js, OGL, and Lenis in production.
- [x] Eager-load only the LCP hero with fixed dimensions; lazy-load all below-the-fold images.
- [x] Run production build and inspect generated HTML, asset sizes, client chunks, sitemap, robots, RSS, canonical, H1, JSON-LD, and internal links.
- [x] Run browser QA in light/dark, reduced-motion, keyboard, desktop, mobile, and landscape modes.
- [x] Record any third-party licenses and confirm there are no secrets or paid Cloudflare bindings.

## Explicitly Deferred External Operations

These need account ownership or production credentials and are not silently performed by the code build:

- Pinterest Business Account creation, domain claim, Board creation, and Pin publishing.
- Cloudflare Pages project creation, DNS/HTTPS activation, production redirect verification, and billing-plan confirmation.
- GSC property verification and sitemap submission.
- Amazon Associates application, Tracking ID creation, and live Special Links.
- AdSense application and consent-platform integration.
