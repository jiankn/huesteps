# Tutorial system implementation — 2026-07-11

## Outcome

HueSteps now renders every makeup recipe as a full editorial tutorial rather than a single-image or short summary page. The system covers 24 recipes, 192 structured steps, and 192 unique step-image files.

Each public recipe includes:

- a direct answer, visible author, updated date, and quick facts;
- look logic, tools, preparation, and an eight-step tutorial;
- one image, outcome, action, placement, motion, amount, timing, completion cue, correction cue, tip, and warning for every step;
- final checks, adaptations, common mistakes, FAQ, product roles, related reading, and two in-article ad positions;
- Article and Breadcrumb structured data, self-canonical metadata, and crawlable HTML content.

The required authoring and SEO rules are defined in `docs/tutorial-content-standard.md`.

## Audit baseline and correction

Before this change, the 24 recipe pages averaged about 947 core words, had no step images, and repeated a large proportion of the same long-form tutorial text. The previous content and build scripts also assumed fixed recipe/page totals.

The implementation removed those fixed totals, expanded the content schema, replaced collapsed text-only steps with semantic image-and-text steps, and added content/build/browser quality gates.

The current rendered recipe pages contain eight visible steps each and approximately 3,369–3,588 rendered words including shared page chrome. Word count is treated as a diagnostic only; the quality gate checks required tutorial information and image integrity instead of using a minimum word-count target as a proxy for usefulness.

## Image-production status

- `soft-glam-hooded-eyes` is the golden sample with eight curated progressive stage images generated from a single consistent contact sheet.
- The other 23 recipes currently have 184 unique, 720 × 540, step-specific target-area visual guides derived from their own hero art. They are useful immediate checkpoints, but they are not represented as photographed application stages.
- The step-image generator preserves curated files, so an editor can replace any guide with a true progressive image without changing the template or content model.
- The import script can split a reviewed 4 × 2 contact sheet into the eight required curated WebP files.
- After the visual-quality escalation on July 11, a curated progressive set must use individual high-detail sources and deliver 4:3 WebP files of at least 1280 × 960. Visible natural skin texture and step-accurate cumulative makeup are manual release gates; a contact-sheet crop is no longer sufficient for final tutorial art.
- New recipe slugs cannot use the legacy focus-guide status. The grandfathered backlog is explicitly listed in `src/data/tutorial-visual-migrations.json` and shrinks as each tutorial is upgraded.

## Automated gates

The normal build now runs content generation, step-image generation, content quality checks, Pin generation, Astro diagnostics, the static build, and output auditing.

Latest verification:

- Astro: 0 errors, 0 warnings, 0 hints.
- Static output: 37 HTML pages, 36 sitemap URLs, 24 recipe routes, 48 Pin images.
- Content: 24 recipes, 192 complete steps, 192 unique step images.
- Browser QA: 21 responsive/light/dark cases; no horizontal overflow, missing alt text, duplicate H1, or layout failure in the tested pages.

## Remaining editorial backlog

1. Replace the 184 target-area guides with reviewed progressive stage art, prioritizing the highest-impression recipes first.
2. Rewrite the most similar recipe pairs. The audit currently warns on three-word-shingle similarity around 45–51%; it fails the build at 60%.
3. Add supportable editorial sources where a recipe introduces factual, safety-sensitive, or product-performance claims. Current recipes intentionally avoid invented citations.
4. Re-run the full build and visual review after every curated art batch.

These are explicit backlog items, not hidden launch claims. The current system is ready for repeatable production, and its validation prevents a new recipe from shipping without the required tutorial structure and image set.
