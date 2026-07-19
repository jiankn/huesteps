import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const root = process.cwd();
const sourceRoot = path.resolve(valueFor('--source-root') ?? path.join('tmp', 'model-rebuild'));
const output = path.resolve(
  valueFor('--output') ?? path.join('tmp', 'model-rebuild', 'model-identity-contact-sheet.webp')
);
const productionMode = args.includes('--production');
const recipes = JSON.parse(await readFile(path.join(root, 'src', 'data', 'recipes.json'), 'utf8'));
const registry = JSON.parse(
  await readFile(path.join(root, 'src', 'data', 'model-identity-registry.json'), 'utf8')
);
const columns = 4;
const cellWidth = 400;
const imageHeight = 250;
const labelHeight = 74;
const cellHeight = imageHeight + labelHeight;

const findSource = (recipe) => {
  if (productionMode) {
    const candidate = path.join(root, 'src', 'assets', 'recipes-v5', recipe.heroImage.replace(/\.png$/, '.webp'));
    return existsSync(candidate) ? candidate : undefined;
  }
  for (const extension of ['png', 'webp', 'jpg', 'jpeg']) {
    const candidate = path.join(sourceRoot, recipe.slug, `hero-master.${extension}`);
    if (existsSync(candidate)) return candidate;
  }
  return undefined;
};

const composites = [];
for (const [index, recipe] of recipes.entries()) {
  const source = findSource(recipe);
  if (!source) throw new Error(`Missing hero source for ${recipe.slug}`);

  const left = (index % columns) * cellWidth;
  const top = Math.floor(index / columns) * cellHeight;
  const image = await sharp(source)
    .rotate()
    .resize(cellWidth, imageHeight, { fit: 'cover', position: 'centre' })
    .webp({ quality: 88 })
    .toBuffer();
  const model = registry.models[recipe.slug];
  const label = Buffer.from(`
    <svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#111416"/>
      <text x="12" y="24" fill="#ffffff" font-family="Arial" font-size="16" font-weight="700">
        ${model.modelId} · ${recipe.slug}
      </text>
      <text x="12" y="49" fill="#9eb9ff" font-family="Arial" font-size="13">
        age ${model.apparentAge} · ${model.skin.slice(0, 48)}
      </text>
    </svg>
  `);

  composites.push({ input: image, left, top });
  composites.push({ input: label, left, top: top + imageHeight });
}

await mkdir(path.dirname(output), { recursive: true });
await sharp({
  create: {
    width: columns * cellWidth,
    height: Math.ceil(recipes.length / columns) * cellHeight,
    channels: 3,
    background: '#111416'
  }
})
  .composite(composites)
  .webp({ quality: 90, effort: 6 })
  .toFile(output);

console.log(`Generated model identity contact sheet: ${path.relative(root, output)}`);
