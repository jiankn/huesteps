import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const recipesPath = path.join(root, 'src', 'data', 'recipes.json');
const identityRegistryPath = path.join(root, 'src', 'data', 'model-identity-registry.json');
const rebuildRecipeImageDir = path.join(root, 'src', 'assets', 'recipes-v5');
const tutorialStepImageDir = path.join(root, 'src', 'assets', 'tutorial-steps');
const pinsDir = path.join(root, 'public', 'pins');
const socialDir = path.join(root, 'public', 'social');
const DAY_ONE_SLUG = 'natural-no-makeup-makeup';
const SITE_URL = (process.env.SITE_URL ?? 'https://huesteps.com').replace(/\/+$/, '');

const W = 1000;
const H = 1500;
const COLORS = {
  paper: '#F7F7F5',
  ink: '#121314',
  muted: '#565B61',
  accent: '#1248D5',
  line: '#D3D4D2',
  deep: '#111416',
  white: '#FFFFFF'
};

const getRecipeImagePath = (filename) => {
  const rebuild = path.join(rebuildRecipeImageDir, filename.replace(/\.png$/, '.webp'));
  if (!existsSync(rebuild)) {
    throw new Error(`Missing production recipe hero: ${path.relative(root, rebuild)}`);
  }
  return rebuild;
};

const getStepImagePath = (recipe, index) => path.join(
  tutorialStepImageDir,
  ...recipe.steps[index].image.replaceAll('\\', '/').split('/')
);

const escapeXml = (value) => String(value).replace(/[<>&'"]/g, (char) => ({
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;'
})[char]);

const stripLongDash = (value) => String(value).replace(/[–—]/g, '-');

const wrapText = (text, maxChars, maxLines = 4) => {
  const words = stripLongDash(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  if (lines.length <= maxLines) return lines;
  throw new Error(`Pin copy does not fit without truncation: ${text}`);
};

const textBlock = ({ text, x, y, size, lineHeight, color = COLORS.ink, weight = 400, family = 'Arial Narrow, Arial', maxChars, maxLines, anchor = 'start' }) => {
  const lines = wrapText(text, maxChars, maxLines);
  return `<text x="${x}" y="${y}" fill="${color}" font-family="${family}" font-size="${size}" font-weight="${weight}" letter-spacing="0" text-anchor="${anchor}">${lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`).join('')}</text>`;
};

const svg = (body) => Buffer.from(`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`);

const makeHero = async (imagePath, width, height) => sharp(imagePath)
  .resize(width, height, { fit: 'cover', position: 'centre' })
  .png()
  .toBuffer();

const writePng = async (pipeline, destination, quality = 90) => {
  const output = await pipeline.png({ compressionLevel: 9, quality }).toBuffer();
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      await writeFile(destination, output);
      return;
    } catch (error) {
      if (attempt === 7) throw error;
      await new Promise((resolve) => setTimeout(resolve, 120 * (attempt + 1)));
    }
  }
};

const pinPromise = (recipe) => {
  const promises = {
    'eye-shape-makeup': 'Open-eye placement with every change shown.',
    'skin-tone-undertone': 'Depth-aware color with every change shown.',
    'occasion-makeup': 'A wearable finish built in eight visible steps.',
    'everyday-makeup': 'A repeatable routine built in eight visible steps.'
  };
  return promises[recipe.hub] ?? 'The complete look in eight visible steps.';
};

const makeFinalPin = async (recipe) => {
  const imagePath = getRecipeImagePath(recipe.heroImage);
  const hero = await makeHero(imagePath, W, 960);
  const palette = recipe.palette.slice(0, 3);
  const body = `
    <rect x="0" y="925" width="${W}" height="55" fill="${COLORS.accent}" />
    <rect x="0" y="960" width="${W}" height="540" fill="${COLORS.paper}" />
    <text x="70" y="1045" fill="${COLORS.accent}" font-family="Arial" font-size="28" font-weight="700" letter-spacing="0">HUESTEPS MAKEUP RECIPE</text>
    ${textBlock({ text: recipe.title, x: 70, y: 1125, size: 70, lineHeight: 78, weight: 700, maxChars: 19, maxLines: 3 })}
    ${textBlock({ text: pinPromise(recipe), x: 72, y: 1335, size: 28, lineHeight: 36, color: COLORS.muted, family: 'Arial', maxChars: 50, maxLines: 2 })}
    <g transform="translate(70 1452)">
      ${palette.map((color, index) => `<circle cx="${index * 42}" cy="0" r="15" fill="${escapeXml(color.hex)}" stroke="${COLORS.deep}" stroke-width="2" />`).join('')}
      <text x="158" y="8" fill="${COLORS.ink}" font-family="Arial" font-size="25" font-weight="700" letter-spacing="0">${recipe.timeMinutes} min | ${escapeXml(recipe.finish)}</text>
    </g>
    <text x="930" y="1482" fill="${COLORS.muted}" font-family="Arial" font-size="17" text-anchor="end">AI-assisted visual</text>
  `;
  return writePng(
    sharp({ create: { width: W, height: H, channels: 4, background: COLORS.paper } })
      .composite([{ input: hero, top: 0, left: 0 }, { input: svg(body), top: 0, left: 0 }]),
    path.join(pinsDir, `${recipe.slug}-final.png`)
  );
};

const makeStepsPin = async (recipe) => {
  const checkpoints = [0, 3, 7];
  const photos = await Promise.all(checkpoints.map((index) => sharp(getStepImagePath(recipe, index))
    .resize(890, 310, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer()));
  const positions = [225, 550, 875];
  const labels = checkpoints.map((index) => `STEP ${index + 1} · ${recipe.steps[index].title.toUpperCase()}`);
  const foreground = `
    <text x="55" y="62" fill="${COLORS.accent}" font-family="Arial" font-size="24" font-weight="700">SAME FACE · REAL PROGRESSION</text>
    ${textBlock({ text: recipe.title, x: 55, y: 126, size: 54, lineHeight: 58, weight: 700, maxChars: 30, maxLines: 2 })}
    ${positions.map((top, index) => `
      <rect x="55" y="${top}" width="890" height="310" rx="8" fill="none" stroke="${COLORS.line}" stroke-width="2" />
      <rect x="55" y="${top}" width="890" height="52" rx="8" fill="${COLORS.deep}" fill-opacity="0.84" />
      ${textBlock({ text: labels[index], x: 77, y: top + 35, size: 21, lineHeight: 25, color: COLORS.white, family: 'Arial', weight: 700, maxChars: 58, maxLines: 1 })}
    `).join('')}
    <rect x="0" y="1210" width="1000" height="290" fill="${COLORS.deep}" />
    <text x="58" y="1290" fill="#7DA1FF" font-family="Arial" font-size="24" font-weight="700">1 → 4 → 8</text>
    <text x="58" y="1360" fill="${COLORS.white}" font-family="Arial Narrow, Arial" font-size="54" font-weight="700">SEE EVERY CUMULATIVE STEP</text>
    <text x="58" y="1424" fill="#C4C8CE" font-family="Arial" font-size="27">${recipe.timeMinutes} minutes · ${escapeXml(recipe.finish)} finish</text>
    <text x="58" y="1470" fill="#9DA3AA" font-family="Arial" font-size="18">AI-assisted visual · huesteps.com</text>
  `;
  const photoComposites = photos.map((input, index) => ({ input, top: positions[index], left: 55 }));
  return writePng(
    sharp({ create: { width: W, height: H, channels: 4, background: COLORS.paper } })
      .composite([...photoComposites, { input: svg(foreground), top: 0, left: 0 }]),
    path.join(pinsDir, `${recipe.slug}-steps.png`)
  );
};

const makeFixPin = async (recipe) => {
  const checkpoint = await sharp(getStepImagePath(recipe, 4))
    .resize(1000, 860, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer();
  const overlay = `
    <rect x="0" y="0" width="1000" height="78" fill="${COLORS.deep}" fill-opacity="0.84" />
    <text x="52" y="51" fill="${COLORS.white}" font-family="Arial" font-size="24" font-weight="700">WHEN THIS LOOK FEELS OFF</text>
    <rect x="0" y="830" width="1000" height="670" fill="${COLORS.paper}" />
    <text x="58" y="920" fill="${COLORS.accent}" font-family="Arial" font-size="24" font-weight="700">CORRECT BEFORE YOU ADD MORE</text>
    ${textBlock({ text: recipe.title, x: 58, y: 1000, size: 60, lineHeight: 66, weight: 700, maxChars: 27, maxLines: 3 })}
    ${textBlock({ text: 'Fix placement first. Then reassess in front-facing light.', x: 60, y: 1225, size: 30, lineHeight: 37, weight: 700, maxChars: 48, maxLines: 2 })}
    ${textBlock({ text: 'The tutorial includes the likely cause and exact correction.', x: 60, y: 1310, size: 27, lineHeight: 34, color: COLORS.muted, family: 'Arial', maxChars: 58, maxLines: 2 })}
    <rect x="58" y="1362" width="360" height="62" rx="6" fill="${COLORS.accent}" />
    <text x="238" y="1403" fill="${COLORS.white}" font-family="Arial" font-size="24" font-weight="700" text-anchor="middle">OPEN THE 8-STEP FIX</text>
    <text x="60" y="1470" fill="${COLORS.muted}" font-family="Arial" font-size="18">AI-assisted visual · huesteps.com</text>
  `;
  return writePng(
    sharp({ create: { width: W, height: H, channels: 4, background: COLORS.paper } })
      .composite([{ input: checkpoint, top: 0, left: 0 }, { input: svg(overlay), top: 0, left: 0 }]),
    path.join(pinsDir, `${recipe.slug}-fix.png`),
    92
  );
};

const makeDayOneBeforeAfterPin = async (recipe) => {
  const [before, after] = await Promise.all([
    sharp(getStepImagePath(recipe, 0)).resize(500, 1040, { fit: 'cover', position: 'centre' }).png().toBuffer(),
    sharp(getStepImagePath(recipe, 7)).resize(500, 1040, { fit: 'cover', position: 'centre' }).png().toBuffer()
  ]);
  const overlay = `
    <rect x="0" y="0" width="500" height="78" fill="${COLORS.deep}" fill-opacity="0.82" />
    <rect x="500" y="0" width="500" height="78" fill="${COLORS.accent}" fill-opacity="0.90" />
    <text x="250" y="52" fill="${COLORS.white}" font-family="Arial" font-size="28" font-weight="700" text-anchor="middle">BEFORE</text>
    <text x="750" y="52" fill="${COLORS.white}" font-family="Arial" font-size="28" font-weight="700" text-anchor="middle">AFTER</text>
    <rect x="496" y="0" width="8" height="1040" fill="${COLORS.white}" />
    <rect x="0" y="1040" width="1000" height="460" fill="${COLORS.paper}" />
    <text x="66" y="1120" fill="${COLORS.accent}" font-family="Arial" font-size="25" font-weight="700" letter-spacing="1.2">HONEST BEFORE + AFTER</text>
    <text x="66" y="1226" fill="${COLORS.ink}" font-family="Arial Narrow, Arial" font-size="78" font-weight="700">THE NO-MAKEUP</text>
    <text x="66" y="1306" fill="${COLORS.ink}" font-family="Arial Narrow, Arial" font-size="78" font-weight="700">DIFFERENCE</text>
    <text x="68" y="1374" fill="${COLORS.muted}" font-family="Arial" font-size="28">Same face, light, crop and expression. Makeup only.</text>
    <text x="68" y="1442" fill="${COLORS.ink}" font-family="Arial" font-size="27" font-weight="700">GET ALL 8 STEPS</text>
    <text x="934" y="1442" fill="${COLORS.accent}" font-family="Arial" font-size="27" font-weight="700" text-anchor="end">HUESTEPS.COM</text>
    <text x="68" y="1480" fill="${COLORS.muted}" font-family="Arial" font-size="18">AI-assisted visual</text>
  `;
  return writePng(
    sharp({ create: { width: W, height: H, channels: 4, background: COLORS.paper } })
      .composite([
        { input: before, top: 0, left: 0 },
        { input: after, top: 0, left: 500 },
        { input: svg(overlay), top: 0, left: 0 }
      ]),
    path.join(pinsDir, `${recipe.slug}-before-after.png`),
    92
  );
};

const makeSocialImage = async (recipe) => {
  const imagePath = getRecipeImagePath(recipe.heroImage);
  const hero = await sharp(imagePath).resize(720, 630, { fit: 'cover', position: 'centre' }).png().toBuffer();
  const body = `
    <rect x="0" y="0" width="520" height="630" fill="${COLORS.deep}" />
    <rect x="0" y="0" width="12" height="630" fill="${COLORS.accent}" />
    <text x="58" y="112" fill="#7DA1FF" font-family="Arial" font-size="28" font-weight="700" letter-spacing="1">HUESTEPS</text>
    <text x="58" y="225" fill="${COLORS.white}" font-family="Arial Narrow, Arial" font-size="66" font-weight="700">Makeup,</text>
    <text x="58" y="298" fill="${COLORS.white}" font-family="Arial Narrow, Arial" font-size="66" font-weight="700">step by step.</text>
    <text x="58" y="392" fill="#C4C8CE" font-family="Arial" font-size="27">Wearable recipes by occasion,</text>
    <text x="58" y="432" fill="#C4C8CE" font-family="Arial" font-size="27">eye shape, and skin tone.</text>
    <path d="M58 520h128v4H58z" fill="${COLORS.accent}" />
  `;
  return writePng(
    sharp({ create: { width: 1200, height: 630, channels: 4, background: COLORS.paper } })
      .composite([{ input: hero, top: 0, left: 480 }, { input: Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">${body}</svg>`), top: 0, left: 0 }]),
    path.join(socialDir, 'huesteps-default.png')
  );
};

const recipes = JSON.parse(await readFile(recipesPath, 'utf8'));
const identityRegistry = JSON.parse(await readFile(identityRegistryPath, 'utf8'));
await mkdir(pinsDir, { recursive: true });
await mkdir(socialDir, { recursive: true });

let generatedPins = 0;
for (const recipe of recipes) {
  await makeFinalPin(recipe);
  await makeStepsPin(recipe);
  await makeFixPin(recipe);
  generatedPins += 3;
  if (recipe.slug === DAY_ONE_SLUG) {
    await makeDayOneBeforeAfterPin(recipe);
    generatedPins += 1;
  }
}

await makeSocialImage(recipes.find((recipe) => recipe.featured) ?? recipes[0]);

const pinManifest = {
  version: 2,
  identityRegistryVersion: identityRegistry.version,
  records: recipes.map((recipe) => {
    const model = identityRegistry.models[recipe.slug];
    if (!model) throw new Error(`Missing model identity for Pin manifest: ${recipe.slug}`);

    const destinationBase = `${SITE_URL}/${recipe.hub}/${recipe.slug}/`;
    const variants = [
      {
        kind: 'result',
        file: `/pins/${recipe.slug}-final.png`,
        destinationUrl: `${destinationBase}?utm_source=pinterest&utm_medium=social&utm_campaign=${recipe.slug}&utm_content=result-v2`,
        pinTitle: recipe.title,
        pinDescription: `${recipe.directAnswer} Follow the same model through all eight cumulative steps.`
      },
      {
        kind: 'progress',
        file: `/pins/${recipe.slug}-steps.png`,
        destinationUrl: `${destinationBase}?utm_source=pinterest&utm_medium=social&utm_campaign=${recipe.slug}&utm_content=progress-148-v2`,
        pinTitle: `${recipe.title}: steps 1, 4 and 8`,
        pinDescription: `See the same face and makeup look progress at steps 1, 4 and 8, then follow the complete tutorial.`
      },
      {
        kind: 'fix',
        file: `/pins/${recipe.slug}-fix.png`,
        destinationUrl: `${destinationBase}?utm_source=pinterest&utm_medium=social&utm_campaign=${recipe.slug}&utm_content=fix-placement-v2`,
        pinTitle: `${recipe.title}: how to fix the most common mistake`,
        pinDescription: `${recipe.commonMistakes[0].problem} Likely cause: ${recipe.commonMistakes[0].cause} Fix: ${recipe.commonMistakes[0].fix}`
      }
    ];
    if (recipe.slug === DAY_ONE_SLUG) {
      variants.push({
        kind: 'before-after',
        file: `/pins/${recipe.slug}-before-after.png`,
        destinationUrl: `${destinationBase}?utm_source=pinterest&utm_medium=social&utm_campaign=${recipe.slug}&utm_content=before-after-v2`,
        pinTitle: 'Natural no-makeup makeup: honest before and after',
        pinDescription: 'The same face, light, crop and expression before and after a cumulative eight-step no-makeup makeup tutorial.'
      });
    }

    return {
      slug: recipe.slug,
      modelId: model.modelId,
      tutorialUrl: destinationBase,
      heroSource: recipe.heroImage.replace(/\.png$/, '.webp'),
      stepSources: recipe.steps.map((step) => step.image),
      variants
    };
  })
};

await writeFile(
  path.join(pinsDir, 'manifest.json'),
  `${JSON.stringify(pinManifest, null, 2)}\n`,
  'utf8'
);

console.log(`Generated ${generatedPins} Pin images, 1 social preview image, and the Pin identity manifest.`);
