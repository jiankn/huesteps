import type { ImageMetadata } from 'astro';

const latestModules = import.meta.glob<{ default: ImageMetadata }>('../assets/recipes-v4/*.webp', { eager: true });
const currentModules = import.meta.glob<{ default: ImageMetadata }>('../assets/recipes-v3/*.webp', { eager: true });
const legacyModules = import.meta.glob<{ default: ImageMetadata }>('../assets/recipes-v2/*.png', { eager: true });

export const getRecipeImage = (filename: string): ImageMetadata => {
  const currentFilename = filename.replace(/\.png$/, '.webp');
  const match = Object.entries(latestModules).find(([path]) => path.endsWith(`/${currentFilename}`))
    ?? Object.entries(currentModules).find(([path]) => path.endsWith(`/${currentFilename}`))
    ?? Object.entries(legacyModules).find(([path]) => path.endsWith(`/${filename}`));
  if (!match) throw new Error(`Missing recipe image: ${filename}`);
  return match[1].default;
};
