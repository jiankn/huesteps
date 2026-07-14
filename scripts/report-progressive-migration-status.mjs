import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const recipesRoot = path.resolve('src', 'assets', 'tutorial-steps');
const workRoot = path.resolve('tmp', 'progressive-all-v2');

const dirs = (await readdir(recipesRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const countMatching = async (dir, matcher) => {
  if (!existsSync(dir)) return 0;
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile() && matcher(entry.name)).length;
};

const newest = async (dir) => {
  if (!existsSync(dir)) return '';
  const entries = await readdir(dir, { withFileTypes: true });
  let latest = 0;
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const info = await stat(path.join(dir, entry.name));
    latest = Math.max(latest, info.mtimeMs);
  }
  return latest ? new Date(latest).toISOString() : '';
};

for (const recipe of dirs) {
  const sourceDir = path.join(workRoot, recipe, 'sources');
  const assetDir = path.join(recipesRoot, recipe);
  const sources = await countMatching(sourceDir, (name) => /^step-\d\d\.(png|jpg|jpeg|webp)$/i.test(name));
  const curated = await countMatching(assetDir, (name) => /^step-\d\d-curated\.webp$/i.test(name));
  if (sources || curated) {
    console.log(`${recipe}\tsources=${sources}\tcurated=${curated}\tlatest=${await newest(sourceDir)}`);
  }
}
