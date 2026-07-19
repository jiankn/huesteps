# HueSteps project memory

## Working constraints

- Do not open subagents unless the user has explicitly approved multi-agent work for the task.
- Do not use GPT-5.6-Sol Ultra unless a genuinely exceptional task requires it.

## Pinterest-to-tutorial visual trust contract

This contract is non-negotiable for every current and future HueSteps recipe:

- One recipe owns one distinct, original, non-celebrity model identity. A model identity must never be reused by another recipe.
- Within one recipe, the Pinterest Pin, social image, website card, tutorial hero/final image, and all eight tutorial step images must show the same person and the same advertised makeup look.
- The eight step images must show that same person progressing cumulatively toward the hero/Pin result. Face shape, facial features, apparent age, skin depth and undertone, eye color, hairline, and other identity markers must not drift.
- The recipe's current step specification is the source of truth for what changes. Full-face tutorials may add cheeks and lips in their named steps; eye-shape tutorials must keep complexion, cheeks, and lips visually constant while only the named eye area progresses. Never force a generic eight-step makeup order onto a specialist tutorial.
- Create one approved clean Step 1 base per tutorial. Generate every later cumulative state independently from that unchanged base plus the approved hero/final reference; do not chain edits from the previous step or propagate a failed image.
- The project texture normalizer may remove only low-contrast repeated generator micro-patterns. It must not be used to hide anatomy errors, identity drift, incorrect makeup progression, strong spiral artifacts, or waxy over-smoothing; corrected files require another full-resolution visual review.
- A Pinterest image is the visual promise made before the click. A merely similar model or merely similar makeup on the landing page is a trust-breaking mismatch and blocks publication.
- Never publish, schedule a Pin, or deploy a new visual set until Pin-to-page identity, makeup, and destination URL have been checked together.
- Tutorial hero sources must be high-resolution masters, not 720 px maximum outputs. See `docs/image-generation-system.md` for the canonical generation, resolution, review, and rejection rules.

Every task that generates, replaces, schedules, or publishes HueSteps imagery must read and follow `docs/image-generation-system.md`.
