# HueSteps image generation system

## Pinterest-to-page visual trust contract

Pinterest creative is the visual promise made before a user clicks. The destination must visibly fulfill that exact promise.

- Assign one distinct, original, non-celebrity model identity to each recipe slug. Never reuse that identity in another tutorial, including tutorials in the same look family.
- Treat the Pin, social image, website card, tutorial hero/final image, and all eight tutorial steps as one recipe-owned identity chain.
- Every asset in that chain must show the same person and the same advertised makeup look. A “similar” face, lookalike replacement, face swap, or unrelated regenerated portrait is not acceptable.
- The eight tutorial images must show the same person progressing cumulatively toward the result shown in the hero and Pin.
- Review the Pin image, destination URL, hero, and eight steps together before publishing. Any identity or makeup mismatch is a hard failure because it breaks user trust.

## HueSteps image hard rules V1

These rules are mandatory for every new HueSteps tutorial, hero image, and Pinterest Pin.

- Treat every image as credible makeup evidence, not as a generic attractive AI portrait.
- Treat premium beauty-advertising appeal as a release gate, not an optional polish pass. Every selected model must be photogenic, refined, confidently styled and capable of carrying a contemporary beauty editorial at thumbnail size. Reject an ordinary stock-portrait, passport-photo, corporate-headshot or weakly styled impression even when the image is technically realistic. This gate applies equally across skin tones, ages and face shapes; it never permits celebrity likeness, identity reuse or plastic beauty-filter skin.
- Make the face and the named makeup result large enough to sell the look and teach it. A website hero should be a tight beauty close-up with minimal unused shoulder, chest, hair height or background. A local tutorial target should normally occupy at least 60% of the instructional frame and remain readable without pinch-zoom at 360 px, 390 px and 430 px mobile viewport widths.
- Design the background deliberately for the recipe. It must strengthen model separation and makeup color, preserve accurate skin tone and support the look's editorial story without competing detail, cheap bokeh, clutter, snapshot context or color contamination.
- Lock one unique original, non-celebrity identity per tutorial and never reuse it in another tutorial. The face, apparent age, skin depth and undertone, eye color, hairline, ears, expression, wardrobe, camera perspective, pose, lighting, exposure, white balance, retouching strength and background world must remain consistent across the hero, all eight steps, and every Pin for that tutorial.
- Interpret framing consistency as controlled art direction, not a requirement to hide every step inside the same distant full-face crop. Identity, facial geometry, lens perspective, pose, lighting, exposure, white balance, retouching strength and background world remain locked. Crop may change only to serve the current `visualFocus`: brows, eyes, lash lines, cheeks and lips require a close-up or high-resolution responsive detail crop, while Step 1 and a full-look final may use a tight full-face beauty crop. Framing changes must be intentional and must not disguise identity drift.
- Preserve real human variation: irregular pores, peach fuzz, fine lines, lip grooves, individual brow hairs, small color variation, and ordinary facial asymmetry. Reject plastic skin, poreless blur, HDR texture, etched or repeated AI micro-patterns, doll eyes, duplicated lashes, and anatomy errors.
- Make the sequence cumulative. Each step changes only the named makeup area; later makeup must never appear early.
- Follow the current recipe step specification rather than a generic face routine. In an eye-shape tutorial, non-eye makeup stays constant from Step 1 through Step 8; in a full-face tutorial, cheeks, lips, and other regions change only in their explicitly named steps.
- Keep before-and-after comparisons honest. Makeup may change; facial structure, age, skin color, expression, camera angle, crop, and lighting may not.
- Use an eye-level 70–105mm-equivalent portrait perspective, soft neutral 5000–5500K light, and a clean backdrop. Everyday tutorials use a calm direct gaze, simple pulled-back hair, a matte solid top, and no distracting jewelry or logos.
- Produce tutorial step sources at 4:3 and at least 1280x960. A vertical tutorial hero must use a master of at least 1440x2560, and every other hero master must provide at least twice its intended rendered dimensions; 720px must never be the maximum hero source. Produce Pinterest Pins at 1000x1500 (2:3) or larger. Add all typography in deterministic post-production, never in the image model.
- Derive the website hero and every Pin from the approved tutorial identity chain. Never regenerate an unrelated “similar” model for social creative.
- Mark the work as AI-assisted on Pinterest and disclose AI-generated visualization on the tutorial page. Never present the model as a real client or claim first-hand wear testing.
- Reject a set for identity drift, skin-tone drift, altered eye color, anatomical errors, synthetic skin texture, mismatched makeup/text, misleading before-and-after framing, or Pin-to-page visual mismatch.

Quality score: realism 25, identity continuity 25, makeup accuracy 20, teaching clarity 15, Pinterest click value 10, technical quality 5. A set must score at least 90/100 and have no hard-fail issue.

## Shared contract

- Original non-celebrity identity. Reference images control only makeup, lighting, polish and composition; never copy the reference person.
- Photorealistic contemporary luxury beauty editorial.
- Real skin micro-texture, pores and fine lines preserved. Thin satin or soft-focus base, high color fidelity.
- Full face: 85mm beauty portrait, eye level. Eye image: 100mm macro.
- Directional 45-degree softbox, subtle negative fill, controlled rim light and specular highlights.
- Shared backdrop families: cobalt `#1248d5`, cocoa, chroma-neutral ivory/light gray, berry.
- No text, logo, watermark, packaging or trademark.

## Shared negative constraints

No celebrity likeness, cloned reference identity, off-center subject, cropped chin, cropped forehead, eye outside frame, mismatched eyes, warped eyelids, duplicated lashes, visible strip-lash band, fused jewelry, hair crossing an iris, plastic or wax skin, beauty-filter blur, porcelain whitening, gray cast, blown forehead highlight, smeared lipstick, distorted lip anatomy, generic stock smile, passport-photo mood, corporate headshot, influencer selfie, visible hands, text, logo or watermark.

## Progressive tutorial step image gate

Use this gate for every `progressive-high-detail-v2` tutorial step set, including future recipes.

- Generate independent step-state images, not a Pinterest composite, not crops from one finished look, and not the old focus-guide graphics.
- Build Step 1 once as the clean, fixed 4:3 base. Generate every later cumulative state independently from that unchanged Step 1 plus the approved hero/final reference; never propagate pixels from a failed or degraded intermediate image.
- Each recipe needs eight comparable 4:3 assets at 1280 x 960 or larger before review: `step-01` through `step-08`.
- Every image in a recipe must keep the same face and preserve skin depth, undertone, facial geometry, lens perspective, pose, lighting, white balance, background world and retouching strength. Framing may vary only according to the named target region and must remain controlled and comparable; accidental camera-distance or crop drift still fails.
- Makeup must be cumulative and visible: each image should show what changed after that step. Reject sets where the only difference is a tiny brightness, warmth or smoothing shift.
- Preserve real skin texture: visible pores, eyelid folds, fine lines, small hairs and natural product texture. Reject wax skin, heavy blur, over-sharpening, plastic pore erasure or flat AI complexion.
- A low-contrast repeated generator micro-pattern may be treated only with the deterministic edge-preserving normalizer in `scripts/normalize-ai-image-texture.mjs`, followed by full-resolution visual review. The correction must preserve real lines, freckles, eye/lip detail and makeup placement; it may not be used to conceal anatomy errors, strong spiral artifacts, identity drift or an incorrect step state.
- Start with the normalizer's conservative defaults. If full-resolution review still shows repeated fingerprint or etched texture, use the reviewed stronger tier (`--radius 3 --sigma-space 1.6 --sigma-color 18 --noise 0.65`, or up to color 22 / space 1.8 for severe low-contrast residue), then review again for waxy smoothing. A clean but plastic face still fails.
- Reject any burned-in teaching overlay: step numbers, captions, arrows, dots, makeup maps, dotted guidelines, ruler marks, split-screen separators or text. Also reject fake lash-count tick marks, eyeliner ruler strokes, brow-measuring lines, drawn crease guides and any black helper line that looks added on top of the photo. The webpage supplies all instructional text in HTML.
- Reject horizontal artifacts even if the face is otherwise attractive: gray lines across the eyes or cheeks, banding across the face, pressure-mark seams, accidental crop seams and generated guide lines are not acceptable.
- Eye-shape recipes should usually be eye macro or half-face close-up; full-face crops are allowed only if the eye technique is still clear at article-card size.
- Full-face everyday, skin-tone and occasion recipes should still be close enough for pores and product placement to read; distant portrait beauty shots are not tutorial step images.
- Review every approved asset at 360 px, 390 px and 430 px mobile viewport widths. If the user cannot see the current makeup change at normal page size without opening the source image, the asset fails regardless of its nominal pixel dimensions.
- Reject a technically clean image when the model presentation lacks premium beauty-campaign appeal, the face is visually dominated by hair/shoulders/background, or the makeup does not create a clear click-worthy focal point. Realistic does not mean ordinary, unstyled or visually flat.
- The generator may create a base portrait first, but every step image must be reviewed as a final instructional state. Do not approve a sequence only because the base portrait looks good.

Production flow:

1. Put unmodified generator outputs under `tmp/model-rebuild/<recipe>/raw/step-01.png` through `step-08.png`.
2. If the full-resolution review finds only the allowed low-contrast repeated micro-pattern, run `node scripts/normalize-progressive-step-sources.mjs --source-dir tmp/model-rebuild/<recipe>/raw --output-dir tmp/model-rebuild/<recipe>/sources`; otherwise copy clean accepted outputs into `sources` without normalization.
3. Run `node scripts/prepare-progressive-step-images.mjs --recipe <recipe> --source-dir tmp/model-rebuild/<recipe>/sources` only after the corrected source set passes visual review.
4. Run `node scripts/audit-progressive-image-set.mjs --source-dir src/assets/tutorial-steps/<recipe> --suffix -curated --output-dir tmp/model-rebuild/<recipe>/final-audit`.
5. Open the contact sheet and reject if makeup progression, anatomy, texture, crop or overlay rules fail.
6. Only after approval, remove the slug from `src/data/tutorial-visual-migrations.json`, add `visualReviewedAt` in `scripts/build-content.mjs`, rebuild content and run `pnpm.cmd run audit:content`.

## Geometry

- Full-face card/detail asset: face centroid `x=50%±3%`, eye line `y=38–42%`, complete hairline and chin, shoulders present, central 40% safe zone.
- Eye macro: both eyes, brows, inner corners, outer corners and lower lash line complete; pupil pair centered `x=50%±4%`, `y=48%±6%`.
- Skin set: vertical centered portrait, 12% headroom, nose bridge x=50%, identical camera distance/background/exposure across the set.

## Approved anchors

- Home/Occasion: `src/assets/golden/home-occasion-golden-v3-2k.webp`
- Eye Shape: `src/assets/golden/eye-shape-golden-v1.webp`
- Skin Tone: `src/assets/golden/skin-tone-golden-v1.webp`

Anchors are style and geometry references only. Every recipe uses a distinct original identity with no cross-recipe exception.

## Eye Shape batch

Hero masters: crop-safe landscape 16:9 or 3:2 at least 1536px wide before the 2560x1440 production export. Keep the complete head-and-shoulders identity available for the tutorial hero while making the specified eye anatomy clearly readable. Step assets remain independent 4:3 instructional states at 1280x960 or larger.

| Slug | Anatomy and makeup direction |
|---|---|
| `soft-glam-hooded-eyes` | Approved anchor. Hooded eyes; cobalt micro-wing visible with eyes open; cool taupe diffusion above fold. |
| `soft-shimmer-makeup-monolids` | East Asian adult with clear monolids; horizontal champagne-peach gradient; thin elongated cocoa liner; light concentrated near lash line. |
| `elongated-eye-makeup-round-eyes` | Adult with visibly round eyes and balanced sclera; matte taupe outer elongation; lifted kitten liner; no heavy lower rim. |
| `lifted-makeup-downturned-eyes` | Adult with naturally downturned outer corners; upward diffused shadow and lifted outer wing that remains educationally visible. |
| `everyday-makeup-deep-set-eyes` | Original adult model with clearly deep-set eyes and a defined brow bone; choose pearl mobile-lid light, diffused socket color, and burgundy-brown mascara. The tutorial must remain adaptable across skin depths rather than requiring a specific skin tone or ethnicity. |
| `balanced-eye-makeup-close-set-eyes` | Mature fair-neutral adult with clearly close-set eyes; bright clean inner corners, color weighted to outer thirds, outward micro-wing. |

## Skin Tone batch

Hero masters: crop-safe landscape 16:9 or 3:2 at least 1536px wide before the 2560x1440 production export, with the same neutral 5000K light, chroma-neutral light-gray backdrop, straight-on expression, head size and retouching as the approved Skin anchor. Distinct original identities. Do not let wardrobe, hair or background alter the perceived complexion. Step assets remain independent 4:3 states at 1280x960 or larger.

| Slug | Complexion and makeup direction |
|---|---|
| `cool-rosy-makeup-fair-skin` | Fair cool-rosy complexion, soft pink flush, champagne lid, cool rose satin lip; no blue cast. |
| `warm-peach-makeup-fair-skin` | Fair-to-light warm peach complexion, apricot blush, soft bronze tightline, peach-beige satin lip; no orange cast. |
| `neutral-soft-glam-olive-skin` | Approved anchor. Medium-deep neutral olive complexion, muted rose blush and rose-brown lip. |
| `warm-bronze-makeup-medium-skin` | Medium warm golden-bronze complexion, terracotta cheek, copper lid, caramel nude gloss; retain real depth. |
| `rich-berry-gold-makeup-deep-skin` | Original adult model with restrained berry cheek, antique-gold lid, and deep berry satin lip; choose a complexion and ethnicity that make the berry-gold contrast clear without requiring a specific deep-skin model. Preserve real undertone and avoid ashy highlights. |

## Occasion batch

Hero masters: crop-safe landscape 16:9 or 3:2 at least 1536px wide before the 2560x1440 production export; face centered for website, card and Pin-safe crops; makeup idea visible at thumbnail size. Step assets remain independent 4:3 states at 1280x960 or larger.

After visual approval, copy the exact selected source to `tmp/model-rebuild/<slug>/hero-master-approved.<ext>`. Automatic hero preparation accepts only this explicit approved master; rejected, `strong`, `normalized`, and generic working candidates are never selected by filename fallback. `--master-file` remains available for one explicitly selected recipe.

| Slug | Direction |
|---|---|
| `soft-glam-wedding-guest-makeup` | Rose-mauve soft glam, luminous satin base, soft sculpt, delicate gold jewelry, polished reception mood. |
| `easy-date-night-makeup` | Rosewood smoky eye, blurred berry stain, candlelit cocoa background, intimate but contemporary. |
| `polished-office-makeup-10-minutes` | Soft matte skin, defined brow, tightline, muted rose lip, architectural daylight; beauty editorial rather than corporate headshot. |
| `fresh-brunch-makeup` | Peach-coral cheek, translucent gloss, brushed brow, clean daylight, fresh but clearly made-up. |
| `holiday-party-shimmer-makeup` | Antique-gold metallic lid, separated lashes, cherry-berry lip, deep cocoa background, controlled festive specular light. |
| `easy-vacation-makeup` | Sunlit bronze skin, teal-cobalt micro accent, glossy caramel lip, hair movement, no orange grade. |
| `elegant-dinner-party-makeup` | Sculpted satin skin, elongated espresso liner, wine lip, black/cocoa drape, single sculptural earring. |
| `natural-job-interview-makeup` | Natural matte, precise brow, soft brown eye, rose-beige lip, calm confidence; premium close beauty crop, not stock office photography. |

## Everyday batch

Hero masters: crop-safe landscape 16:9 or 3:2 at least 1536px wide before the 2560x1440 production export, centered head-and-shoulders portrait, modern daylight or soft studio light, real skin and visible but repeatable makeup. Step assets remain independent 4:3 states at 1280x960 or larger.

| Slug | Direction |
|---|---|
| `5-minute-everyday-makeup` | Sheer satin base, cream blush, brushed brow, brown mascara, tinted rose balm; awake and polished. |
| `natural-no-makeup-makeup` | Corrected but visible skin texture, subtle tightline, neutral cream cheek, transparent lip, credible natural finish. |
| `easy-everyday-soft-glam` | Taupe wash, small kitten liner, lateral rose blush, soft nude gloss; clear thumbnail-level difference. |
| `wearable-clean-makeup-look` | Cloud skin, laminated-but-natural brow, cool pink watercolor blush, brown-burgundy lash, clear gloss. |
| `natural-makeup-mature-skin` | Mature adult, hydrated satin skin with fine lines preserved, softly defined eye, cream blush and rosewood balm; no age erasure. |
