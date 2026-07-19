# HueSteps model identity rebuild plan

## Scope

- 24 recipe-specific original model identities.
- Per recipe: one approved identity anchor, one high-resolution website hero/final, eight cumulative tutorial step images, two or more derived Pinterest Pins, and social/card crops.
- Cross-recipe model reuse is forbidden.
- Within-recipe identity, advertised makeup, and destination continuity are mandatory.

The machine-readable source of truth is `src/data/model-identity-registry.json`.

## Parallel ownership

| Batch | Recipes | Owner scope |
| --- | ---: | --- |
| `occasion` | 8 | HS-M001 through HS-M008 |
| `eyes-and-fair-skin` | 8 | HS-M009 through HS-M016 |
| `skin-and-everyday` | 8 | HS-M017 through HS-M024 |

Each owner writes only inside `tmp/model-rebuild/<recipe-slug>/` during generation. Shared production assets and data files are updated only by the primary agent after visual approval.

## Production sequence

1. Generate a crop-safe, photorealistic identity anchor for each recipe from its registry entry and makeup specification.
2. Review all 24 anchors together; reject lookalikes, celebrity resemblance, synthetic texture, and weak tutorial fit.
3. For each approved anchor, create one clean Step 1 base, then generate Steps 2–8 as independent cumulative states from that unchanged Step 1 base plus the approved hero as the identity/final-look reference. Do not repeatedly edit the previous step: chained edits accumulate artifacts and identity drift.
4. Review the hero plus all eight steps as one contact sheet. Reject identity drift, makeup appearing early, anatomy errors, or inconsistent crop/light.
5. Export production heroes into `src/assets/recipes-v5/` and curated steps into `src/assets/tutorial-steps/<slug>/`.
6. Generate Pinterest Pins only from the approved hero/step chain. Never generate an unrelated social portrait.
7. Run automated dimension/path checks, cross-recipe perceptual duplicate checks, identifiable full-resolution visual review, full build, and responsive browser QA.

## Image specifications

### Identity anchor and website hero

- Photorealistic beauty editorial, eye-level 70–105mm-equivalent perspective.
- Landscape 16:9 or 3:2 master, at least 1536px wide before production export.
- Crop-safe center composition for website 16:9, card, social, and Pinterest 2:3 derivatives; the head-and-shoulders subject stays within the central 42% of the canvas with generous space on every side.
- Complete hairline and chin, shoulders visible, no hands, products, text, logos, or watermark.
- The source must provide at least twice the maximum rendered width. A 720px-wide source is a hard failure.
- Preserve pores, fine lines, peach fuzz, lip grooves, individual brow hairs, and ordinary asymmetry. Reject wax skin, beauty-filter blur, or aggressive sharpening.

### Eight tutorial steps

- Eight separate 4:3 images at 1280x960 or larger.
- Same person, hair, wardrobe, camera, light, white balance, and expression throughout.
- Cumulative makeup progression; each image adds only the named step.
- A failed or visibly degraded step is never used as the source for a later step. Stop the chain, preserve the last approved base, and regenerate the failed state independently.
- Low-contrast repeated generator microtexture may be normalized with the project edge-preserving script, but the full-resolution corrected file must be reviewed again. Strong artifacts, anatomy errors, identity drift, or over-smoothed skin still fail.
- No burned-in labels, arrows, guide marks, split screens, fake tools, or hands obscuring the result.

### Pinterest trust gate

- The Pin must show the same model and same final makeup as its destination hero and Step 8.
- Pin title and visible makeup must match the linked recipe.
- Before scheduling, verify Pin file, Pin URL parameters, canonical tutorial URL, hero, and all eight steps together.
- Any mismatch blocks publication.
