export interface ImageFocalPoint {
  x: number;
  y: number;
  mobileX: number;
  mobileY: number;
}

export type ImageContext = 'hero' | 'card' | 'eye' | 'montage' | 'cross';

const EYE_IMAGES = new Set([
  'soft-glam-hooded-eyes',
  'soft-shimmer-makeup-monolids',
  'elongated-eye-makeup-round-eyes',
  'lifted-makeup-downturned-eyes',
  'everyday-makeup-deep-set-eyes',
  'balanced-eye-makeup-close-set-eyes'
]);

const SKIN_IMAGES = new Set([
  'cool-rosy-makeup-fair-skin',
  'warm-peach-makeup-fair-skin',
  'neutral-soft-glam-olive-skin',
  'warm-bronze-makeup-medium-skin',
  'rich-berry-gold-makeup-deep-skin'
]);

const OVERRIDES: Record<string, Partial<ImageFocalPoint>> = {
  'natural-no-makeup-makeup': { x: 52, mobileX: 52 },
  'easy-vacation-makeup': { y: 42, mobileY: 42 },
  'natural-job-interview-makeup': { x: 51, mobileX: 51 }
};

export const getRecipeFocal = (filename: string, context: ImageContext): ImageFocalPoint => {
  const slug = filename.replace(/\.(png|webp)$/i, '');
  const base = EYE_IMAGES.has(slug) || context === 'eye'
    ? { x: 50, y: 48, mobileX: 50, mobileY: 48 }
    : SKIN_IMAGES.has(slug) || context === 'montage'
      ? { x: 50, y: 38, mobileX: 50, mobileY: 38 }
      : context === 'hero'
        ? { x: 50, y: 42, mobileX: 50, mobileY: 42 }
        : { x: 50, y: 40, mobileX: 50, mobileY: 40 };

  return { ...base, ...OVERRIDES[slug] };
};
