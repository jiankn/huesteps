import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const recipeSlug = valueFor('--recipe');
const reviewer = valueFor('--reviewer')?.trim();
const reviewedAtArg = valueFor('--reviewed-at');
const notesFileArg = valueFor('--notes-file');

if (!recipeSlug || !reviewer || !reviewedAtArg || !notesFileArg) {
  throw new Error('Usage: node scripts/set-step-image-review.mjs --recipe <slug> --reviewer <name> --reviewed-at <ISO date> --notes-file <json>');
}
if (reviewer.length < 2) throw new Error('--reviewer must identify a human reviewer.');
if (Number.isNaN(Date.parse(reviewedAtArg))) throw new Error('--reviewed-at must be a valid ISO date or timestamp.');

const reviewedAt = new Date(reviewedAtArg).toISOString();
const recipesPath = path.join(root, 'src', 'data', 'recipes.json');
const manifestPath = path.join(root, 'src', 'data', 'tutorial-step-image-reviews.json');
const assetRoot = path.join(root, 'src', 'assets', 'tutorial-steps');
const notesFile = path.resolve(notesFileArg);

const [recipes, manifest, notes] = await Promise.all([
  readFile(recipesPath, 'utf8').then(JSON.parse),
  readFile(manifestPath, 'utf8').then(JSON.parse),
  readFile(notesFile, 'utf8').then(JSON.parse),
]);

const recipe = recipes.find((candidate) => candidate.slug === recipeSlug);
if (!recipe) throw new Error(`Unknown recipe: ${recipeSlug}`);
if (!Array.isArray(recipe.steps) || recipe.steps.length !== 8) {
  throw new Error(`${recipeSlug} must contain exactly 8 steps for recipe-level approval.`);
}
if (!manifest.reviews || typeof manifest.reviews !== 'object' || Array.isArray(manifest.reviews)) {
  throw new Error('Review manifest must be synchronized before approval.');
}
if (!notes || typeof notes !== 'object' || Array.isArray(notes)) {
  throw new Error('--notes-file must be a JSON object keyed by step-01 through step-08.');
}

const expectedNoteKeys = recipe.steps.map((_, index) => `step-${String(index + 1).padStart(2, '0')}`);
const actualNoteKeys = Object.keys(notes);
const missingNoteKeys = expectedNoteKeys.filter((key) => !actualNoteKeys.includes(key));
const extraNoteKeys = actualNoteKeys.filter((key) => !expectedNoteKeys.includes(key));
if (missingNoteKeys.length || extraNoteKeys.length) {
  throw new Error(`Notes must contain exactly ${expectedNoteKeys.join(', ')}. Missing: ${missingNoteKeys.join(', ') || 'none'}. Extra: ${extraNoteKeys.join(', ') || 'none'}.`);
}

const genericNote = /^(?:ok(?:ay)?|approved|approve|pass(?:ed)?|looks? good|fine|no issues?|符合要求|审核通过|通过|没问题|正常)[.!。！\s]*$/i;
const normalizedNotes = new Set();
for (const key of expectedNoteKeys) {
  const note = notes[key];
  if (typeof note !== 'string' || [...note.trim()].length < 24) {
    throw new Error(`${key} requires a specific review note of at least 24 characters.`);
  }
  if (genericNote.test(note.trim())) throw new Error(`${key} contains only a generic approval note.`);
  const normalized = note.trim()
    .toLocaleLowerCase()
    .replace(/\bstep\s*-?\s*0?[1-8]\b/gi, '')
    .replace(/[\s\p{P}\p{S}]+/gu, ' ')
    .trim();
  if (normalizedNotes.has(normalized)) throw new Error(`${key} duplicates another step note; each step needs a specific observation.`);
  normalizedNotes.add(normalized);
}

const approvals = [];
for (const [index, step] of recipe.steps.entries()) {
  const asset = step.image.replaceAll('\\', '/').replace(/^\.\//, '');
  const expectedAsset = `${recipe.slug}/step-${String(index + 1).padStart(2, '0')}-curated.webp`;
  if (asset !== expectedAsset) throw new Error(`Cannot approve unexpected asset path: ${asset}; expected ${expectedAsset}.`);
  const file = path.resolve(assetRoot, ...asset.split('/'));
  const relativeFile = path.relative(assetRoot, file);
  if (relativeFile.startsWith('..') || path.isAbsolute(relativeFile)) {
    throw new Error(`Step asset resolves outside the production asset directory: ${asset}`);
  }
  if (!existsSync(file)) throw new Error(`Cannot approve missing production asset: ${asset}`);

  const assetSha256 = createHash('sha256').update(await readFile(file)).digest('hex');
  const review = manifest.reviews[asset];
  const previousStepImage = index === 0 ? null : recipe.steps[index - 1].image.replaceAll('\\', '/').replace(/^\.\//, '');
  if (!review) throw new Error(`${asset} has no manifest record; run steps:reviews:sync first.`);
  if (review.assetSha256 !== assetSha256
    || review.targetRegion !== step.visualFocus
    || review.expectedOutcome !== step.outcome
    || review.previousStepImage !== previousStepImage) {
    throw new Error(`${asset} is not synchronized with its current asset or step semantics; run steps:reviews:sync and review again.`);
  }

  approvals.push({
    asset,
    review: {
      ...review,
      status: 'approved',
      reviewer,
      reviewedAt,
      assetSha256,
      notes: notes[expectedNoteKeys[index]].trim(),
    },
  });
}

for (const approval of approvals) manifest.reviews[approval.asset] = approval.review;
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(`Approved 8 synchronized step images for ${recipeSlug} as ${reviewer} at ${reviewedAt}.`);
