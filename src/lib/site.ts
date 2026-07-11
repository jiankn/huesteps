export const SITE = {
  name: 'HueSteps',
  url: 'https://huesteps.com',
  tagline: 'Makeup, step by step.',
  description: 'Wearable makeup recipes for real-life occasions, adapted by eye shape and skin tone.',
  author: 'HueSteps Editorial Team',
  email: 'editorial@huesteps.com'
} as const;

export const HUBS = {
  'occasion-makeup': {
    title: 'Occasion Makeup',
    nav: 'Occasion',
    description: 'Choose a polished look by setting, time, and the amount of definition you want.',
    directAnswer: 'Start with the room and the clock. Daylight favors sheer satin; evening light can support deeper lash definition and controlled shimmer.',
    guideTitle: 'Choose by the room, not the trend',
    matrix: [
      ['Under 15 minutes', 'Office, interview, vacation', 'Targeted base, one eye shade, shared cheek-lip color'],
      ['Daylight event', 'Brunch, wedding guest', 'Real skin texture, satin reflection, clean lower eye'],
      ['Evening event', 'Date, dinner, holiday party', 'Deeper lashes, one reflective focal point, balanced lip']
    ]
  },
  'eye-shape-makeup': {
    title: 'Eye Shape Makeup',
    nav: 'Eye Shape',
    description: 'Place color where it stays visible on your eye shape instead of copying a closed-eye diagram.',
    directAnswer: 'Use your open-eye view as the map. The same shade can sit above a hood, across a monolid, or outside the iris depending on the shape goal.',
    guideTitle: 'Choose the placement change first',
    matrix: [
      ['Hooded or monolid', 'Keep color visible when eyes are open', 'Map with eyes forward; control shimmer height'],
      ['Round or close-set', 'Create visual length or spacing', 'Move depth outward; keep the inner third clear'],
      ['Downturned or deep-set', 'Lift or bring the lid forward', 'Lift the endpoint; keep socket depth restrained']
    ]
  },
  'skin-tone-undertone': {
    title: 'Skin Tone & Undertone',
    nav: 'Skin Tone',
    description: 'Keep the color idea, then adjust depth, base, and temperature so it stays clear on your skin.',
    directAnswer: 'Match depth before hue. A color should be light, medium, or deep enough to remain visible, then shifted warmer, cooler, or more neutral.',
    guideTitle: 'Depth first, undertone second',
    matrix: [
      ['Fair skin', 'Avoid sudden opacity', 'Use muted colors in transparent layers'],
      ['Olive or medium skin', 'Avoid orange or gray shifts', 'Use balanced taupe, rose-brown, copper, or caramel'],
      ['Deep skin', 'Avoid pale or ashy bases', 'Choose saturated berry, wine, cocoa, and warm old gold']
    ]
  },
  'everyday-makeup': {
    title: 'Everyday Makeup',
    nav: 'Everyday',
    description: 'Build a repeatable routine around the minutes you have and the features you want to define.',
    directAnswer: 'Spend the first minutes on the center of the face, brows, and lashes. Add eye detail only after those high-impact steps are complete.',
    guideTitle: 'Choose by available time',
    matrix: [
      ['5 minutes', 'Look awake and balanced', 'Spot concealer, brows, lashes, one cream color'],
      ['15 minutes', 'Natural polish', 'Thin base, root definition, translucent cheek and lip'],
      ['20 minutes', 'Soft everyday glam', 'Taupe gradient, satin focal point, restrained setting']
    ]
  }
} as const;

export type HubSlug = keyof typeof HUBS;

export const TRUST_PAGES = [
  ['about', 'About HueSteps'],
  ['editorial-policy', 'Editorial Policy'],
  ['ai-image-content-policy', 'AI Image & Content Policy'],
  ['affiliate-disclosure', 'Affiliate Disclosure'],
  ['privacy-policy', 'Privacy Policy'],
  ['terms-of-use', 'Terms of Use'],
  ['contact-corrections', 'Contact & Corrections']
] as const;

export const recipeUrl = (hub: string, slug: string) => `/${hub}/${slug}/`;

export const titleCase = (value: string) => value
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
