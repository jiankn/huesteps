import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const paletteItem = z.object({
  name: z.string().min(2),
  hex: z.string().regex(/^#[0-9A-F]{6}$/i),
  role: z.string().min(4),
  placement: z.string().min(8)
});

const step = z.object({
  title: z.string().min(3),
  image: z.string().regex(/^[a-z0-9-]+\/step-\d{2}(?:-curated)?\.webp$/),
  imageAlt: z.string().min(25).max(180),
  imageCaption: z.string().min(20).max(240),
  outcome: z.string().min(20),
  tool: z.string().min(3),
  productRole: z.string().min(3),
  action: z.string().min(18),
  placement: z.string().min(8),
  motion: z.string().min(8),
  amount: z.string().min(4),
  durationSeconds: z.number().int().min(10).max(600),
  whyItWorks: z.string().min(20),
  completeWhen: z.string().min(10),
  ifWrong: z.string().min(20),
  proTip: z.string().min(20),
  avoid: z.string().min(12),
  visualFocus: z.enum(['full-face', 'complexion', 'brows', 'both-eyes', 'lid', 'upper-lash', 'lower-lash', 'cheeks', 'lips', 'final'])
});

const tool = z.object({
  name: z.string().min(3),
  purpose: z.string().min(12),
  substitute: z.string().min(12)
});

const faq = z.object({
  question: z.string().min(12),
  answer: z.string().min(30)
});

const adjustment = z.object({
  for: z.string().min(3),
  change: z.string().min(18),
  why: z.string().min(12)
});

const mistake = z.object({
  problem: z.string().min(4),
  cause: z.string().min(10),
  fix: z.string().min(18)
});

const productOption = z.object({
  tier: z.enum(['Budget', 'Mid-range', 'Luxury']),
  role: z.string().min(4),
  suggestion: z.string().min(8),
  reason: z.string().min(12),
  merchant: z.string().optional(),
  verifiedAt: z.coerce.date().optional(),
  url: z.url().optional()
});

const recipes = defineCollection({
  loader: file('src/data/recipes.json'),
  schema: z.object({
    title: z.string().min(10),
    description: z.string().min(70).max(180),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    hub: z.enum(['occasion-makeup', 'eye-shape-makeup', 'skin-tone-undertone', 'everyday-makeup']),
    primaryIntent: z.string().min(20),
    directAnswer: z.string().min(45).max(240),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    authorId: z.literal('huesteps-editorial-team'),
    reviewedBy: z.literal('huesteps-editorial-team'),
    difficulty: z.enum(['Beginner', 'Easy', 'Intermediate']),
    timeMinutes: z.number().int().min(5).max(45),
    finish: z.string().min(3),
    occasions: z.array(z.string()).min(1),
    eyeShapes: z.array(z.string()).min(1),
    skinTones: z.array(z.string()).min(1),
    undertones: z.array(z.string()).min(1),
    heroImage: z.string().regex(/^[a-z0-9-]+\.png$/),
    heroAlt: z.string().min(25).max(180),
    aiGenerated: z.boolean(),
    stepImageStandard: z.enum(['progressive-high-detail-v2', 'legacy-focus-guide-v1']),
    stepImagesReviewedAt: z.coerce.date().optional(),
    palette: z.array(paletteItem).min(3).max(5),
    productRoles: z.array(z.string()).min(3).max(6),
    whatMakesItWork: z.array(z.string().min(24)).min(3).max(5),
    tools: z.array(tool).min(3).max(8),
    beforeYouStart: z.array(z.string()).min(3),
    steps: z.array(step).min(6).max(10),
    placementNotes: z.array(z.string()).min(3),
    adjustments: z.array(adjustment).min(3),
    commonMistakes: z.array(mistake).min(3),
    finishChecklist: z.array(z.string().min(20)).min(3).max(6),
    faq: z.array(faq).min(3).max(8),
    suggestedProducts: z.array(productOption).min(3),
    relatedRecipes: z.array(z.string()).min(3).max(6),
    sources: z.array(z.object({ label: z.string(), url: z.url() })),
    seasonal: z.boolean().default(false),
    featured: z.boolean().default(false)
  })
});

export const collections = { recipes };
