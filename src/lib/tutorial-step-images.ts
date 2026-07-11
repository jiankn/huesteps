import type { ImageMetadata } from 'astro';

const stepModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/tutorial-steps/**/*.webp',
  { eager: true }
);

export const getTutorialStepImage = (filename: string): ImageMetadata => {
  const normalized = filename.replaceAll('\\', '/').replace(/^\/+/, '');
  const match = Object.entries(stepModules).find(([path]) => path.endsWith(`/tutorial-steps/${normalized}`));

  if (!match) {
    throw new Error(`Missing tutorial step image: ${filename}`);
  }

  return match[1].default;
};

