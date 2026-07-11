# HueSteps Workbench V2

Status: implementation baseline

This document supersedes the visual tokens and page composition in PRD section 9.3. The PRD's content, trust, SEO, accessibility, performance, affiliate, and advertising constraints remain authoritative.

## Product objective

HueSteps should behave like a working makeup manual. A visitor must be able to choose a relevant recipe, understand the required time and difficulty, follow every step, adapt the placement, and finish without shopping.

## Design read

- Mode: redesign overhaul with content and SEO preservation
- Audience: US makeup users arriving mainly from Pinterest and Google
- Direction: Makeup Workbench
- Design variance: 6
- Motion intensity: 3
- Visual density: 7
- Stack: Astro, semantic HTML, scoped components, native CSS

## Tokens

| Role | Light | Dark |
|---|---|---|
| Canvas | `#FAF8F3` | `#171418` |
| Surface | `#FFFEFB` | `#211C22` |
| Text | `#20201E` | `#F6F3EE` |
| Muted text | `#655F5B` | `#C4BBC0` |
| Primary accent | `#54233F` | `#D6A3C2` |
| Signal | `#CBEA66` | `#CBEA66` |
| Border | `#CEC7BF` | `#4B4148` |

- Display and wordmark: Oswald Variable
- Body and UI: Geist Variable
- Shape: 4px corners for cards, fields, buttons, and media
- Shadows: used only for real elevation

## Page contracts

### Home

1. Compact single-line header
2. Working four-path intent chooser
3. Four visual content-center entries
4. Four to eight real featured recipes
5. Editorial method and trust links

### Content centers

1. Direct choosing guidance
2. Data-derived time and difficulty shortcuts
3. Three-part decision board
4. Complete recipe grid with real metadata
5. Cross-center paths

### Recipes

1. Compact hero with title, direct answer, metadata, image, and AI disclosure
2. Quick facts
3. Static HTML recipe stages and complete steps
4. Placement guide
5. Adaptations and mistakes
6. PRD-compliant suggested products with no prices or false use claims
7. Related recipes

## Advertising rules

- No advertising script is loaded in this phase.
- No fixed or reserved advertising slots are rendered.
- Future advertising should use automatic placement management, not page-specific reserved inventory.

## Release gates

- Preserve all existing public routes, canonical URLs, metadata, JSON-LD, RSS, robots, and sitemap behavior.
- One H1 per page, complete keyboard route, visible focus, 44px touch targets, and no horizontal overflow.
- Test 375, 768, 1024, and 1440 widths plus mobile landscape, dark mode, reduced motion, and JavaScript-disabled reading.
- LCP below 2.5 seconds, INP below 200ms, CLS below 0.1.
- New recipe imagery must match the recipe palette, finish, eye shape, and skin-tone intent.
