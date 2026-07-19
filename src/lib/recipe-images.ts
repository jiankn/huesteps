import type { ImageMetadata } from 'astro';

const recipeModules = import.meta.glob<{ default: ImageMetadata }>('../assets/recipes-v5/*.webp', { eager: true });

export const getRecipeImage = (filename: string): ImageMetadata => {
  const currentFilename = filename.replace(/\.png$/, '.webp');
  const match = Object.entries(recipeModules).find(([path]) => path.endsWith(`/${currentFilename}`));
  if (!match) throw new Error(`Missing production recipe image: recipes-v5/${currentFilename}`);
  return match[1].default;
};
