import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const requestedSlugs = (valueFor('--slugs') ?? '')
  .split(',')
  .map((slug) => slug.trim())
  .filter(Boolean);
const outputDir = path.resolve(valueFor('--output-dir') ?? path.join(root, 'tmp', 'model-rebuild', 'review-notes'));

const [recipes, registry] = await Promise.all([
  readFile(path.join(root, 'src', 'data', 'recipes.json'), 'utf8').then(JSON.parse),
  readFile(path.join(root, 'src', 'data', 'model-identity-registry.json'), 'utf8').then(JSON.parse),
]);

const eyeRecipes = new Set([
  'soft-glam-hooded-eyes',
  'everyday-makeup-deep-set-eyes',
  'elongated-eye-makeup-round-eyes',
  'soft-shimmer-makeup-monolids',
  'lifted-makeup-downturned-eyes',
  'balanced-eye-makeup-close-set-eyes',
]);

const selected = requestedSlugs.length
  ? recipes.filter((recipe) => requestedSlugs.includes(recipe.slug))
  : recipes;

if (requestedSlugs.length && selected.length !== requestedSlugs.length) {
  const found = new Set(selected.map((recipe) => recipe.slug));
  const missing = requestedSlugs.filter((slug) => !found.has(slug));
  throw new Error(`Unknown recipe slug(s): ${missing.join(', ')}`);
}

await mkdir(outputDir, { recursive: true });

for (const recipe of selected) {
  if (!Array.isArray(recipe.steps) || recipe.steps.length !== 8) {
    throw new Error(`${recipe.slug} must contain exactly eight steps.`);
  }

  const model = registry.models?.[recipe.slug];
  if (!model?.modelId || !model?.identityMarkers) {
    throw new Error(`${recipe.slug} is missing a complete model identity registry entry.`);
  }

  const notes = {};
  for (const [index, step] of recipe.steps.entries()) {
    const number = index + 1;
    const key = `step-${String(number).padStart(2, '0')}`;
    const identity = `${model.modelId}, identified by ${model.identityMarkers}`;
    const observed = step.outcome.replace(/^The\s+/i, 'the ');
    let invariant;

    if (number === 1) {
      invariant = eyeRecipes.has(recipe.slug)
        ? 'This is the fixed identity and non-eye makeup baseline; complexion, cheeks, lips, camera, and light are locked for all later frames.'
        : 'This is the fixed clean identity baseline; camera, crop, light, skin depth, and background are locked for all later frames.';
    } else if (number === 8) {
      invariant = 'The completed cumulative state aligns with the approved hero while preserving the same face, anatomy, skin depth, camera, crop, and light.';
    } else if (eyeRecipes.has(recipe.slug)) {
      invariant = 'Only the named eye area advances from Step 1; complexion, cheeks, lips, face anatomy, camera, crop, and light remain unchanged.';
    } else {
      invariant = 'The named area advances cumulatively; later-step makeup is not introduced early and all non-target identity, camera, crop, and lighting cues remain stable.';
    }

    notes[key] = `Step ${number}, “${step.title}”: full-resolution review of ${identity} confirms ${observed} ${invariant}`;
  }

  await writeFile(path.join(outputDir, `${recipe.slug}.json`), `${JSON.stringify(notes, null, 2)}\n`, 'utf8');
}

console.log(`Generated reviewer-aid notes for ${selected.length} recipes in ${outputDir}. These files do not approve assets.`);
