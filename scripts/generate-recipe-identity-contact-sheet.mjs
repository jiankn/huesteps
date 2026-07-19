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

const slug = valueFor('--recipe');
const sourceDirArg = valueFor('--source-dir');
const outputArg = valueFor('--output');
const heroFileArg = valueFor('--hero-file');

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  throw new Error('Pass a valid --recipe slug.');
}

const recipes = JSON.parse(await readFile(path.join(root, 'src', 'data', 'recipes.json'), 'utf8'));
const registry = JSON.parse(await readFile(path.join(root, 'src', 'data', 'model-identity-registry.json'), 'utf8'));
const recipe = recipes.find((entry) => entry.slug === slug);
const model = registry.models?.[slug];
if (!recipe) throw new Error(`Unknown recipe: ${slug}`);
if (!model) throw new Error(`Recipe is missing from the model identity registry: ${slug}`);

const sourceDir = sourceDirArg
  ? path.resolve(sourceDirArg)
  : path.join(root, 'tmp', 'model-rebuild', slug, 'sources');
const output = outputArg
  ? path.resolve(outputArg)
  : path.join(root, 'tmp', 'model-rebuild', slug, 'identity-contact-sheet.webp');
if (heroFileArg && !existsSync(path.resolve(heroFileArg))) {
  throw new Error(`Missing explicit hero file: ${path.resolve(heroFileArg)}`);
}

const findStep = (stepNumber) => {
  const stems = [`step-${stepNumber}`, `step-${stepNumber}-curated`];
  for (const stem of stems) {
    for (const extension of ['png', 'jpg', 'jpeg', 'webp']) {
      const candidate = path.join(sourceDir, `${stem}.${extension}`);
      if (existsSync(candidate)) return candidate;
    }
  }
  throw new Error(`Missing step-${stepNumber} in ${sourceDir}.`);
};

const heroCandidates = [
  ...(heroFileArg ? [path.resolve(heroFileArg)] : []),
  path.join(root, 'src', 'assets', 'recipes-v5', `${slug}.webp`),
  path.join(root, 'tmp', 'model-rebuild', slug, 'hero-master.png')
];
const hero = heroCandidates.find(existsSync);
if (!hero) throw new Error(`Missing approved hero for ${slug}.`);

const files = [
  { file: hero, eyebrow: `${model.modelId} · HERO`, title: recipe.title },
  ...recipe.steps.map((step, index) => ({
    file: findStep(String(index + 1).padStart(2, '0')),
    eyebrow: `STEP ${String(index + 1).padStart(2, '0')} · ${step.visualFocus}`,
    title: step.title
  }))
];

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const columns = 3;
const imageWidth = 520;
const imageHeight = 390;
const labelHeight = 92;
const tileHeight = imageHeight + labelHeight;
const rows = Math.ceil(files.length / columns);
const sheetWidth = columns * imageWidth;
const sheetHeight = rows * tileHeight;

const tiles = await Promise.all(files.map(async ({ file, eyebrow, title }) => {
  const image = await sharp(file)
    .rotate()
    .resize(imageWidth, imageHeight, { fit: 'cover', position: 'centre' })
    .removeAlpha()
    .jpeg({ quality: 92 })
    .toBuffer();
  const label = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${imageWidth}" height="${labelHeight}">
      <rect width="100%" height="100%" fill="#111317"/>
      <text x="18" y="29" fill="#91a9e8" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700">${escapeXml(eyebrow)}</text>
      <text x="18" y="60" fill="#f4f1eb" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600">${escapeXml(title.slice(0, 50))}</text>
    </svg>
  `);
  return sharp({
    create: {
      width: imageWidth,
      height: tileHeight,
      channels: 3,
      background: '#111317'
    }
  })
    .composite([
      { input: image, left: 0, top: 0 },
      { input: label, left: 0, top: imageHeight }
    ])
    .webp({ quality: 92 })
    .toBuffer();
}));

await mkdir(path.dirname(output), { recursive: true });
await sharp({
  create: {
    width: sheetWidth,
    height: sheetHeight,
    channels: 3,
    background: '#0a0b0e'
  }
})
  .composite(tiles.map((input, index) => ({
    input,
    left: (index % columns) * imageWidth,
    top: Math.floor(index / columns) * tileHeight
  })))
  .webp({ quality: 92 })
  .toFile(output);

console.log(`Generated recipe identity contact sheet: ${path.relative(root, output)}`);
