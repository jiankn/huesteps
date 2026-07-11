# HueSteps image generation system

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

## Geometry

- Full-face card/detail asset: face centroid `x=50%±3%`, eye line `y=38–42%`, complete hairline and chin, shoulders present, central 40% safe zone.
- Eye macro: both eyes, brows, inner corners, outer corners and lower lash line complete; pupil pair centered `x=50%±4%`, `y=48%±6%`.
- Skin set: vertical centered portrait, 12% headroom, nose bridge x=50%, identical camera distance/background/exposure across the set.

## Approved anchors

- Home/Occasion: `src/assets/golden/home-occasion-golden-v1.webp`
- Eye Shape: `src/assets/golden/eye-shape-golden-v1.webp`
- Skin Tone: `src/assets/golden/skin-tone-golden-v1.webp`

Anchors are style and geometry references only. Every recipe uses a distinct original identity unless a deliberate look family requires the same person.

## Eye Shape batch

All outputs: 16:9, 1280x720-class, brow-to-upper-cheek macro, same neutral ivory-to-cocoa light and sharpness as the approved Eye anchor.

| Slug | Anatomy and makeup direction |
|---|---|
| `soft-glam-hooded-eyes` | Approved anchor. Hooded eyes; cobalt micro-wing visible with eyes open; cool taupe diffusion above fold. |
| `soft-shimmer-makeup-monolids` | East Asian adult with clear monolids; horizontal champagne-peach gradient; thin elongated cocoa liner; light concentrated near lash line. |
| `elongated-eye-makeup-round-eyes` | Adult with visibly round eyes and balanced sclera; matte taupe outer elongation; lifted kitten liner; no heavy lower rim. |
| `lifted-makeup-downturned-eyes` | Adult with naturally downturned outer corners; upward diffused shadow and lifted outer wing that remains educationally visible. |
| `everyday-makeup-deep-set-eyes` | Deep-skin adult with deep-set eyes and defined brow bone; pearl mobile-lid light, diffused socket color, burgundy-brown mascara. |
| `balanced-eye-makeup-close-set-eyes` | Mature fair-neutral adult with clearly close-set eyes; bright clean inner corners, color weighted to outer thirds, outward micro-wing. |

## Skin Tone batch

All outputs: vertical 720x1280-class, same neutral 5000K light, chroma-neutral light-gray backdrop, straight-on expression, head size and retouching as the approved Skin anchor. Distinct original identities. Do not let wardrobe, hair or background alter the perceived complexion.

| Slug | Complexion and makeup direction |
|---|---|
| `cool-rosy-makeup-fair-skin` | Fair cool-rosy complexion, soft pink flush, champagne lid, cool rose satin lip; no blue cast. |
| `warm-peach-makeup-fair-skin` | Fair-to-light warm peach complexion, apricot blush, soft bronze tightline, peach-beige satin lip; no orange cast. |
| `neutral-soft-glam-olive-skin` | Approved anchor. Medium-deep neutral olive complexion, muted rose blush and rose-brown lip. |
| `warm-bronze-makeup-medium-skin` | Medium warm golden-bronze complexion, terracotta cheek, copper lid, caramel nude gloss; retain real depth. |
| `rich-berry-gold-makeup-deep-skin` | Deep neutral-to-cool complexion, restrained berry cheek, antique-gold lid, deep berry satin lip; no ashy highlights. |

## Occasion batch

All outputs: 16:9 1280x720-class head-and-shoulders beauty portrait; face centered for card-safe crops; makeup idea visible at thumbnail size.

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

All outputs: 16:9 1280x720-class centered head-and-shoulders portrait, modern daylight or soft studio light, real skin and visible but repeatable makeup.

| Slug | Direction |
|---|---|
| `5-minute-everyday-makeup` | Sheer satin base, cream blush, brushed brow, brown mascara, tinted rose balm; awake and polished. |
| `natural-no-makeup-makeup` | Corrected but visible skin texture, subtle tightline, neutral cream cheek, transparent lip, credible natural finish. |
| `easy-everyday-soft-glam` | Taupe wash, small kitten liner, lateral rose blush, soft nude gloss; clear thumbnail-level difference. |
| `wearable-clean-makeup-look` | Cloud skin, laminated-but-natural brow, cool pink watercolor blush, brown-burgundy lash, clear gloss. |
| `natural-makeup-mature-skin` | Mature adult, hydrated satin skin with fine lines preserved, softly defined eye, cream blush and rosewood balm; no age erasure. |
