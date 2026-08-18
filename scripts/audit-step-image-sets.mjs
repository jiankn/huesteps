import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const recipes = JSON.parse(await readFile(path.join(root, 'src', 'data', 'recipes.json'), 'utf8'));
const migration = JSON.parse(await readFile(path.join(root, 'src', 'data', 'tutorial-visual-migrations.json'), 'utf8'));
const failures = [];
let audited = 0;

for (const recipe of recipes) {
  if (recipe.stepImageStandard !== migration.progressiveStandard) continue;
  const expectedDirectory = recipe.slug;
  const invalidPath = recipe.steps.find((step) => path.posix.dirname(step.image.replaceAll('\\', '/')) !== expectedDirectory);
  if (invalidPath) {
    failures.push(`${recipe.slug} has a step image outside its recipe directory: ${invalidPath.image}`);
    continue;
  }

  const hasMixedVisualFocus = new Set(recipe.steps.map((step) => step.visualFocus)).size > 1;

  const result = spawnSync(process.execPath, [
    path.join(root, 'scripts', 'audit-progressive-image-set.mjs'),
    '--source-dir', path.join(root, 'src', 'assets', 'tutorial-steps', recipe.slug),
    '--suffix', '-curated',
    '--output-dir', path.join(root, 'tmp', 'step-image-audits', recipe.slug),
    '--visual-focuses', recipe.steps.map((step) => step.visualFocus).join(','),
    // Fixed-coordinate skin samples are meaningful only when every frame uses
    // the same teaching crop. Mixed brow/lid/lash/final sequences require the
    // documented full-resolution human white-balance review instead.
    '--skin-tone-mode', hasMixedVisualFocus ? 'manual' : 'strict',
    '--recipe-slug', recipe.slug,
  ], { cwd: root, stdio: 'inherit' });

  if (result.status !== 0) failures.push(recipe.slug);
  else audited += 1;
}

if (failures.length) {
  console.error(`Step image set audit failed for ${failures.length} recipes: ${failures.join(', ')}`);
  process.exit(1);
}

console.log(`Step image set audit passed for ${audited} progressive recipes.`);
