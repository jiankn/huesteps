# HueSteps Design System (Legacy V1)

> Superseded for implementation by [WORKBENCH-V2.md](./WORKBENCH-V2.md). Retained only as redesign history.

This file is the implementation source of truth. It intentionally overrides the generic design-system search result where that result conflicts with `PRD.md`.

## Design Read

Greenfield beauty-editorial content product for US makeup learners. The interface combines magazine-level photography and asymmetry with practical, mobile-first recipe clarity.

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 4`
- `VISUAL_DENSITY: 4`
- Stack: Astro + TypeScript + native CSS
- Theme: system light/dark at the page level
- Shape rule: 12px surfaces and media; full pills only for compact filter chips

## Semantic Tokens

| Token | Light | Dark |
|---|---|---|
| `--canvas` | `#F7F8FA` | `#111318` |
| `--surface` | `#FFFFFF` | `#191C22` |
| `--surface-subtle` | `#EDF1F6` | `#21252D` |
| `--text-primary` | `#171A1F` | `#F3F6FA` |
| `--text-secondary` | `#5E6672` | `#B4BCC8` |
| `--accent` | `#2457D6` | `#7EA0FF` |
| `--accent-hover` | `#1D46AE` | `#9AB3FF` |
| `--accent-contrast` | `#FFFFFF` | `#0D1528` |
| `--border` | `#D9E0E8` | `#343A46` |
| `--focus` | `#0B6CFB` | `#AFC2FF` |
| `--danger` | `#B42318` | `#FF8A80` |

Components consume tokens only. Cobalt is the only page-level accent hue.

## Typography

- Display: Newsreader Variable, reserved for editorial H1/H2 moments.
- UI and body: Geist Variable.
- Mobile body: 16px minimum, 1.65 line-height.
- Reading measure: 60-75 characters on desktop.
- Hero: two lines maximum on desktop and one subhead under 20 words.

## Layout

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Content shell: 1280-1400px maximum; reading column: 72ch maximum.
- Breakpoints verified at 375, 768, 1024, and 1440px.
- High-variance desktop layouts collapse to a strict single column below 768px.
- Navigation stays 64-72px high and one line at desktop.

## Interaction

- Fast: 160ms; base: 240ms; slow: 320ms.
- Animate only opacity and transform.
- Use motion for feedback or hierarchy only, never scroll-jacking, autoplay carousels, infinite marquees, or perpetual parallax.
- `prefers-reduced-motion: reduce` removes movement and leaves content immediately visible.
- All touch targets are at least 44x44 CSS px and all focus rings are 2px or thicker.

## Page Patterns

- Homepage: asymmetric split hero, 2+1+1 task grid, asymmetric editorial recipe grid, vertical Choose/Follow/Adapt sequence, trust statement.
- Hub: direct selection guidance, static decision matrix, grouped crawlable recipe links, cross-hub next steps.
- Recipe: mobile-first title/image/facts/CTA order, then a reading column with a non-commercial summary rail on desktop.
- Products: role-first grouped alternatives, never three equal pricing cards, no prices/ratings/stock.

## Anti-Patterns

- No pink or purple gradient branding, neon glow, decorative glass, floating image labels, scroll cues, version stamps, status dots, or newsletter/social-proof fabrication.
- No three equal feature cards, fake product UI, testimonial wall, or first-person testing claim.
- No hero text longer than the viewport can hold and no duplicate CTA wording for the same intent.
- No remote font imports, client-rendered main content, or animation dependency for reading.
