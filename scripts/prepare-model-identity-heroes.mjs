import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import recipes from '../src/data/recipes.json' with { type: 'json' };

const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const sourceRoot = path.resolve(valueFor('--source-root') ?? path.join('tmp', 'model-rebuild'));
const outputDir = path.resolve(valueFor('--output-dir') ?? path.join('src', 'assets', 'recipes-v5'));
const explicitMaster = valueFor('--master-file') ? path.resolve(valueFor('--master-file')) : undefined;
const requestedSlugs = valueFor('--slugs')?.split(',').map((value) => value.trim()).filter(Boolean);
const selectedRecipes = requestedSlugs
  ? recipes.filter((recipe) => requestedSlugs.includes(recipe.slug))
  : recipes;

if (requestedSlugs) {
  const known = new Set(selectedRecipes.map((recipe) => recipe.slug));
  const unknown = requestedSlugs.filter((slug) => !known.has(slug));
  if (unknown.length) throw new Error(`Unknown recipe slug(s): ${unknown.join(', ')}`);
}
if (explicitMaster && selectedRecipes.length !== 1) {
  throw new Error('--master-file requires exactly one recipe selected with --slugs.');
}
if (explicitMaster && !existsSync(explicitMaster)) {
  throw new Error(`Missing explicit hero master: ${explicitMaster}`);
}

const findMaster = (slug) => {
  for (const stem of ['hero-master-approved']) {
    for (const extension of ['png', 'webp', 'jpg', 'jpeg']) {
      const candidate = path.join(sourceRoot, slug, `${stem}.${extension}`);
      if (existsSync(candidate)) return candidate;
    }
  }
  return undefined;
};

await mkdir(outputDir, { recursive: true });

for (const recipe of selectedRecipes) {
  const source = explicitMaster ?? findMaster(recipe.slug);
  if (!source) throw new Error(`Missing hero master for ${recipe.slug} under ${sourceRoot}`);

  const sourceMetadata = await sharp(source).metadata();
  const sourceRatio = sourceMetadata.width && sourceMetadata.height
    ? sourceMetadata.width / sourceMetadata.height
    : 0;
  if (
    !sourceMetadata.width
    || !sourceMetadata.height
    || sourceMetadata.width < 1536
    || sourceMetadata.height < 864
    || sourceRatio < 1.4
  ) {
    throw new Error(
      `${recipe.slug} source is ${sourceMetadata.width ?? 0}x${sourceMetadata.height ?? 0}; `
        + 'expected a crop-safe landscape master at least 1536px wide, 864px high, and 1.4:1'
    );
  }

  const output = path.join(outputDir, recipe.heroImage.replace(/\.png$/, '.webp'));
  await sharp(source)
    .rotate()
    .resize({
      width: 2560,
      height: 1440,
      fit: 'cover',
      position: 'centre',
      kernel: sharp.kernel.lanczos3
    })
    .webp({ quality: 94, effort: 6, smartSubsample: false })
    .toFile(output);

  const outputMetadata = await sharp(output).metadata();
  console.log(
    `${recipe.slug}: ${sourceMetadata.width}x${sourceMetadata.height} -> `
      + `${outputMetadata.width}x${outputMetadata.height} ${path.relative(process.cwd(), output)}`
  );
}

console.log(`Prepared ${selectedRecipes.length} high-resolution recipe heroes.`);
