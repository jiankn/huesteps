import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const output = path.resolve(
  valueFor('--output')
    ?? path.join('tmp', 'model-rebuild', 'production-identity-qc-sheet.webp')
);
const recipes = JSON.parse(await readFile(path.join(root, 'src', 'data', 'recipes.json'), 'utf8'));
const registry = JSON.parse(
  await readFile(path.join(root, 'src', 'data', 'model-identity-registry.json'), 'utf8')
);

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const columns = 4;
const tileWidth = 420;
const heroHeight = 236;
const stepHeight = 315;
const labelHeight = 84;
const tileHeight = heroHeight + stepHeight + labelHeight;
const rows = Math.ceil(recipes.length / columns);

const tiles = await Promise.all(recipes.map(async (recipe) => {
  const model = registry.models?.[recipe.slug];
  if (!model) throw new Error(`Missing model registry entry for ${recipe.slug}.`);
  const hero = path.join(
    root,
    'src',
    'assets',
    'recipes-v5',
    recipe.heroImage.replace(/\.png$/, '.webp')
  );
  const finalStep = path.join(
    root,
    'src',
    'assets',
    'tutorial-steps',
    recipe.steps.at(-1).image
  );
  for (const file of [hero, finalStep]) {
    if (!existsSync(file)) throw new Error(`Missing production identity asset: ${file}`);
  }

  const [heroBuffer, stepBuffer] = await Promise.all([
    sharp(hero)
      .rotate()
      .resize(tileWidth, heroHeight, { fit: 'cover', position: 'centre' })
      .removeAlpha()
      .jpeg({ quality: 91 })
      .toBuffer(),
    sharp(finalStep)
      .rotate()
      .resize(tileWidth, stepHeight, { fit: 'cover', position: 'centre' })
      .removeAlpha()
      .jpeg({ quality: 91 })
      .toBuffer()
  ]);
  const label = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${tileWidth}" height="${labelHeight}">
      <rect width="100%" height="100%" fill="#111317"/>
      <text x="16" y="28" fill="#91a9e8" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700">${escapeXml(model.modelId)} · HERO / STEP 08</text>
      <text x="16" y="57" fill="#f4f1eb" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="600">${escapeXml(recipe.title.slice(0, 42))}</text>
    </svg>
  `);

  return sharp({
    create: {
      width: tileWidth,
      height: tileHeight,
      channels: 3,
      background: '#111317'
    }
  })
    .composite([
      { input: heroBuffer, left: 0, top: 0 },
      { input: stepBuffer, left: 0, top: heroHeight },
      { input: label, left: 0, top: heroHeight + stepHeight }
    ])
    .webp({ quality: 91 })
    .toBuffer();
}));

await mkdir(path.dirname(output), { recursive: true });
await sharp({
  create: {
    width: columns * tileWidth,
    height: rows * tileHeight,
    channels: 3,
    background: '#090a0d'
  }
})
  .composite(tiles.map((input, index) => ({
    input,
    left: (index % columns) * tileWidth,
    top: Math.floor(index / columns) * tileHeight
  })))
  .webp({ quality: 91 })
  .toFile(output);

console.log(`Generated production identity QC sheet: ${path.relative(root, output)}`);
