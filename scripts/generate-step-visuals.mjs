import { mkdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const recipesPath = path.join(root, 'src', 'data', 'recipes.json');
const outputRoot = path.join(root, 'src', 'assets', 'tutorial-steps');
const force = process.argv.includes('--force');

const sourceDirectories = [
  path.join(root, 'src', 'assets', 'recipes-v4'),
  path.join(root, 'src', 'assets', 'recipes-v3'),
  path.join(root, 'src', 'assets', 'recipes-v2'),
  path.join(root, 'src', 'assets', 'recipes')
];

const focusRects = {
  'full-face': { x: 0.08, y: 0.02, width: 0.84, height: 0.94 },
  complexion: { x: 0.18, y: 0.16, width: 0.64, height: 0.66 },
  brows: { x: 0.14, y: 0.16, width: 0.72, height: 0.34 },
  'both-eyes': { x: 0.10, y: 0.20, width: 0.80, height: 0.42 },
  lid: { x: 0.20, y: 0.23, width: 0.60, height: 0.36 },
  'upper-lash': { x: 0.18, y: 0.28, width: 0.64, height: 0.30 },
  'lower-lash': { x: 0.18, y: 0.32, width: 0.64, height: 0.34 },
  cheeks: { x: 0.12, y: 0.35, width: 0.76, height: 0.45 },
  lips: { x: 0.26, y: 0.48, width: 0.48, height: 0.30 },
  final: { x: 0.05, y: 0.02, width: 0.90, height: 0.96 }
};

const varyRectForStep = (rect, index) => {
  const zoom = [0, 0.035, 0.018, 0.052, 0.028, 0.044, 0.062, 0.01][index % 8];
  const shiftX = [0, -0.008, 0.01, -0.012, 0.012, -0.006, 0.008, 0][index % 8];
  const shiftY = [0, -0.006, 0.008, -0.01, 0.006, 0.012, -0.004, 0][index % 8];
  return {
    x: rect.x + rect.width * zoom / 2 + shiftX,
    y: rect.y + rect.height * zoom / 2 + shiftY,
    width: rect.width * (1 - zoom),
    height: rect.height * (1 - zoom)
  };
};

const resolveHero = (heroImage) => {
  const filenames = [heroImage.replace(/\.png$/i, '.webp'), heroImage];
  for (const directory of sourceDirectories) {
    for (const filename of filenames) {
      const candidate = path.join(directory, filename);
      if (existsSync(candidate)) return candidate;
    }
  }
  throw new Error(`Missing hero source for step visuals: ${heroImage}`);
};

const clampRect = (rect, width, height) => {
  const left = Math.max(0, Math.min(width - 2, Math.round(rect.x * width)));
  const top = Math.max(0, Math.min(height - 2, Math.round(rect.y * height)));
  const requestedWidth = Math.max(2, Math.round(rect.width * width));
  const requestedHeight = Math.max(2, Math.round(rect.height * height));
  return {
    left,
    top,
    width: Math.min(requestedWidth, width - left),
    height: Math.min(requestedHeight, height - top)
  };
};

const isFresh = async (source, output) => {
  if (output.includes('-curated.') && existsSync(output)) return true;
  if (force || !existsSync(output)) return false;
  const [sourceStat, outputStat] = await Promise.all([stat(source), stat(output)]);
  return outputStat.mtimeMs >= sourceStat.mtimeMs;
};

const recipes = JSON.parse(await readFile(recipesPath, 'utf8'));
let generated = 0;
let reused = 0;

for (const recipe of recipes) {
  const source = resolveHero(recipe.heroImage);
  const metadata = await sharp(source).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Cannot read dimensions for ${source}`);

  for (const [index, step] of recipe.steps.entries()) {
    if (!step.image) throw new Error(`${recipe.slug} step ${index + 1} is missing image.`);
    const output = path.join(outputRoot, ...step.image.replaceAll('\\', '/').split('/'));
    await mkdir(path.dirname(output), { recursive: true });

    if (await isFresh(source, output)) {
      reused += 1;
      continue;
    }

    const focus = varyRectForStep(focusRects[step.visualFocus] ?? focusRects['full-face'], index);
    const extract = clampRect(focus, metadata.width, metadata.height);
    await sharp(source)
      .extract(extract)
      .resize(720, 540, { fit: 'cover', position: 'centre', withoutEnlargement: false })
      .sharpen({ sigma: 0.45 })
      .webp({ quality: 82, effort: 4, smartSubsample: true })
      .toFile(output);
    generated += 1;
  }
}

console.log(`Step visuals ready: ${generated} generated, ${reused} reused, ${generated + reused} total.`);
