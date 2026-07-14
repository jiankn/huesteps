import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const args = process.argv.slice(2);
const shouldSync = args.includes('--sync');
const strict = args.includes('--strict');
const recipesPath = path.join(root, 'src', 'data', 'recipes.json');
const manifestPath = path.join(root, 'src', 'data', 'tutorial-step-image-reviews.json');
const assetRoot = path.join(root, 'src', 'assets', 'tutorial-steps');
const statuses = new Set(['pending', 'approved', 'rejected']);

const recipes = JSON.parse(await readFile(recipesPath, 'utf8'));
const expected = new Map();

for (const recipe of recipes) {
  for (const [index, step] of recipe.steps.entries()) {
    const asset = step.image.replaceAll('\\', '/').replace(/^\.\//, '');
    if (expected.has(asset)) throw new Error(`Duplicate step asset in recipes.json: ${asset}`);
    const file = path.resolve(assetRoot, ...asset.split('/'));
    if (!existsSync(file)) throw new Error(`Cannot review missing step asset: ${asset}`);
    const assetSha256 = createHash('sha256').update(await readFile(file)).digest('hex');
    expected.set(asset, {
      targetRegion: step.visualFocus,
      expectedOutcome: step.outcome,
      previousStepImage: index === 0 ? null : recipe.steps[index - 1].image.replaceAll('\\', '/').replace(/^\.\//, ''),
      status: 'pending',
      reviewer: '',
      reviewedAt: '',
      assetSha256,
      notes: '',
    });
  }
}

let manifest = { version: 1, reviews: {} };
if (existsSync(manifestPath)) manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

if (shouldSync) {
  const reviews = {};
  for (const [asset, current] of expected) {
    const previous = manifest.reviews?.[asset];
    const reviewContextUnchanged = previous?.assetSha256 === current.assetSha256
      && previous?.targetRegion === current.targetRegion
      && previous?.expectedOutcome === current.expectedOutcome
      && previous?.previousStepImage === current.previousStepImage;
    reviews[asset] = reviewContextUnchanged
      ? { ...current, ...previous, targetRegion: current.targetRegion, expectedOutcome: current.expectedOutcome, previousStepImage: current.previousStepImage }
      : { ...current, notes: previous ? 'Asset or step semantics changed; approval must be repeated.' : '' };
  }
  manifest = {
    version: 1,
    reviewCriteria: [
      'The image crop clearly centers the named targetRegion.',
      'The expectedOutcome is visibly present and later-step makeup is not shown early.',
      'An intentional target-area crop and slight identity variation are allowed, but skin depth, undertone, white balance, and lighting stay comparable; cumulative makeup progress must be visible and cannot be explained only by a different face or crop.',
      'Skin texture and application detail remain clear at article display size.'
    ],
    reviews,
  };
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Step image review manifest synchronized: ${Object.keys(reviews).length} assets.`);
}

const failures = [];
const pending = [];
const reviews = manifest.reviews;
if (!reviews || typeof reviews !== 'object' || Array.isArray(reviews)) {
  failures.push('Manifest must contain a reviews object.');
} else {
  for (const [asset, current] of expected) {
    const review = reviews[asset];
    if (!review) {
      failures.push(`${asset} has no review record.`);
      continue;
    }
    for (const field of ['status', 'reviewer', 'reviewedAt', 'assetSha256', 'notes']) {
      if (typeof review[field] !== 'string') failures.push(`${asset}.${field} must be a string.`);
    }
    if (!statuses.has(review.status)) failures.push(`${asset}.status must be pending, approved, or rejected.`);
    if (review.assetSha256 !== current.assetSha256) failures.push(`${asset} changed after its manifest hash was recorded; run --sync and review it again.`);
    if (review.targetRegion !== current.targetRegion) failures.push(`${asset}.targetRegion no longer matches recipes.json.`);
    if (review.expectedOutcome !== current.expectedOutcome) failures.push(`${asset}.expectedOutcome no longer matches recipes.json.`);
    if (review.previousStepImage !== current.previousStepImage) failures.push(`${asset}.previousStepImage no longer matches recipes.json.`);

    if (review.status === 'approved' || review.status === 'rejected') {
      if (!review.reviewer?.trim() || review.reviewer.trim().length < 2) {
        failures.push(`${asset}.${review.status} requires an identifiable reviewer.`);
      }
      if (!review.reviewedAt || Number.isNaN(Date.parse(review.reviewedAt))) {
        failures.push(`${asset}.${review.status} requires a valid reviewedAt timestamp.`);
      }
      if (!review.notes?.trim() || review.notes.trim().length < 12) {
        failures.push(`${asset}.${review.status} requires specific review notes (minimum 12 characters).`);
      }
    }
    if (review.status !== 'approved') pending.push(`${asset}: ${review.status}`);
  }

  for (const asset of Object.keys(reviews)) {
    if (!expected.has(asset)) failures.push(`Manifest contains an unknown step asset: ${asset}`);
  }
}

if (strict && pending.length) {
  failures.push(`${pending.length} step images are not approved. First entries: ${pending.slice(0, 8).join(', ')}`);
}

if (failures.length) {
  console.error('Step image review audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Step image review audit passed: ${expected.size - pending.length} approved, ${pending.length} pending or rejected${strict ? ' (strict)' : ''}.`);
