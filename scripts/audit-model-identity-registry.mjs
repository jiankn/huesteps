import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const strictAssets = process.argv.includes('--strict-assets');
const recipes = JSON.parse(await readFile(path.join(root, 'src', 'data', 'recipes.json'), 'utf8'));
const registry = JSON.parse(await readFile(path.join(root, 'src', 'data', 'model-identity-registry.json'), 'utf8'));
const failures = [];

const fail = (message) => failures.push(message);
const recipeSlugs = recipes.map((recipe) => recipe.slug);
const modelEntries = Object.entries(registry.models ?? {});
const registeredSlugs = modelEntries.map(([slug]) => slug);

if (registry.version !== 1) fail(`Unsupported model identity registry version: ${registry.version}`);
if (registry.status !== 'rebuild-in-progress' && registry.status !== 'production') {
  fail(`Unexpected model identity registry status: ${registry.status}`);
}

for (const slug of recipeSlugs) {
  if (!registeredSlugs.includes(slug)) fail(`Missing model identity for recipe: ${slug}`);
}
for (const slug of registeredSlugs) {
  if (!recipeSlugs.includes(slug)) fail(`Model identity has no matching recipe: ${slug}`);
}

const requiredFields = [
  'modelId',
  'apparentAge',
  'skin',
  'face',
  'eyes',
  'hair',
  'identityMarkers',
  'wardrobe',
  'backdrop'
];
const modelIds = new Map();
const identitySignatures = new Map();

for (const [slug, model] of modelEntries) {
  for (const field of requiredFields) {
    if (model[field] === undefined || model[field] === '') fail(`${slug} is missing ${field}`);
  }
  if (!/^HS-M\d{3}$/.test(model.modelId ?? '')) fail(`${slug} has invalid modelId: ${model.modelId}`);
  if (!Number.isInteger(model.apparentAge) || model.apparentAge < 24 || model.apparentAge > 49) {
    fail(`${slug} has out-of-range apparentAge: ${model.apparentAge}`);
  }

  const priorSlug = modelIds.get(model.modelId);
  if (priorSlug) fail(`${slug} and ${priorSlug} share modelId ${model.modelId}`);
  else modelIds.set(model.modelId, slug);

  const signature = ['skin', 'face', 'eyes', 'hair', 'identityMarkers']
    .map((field) => String(model[field]).trim().toLowerCase())
    .join('|');
  const priorSignatureSlug = identitySignatures.get(signature);
  if (priorSignatureSlug) fail(`${slug} and ${priorSignatureSlug} share the same written identity signature`);
  else identitySignatures.set(signature, slug);
}

const batchSlugs = Object.values(registry.batches ?? {}).flat();
for (const slug of recipeSlugs) {
  const appearances = batchSlugs.filter((candidate) => candidate === slug).length;
  if (appearances !== 1) fail(`${slug} appears in ${appearances} registry batches; expected exactly 1`);
}
for (const slug of batchSlugs) {
  if (!recipeSlugs.includes(slug)) fail(`Unknown recipe in registry batch: ${slug}`);
}

if (strictAssets) {
  const heroHashes = new Map();
  const stepHashes = new Map();
  const heroDir = path.join(root, 'src', 'assets', 'recipes-v5');

  for (const recipe of recipes) {
    const heroPath = path.join(heroDir, recipe.heroImage.replace(/\.png$/, '.webp'));
    if (!existsSync(heroPath)) {
      fail(`Missing rebuilt hero: ${path.relative(root, heroPath)}`);
    } else {
      const metadata = await sharp(heroPath).metadata();
      if (!metadata.width || !metadata.height || metadata.width < 1920 || metadata.height < 1080) {
        fail(`${recipe.slug} hero is ${metadata.width ?? 0}x${metadata.height ?? 0}; expected at least 1920x1080`);
      }
      const digest = createHash('sha256').update(await readFile(heroPath)).digest('hex');
      const priorHeroSlug = heroHashes.get(digest);
      if (priorHeroSlug) fail(`${recipe.slug} and ${priorHeroSlug} use an identical hero file`);
      else heroHashes.set(digest, recipe.slug);
    }

    for (const [index, step] of recipe.steps.entries()) {
      const stepPath = path.join(root, 'src', 'assets', 'tutorial-steps', step.image);
      if (!existsSync(stepPath)) {
        fail(`Missing rebuilt step image: ${step.image}`);
        continue;
      }
      const metadata = await sharp(stepPath).metadata();
      if (!metadata.width || !metadata.height || metadata.width < 1280 || metadata.height < 960) {
        fail(`${recipe.slug} step ${index + 1} is ${metadata.width ?? 0}x${metadata.height ?? 0}; expected at least 1280x960`);
      }
      const digest = createHash('sha256').update(await readFile(stepPath)).digest('hex');
      const priorStep = stepHashes.get(digest);
      if (priorStep) {
        fail(`${recipe.slug} step ${index + 1} reuses the identical file from ${priorStep}`);
      } else {
        stepHashes.set(digest, `${recipe.slug} step ${index + 1}`);
      }
    }

    for (const suffix of ['final', 'steps']) {
      const pinPath = path.join(root, 'public', 'pins', `${recipe.slug}-${suffix}.png`);
      if (!existsSync(pinPath)) fail(`Missing Pinterest asset: ${path.relative(root, pinPath)}`);
    }
  }
}

if (failures.length) {
  console.error(`Model identity audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Model identity registry passed: ${recipes.length} recipes, ${modelIds.size} unique model IDs`
    + (strictAssets ? ', production assets checked.' : '.')
);
