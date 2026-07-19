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
  const clipped = lines.slice(0, maxLines);
  clipped[maxLines - 1] = `${clipped[maxLines - 1].replace(/[.,;:]?$/, '')}...`;
  return clipped;
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

const makeFinalPin = async (recipe) => {
  const imagePath = getRecipeImagePath(recipe.heroImage);
  const hero = await makeHero(imagePath, W, 960);
  const palette = recipe.palette.slice(0, 3);
  const body = `
    <rect x="0" y="925" width="${W}" height="55" fill="${COLORS.accent}" />
    <rect x="0" y="960" width="${W}" height="540" fill="${COLORS.paper}" />
    <text x="70" y="1045" fill="${COLORS.accent}" font-family="Arial" font-size="28" font-weight="700" letter-spacing="0">HUESTEPS MAKEUP RECIPE</text>
    ${textBlock({ text: recipe.title, x: 70, y: 1125, size: 70, lineHeight: 78, weight: 700, maxChars: 19, maxLines: 3 })}
    ${textBlock({ text: recipe.directAnswer, x: 72, y: 1335, size: 28, lineHeight: 36, color: COLORS.muted, family: 'Arial', maxChars: 50, maxLines: 2 })}
    <g transform="translate(70 1452)">
      ${palette.map((color, index) => `<circle cx="${index * 42}" cy="0" r="15" fill="${escapeXml(color.hex)}" stroke="${COLORS.deep}" stroke-width="2" />`).join('')}
      <text x="158" y="8" fill="${COLORS.ink}" font-family="Arial" font-size="25" font-weight="700" letter-spacing="0">${recipe.timeMinutes} min | ${escapeXml(recipe.finish)}</text>
    </g>
  `;
  return sharp({ create: { width: W, height: H, channels: 4, background: COLORS.paper } })
    .composite([{ input: hero, top: 0, left: 0 }, { input: svg(body), top: 0, left: 0 }])
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(path.join(pinsDir, `${recipe.slug}-final.png`));
};

const makeStepsPin = async (recipe) => {
  const imagePath = getRecipeImagePath(recipe.heroImage);
  const hero = await makeHero(imagePath, 410, 520);
  const steps = recipe.steps.slice(3, 6);
  const palette = recipe.palette.slice(0, 3);
  const stepCards = steps.map((step, index) => {
    const y = 760 + index * 185;
    return `
      <rect x="70" y="${y}" width="860" height="145" rx="8" fill="${COLORS.white}" stroke="${COLORS.line}" stroke-width="2" />
      <circle cx="118" cy="${y + 52}" r="27" fill="${COLORS.accent}" />
      <text x="118" y="${y + 62}" fill="${COLORS.white}" font-family="Arial" font-size="28" font-weight="700" text-anchor="middle">${index + 1}</text>
      ${textBlock({ text: step.title, x: 162, y: y + 45, size: 34, lineHeight: 40, weight: 700, maxChars: 31, maxLines: 1 })}
      ${textBlock({ text: step.placement, x: 162, y: y + 92, size: 24, lineHeight: 30, color: COLORS.muted, family: 'Arial', maxChars: 57, maxLines: 2 })}
    `;
  }).join('');
  const swatches = palette.map((color, index) => {
    const x = 70 + index * 286;
    return `
      <rect x="${x}" y="1320" width="248" height="88" rx="8" fill="${COLORS.white}" stroke="${COLORS.line}" />
      <circle cx="${x + 40}" cy="1364" r="23" fill="${escapeXml(color.hex)}" stroke="${COLORS.deep}" stroke-width="2" />
      ${textBlock({ text: color.name, x: x + 78, y: 1357, size: 23, lineHeight: 26, color: COLORS.ink, family: 'Arial', weight: 700, maxChars: 13, maxLines: 2 })}
    `;
  }).join('');
  const background = `
    <rect x="56" y="58" width="888" height="618" rx="8" fill="${COLORS.white}" stroke="${COLORS.line}" stroke-width="2" />
    <rect x="95" y="97" width="410" height="520" rx="8" fill="${COLORS.line}" />
  `;
  const foreground = `
    <text x="555" y="150" fill="${COLORS.accent}" font-family="Arial" font-size="26" font-weight="700" letter-spacing="0">STEP MAP</text>
    ${textBlock({ text: recipe.title, x: 555, y: 218, size: 54, lineHeight: 62, weight: 700, maxChars: 14, maxLines: 4 })}
    ${textBlock({ text: `${recipe.difficulty} | ${recipe.timeMinutes} minutes | ${recipe.hub.replaceAll('-', ' ')}`, x: 555, y: 500, size: 24, lineHeight: 31, color: COLORS.muted, family: 'Arial', maxChars: 29, maxLines: 3 })}
    <rect x="555" y="595" width="200" height="12" fill="${COLORS.accent}" />
    ${stepCards}
    ${swatches}
    <text x="70" y="1468" fill="${COLORS.muted}" font-family="Arial" font-size="24" letter-spacing="0">AI visualization | huesteps.com</text>
  `;
  return sharp({ create: { width: W, height: H, channels: 4, background: COLORS.paper } })
    .composite([{ input: svg(background), top: 0, left: 0 }, { input: hero, top: 97, left: 95 }, { input: svg(foreground), top: 0, left: 0 }])
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(path.join(pinsDir, `${recipe.slug}-steps.png`));
};

const makeDayOneFinalPin = async (recipe) => {
  const finalImage = await sharp(getStepImagePath(recipe, 7))
    .resize(1000, 1040, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer();
  const overlay = `
    <rect x="0" y="1010" width="1000" height="30" fill="${COLORS.accent}" />
    <rect x="0" y="1040" width="1000" height="460" fill="${COLORS.paper}" />
    <text x="66" y="1110" fill="${COLORS.accent}" font-family="Arial" font-size="25" font-weight="700" letter-spacing="1.2">15-MINUTE TUTORIAL</text>
    <text x="66" y="1212" fill="${COLORS.ink}" font-family="Arial Narrow, Arial" font-size="86" font-weight="700">NO-MAKEUP</text>
    <text x="66" y="1296" fill="${COLORS.ink}" font-family="Arial Narrow, Arial" font-size="86" font-weight="700">MAKEUP</text>
    <text x="68" y="1365" fill="${COLORS.muted}" font-family="Arial" font-size="29">Real skin. Quiet definition. Eight honest steps.</text>
    <text x="68" y="1435" fill="${COLORS.ink}" font-family="Arial" font-size="27" font-weight="700">SEE THE FULL TUTORIAL</text>
    <text x="934" y="1435" fill="${COLORS.accent}" font-family="Arial" font-size="27" font-weight="700" text-anchor="end">HUESTEPS.COM</text>
    <text x="68" y="1478" fill="${COLORS.muted}" font-family="Arial" font-size="18">AI-assisted visual</text>
  `;
  return sharp({ create: { width: W, height: H, channels: 4, background: COLORS.paper } })
    .composite([{ input: finalImage, top: 0, left: 0 }, { input: svg(overlay), top: 0, left: 0 }])
    .png({ compressionLevel: 9, quality: 92 })
    .toFile(path.join(pinsDir, `${recipe.slug}-final.png`));
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
  return sharp({ create: { width: W, height: H, channels: 4, background: COLORS.paper } })
    .composite([
      { input: before, top: 0, left: 0 },
      { input: after, top: 0, left: 500 },
      { input: svg(overlay), top: 0, left: 0 }
    ])
    .png({ compressionLevel: 9, quality: 92 })
    .toFile(path.join(pinsDir, `${recipe.slug}-before-after.png`));
};

const makeDayOneStepsPin = async (recipe) => {
  const stepIndexes = [1, 3, 5, 7];
  const photos = await Promise.all(stepIndexes.map((index) => sharp(getStepImagePath(recipe, index))
    .resize(445, 430, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer()));
  const labels = ['CORRECT', 'DEFINE', 'FLUSH', 'FINISH'];
  const positions = [
    { left: 45, top: 155 },
    { left: 510, top: 155 },
    { left: 45, top: 605 },
    { left: 510, top: 605 }
  ];
  const overlay = `
    <text x="50" y="66" fill="${COLORS.accent}" font-family="Arial" font-size="24" font-weight="700" letter-spacing="1.2">NATURAL NO-MAKEUP MAKEUP</text>
    <text x="50" y="126" fill="${COLORS.ink}" font-family="Arial Narrow, Arial" font-size="54" font-weight="700">4 VISUAL CHECKPOINTS</text>
    ${positions.map((position, index) => `
      <rect x="${position.left}" y="${position.top}" width="445" height="430" rx="8" fill="none" stroke="${COLORS.line}" stroke-width="3" />
      <circle cx="${position.left + 38}" cy="${position.top + 38}" r="25" fill="${COLORS.accent}" />
      <text x="${position.left + 38}" y="${position.top + 47}" fill="${COLORS.white}" font-family="Arial" font-size="24" font-weight="700" text-anchor="middle">${index + 1}</text>
      <rect x="${position.left + 75}" y="${position.top + 15}" width="160" height="46" rx="23" fill="${COLORS.deep}" fill-opacity="0.82" />
      <text x="${position.left + 155}" y="${position.top + 46}" fill="${COLORS.white}" font-family="Arial" font-size="20" font-weight="700" text-anchor="middle">${labels[index]}</text>
    `).join('')}
    <rect x="0" y="1055" width="1000" height="445" fill="${COLORS.deep}" />
    <text x="58" y="1140" fill="#7DA1FF" font-family="Arial" font-size="25" font-weight="700" letter-spacing="1.2">THE 15-MINUTE METHOD</text>
    <text x="58" y="1235" fill="${COLORS.white}" font-family="Arial Narrow, Arial" font-size="68" font-weight="700">REAL SKIN STAYS</text>
    <text x="58" y="1305" fill="${COLORS.white}" font-family="Arial Narrow, Arial" font-size="68" font-weight="700">VISIBLE</text>
    <text x="60" y="1370" fill="#C4C8CE" font-family="Arial" font-size="27">Pinpoint base · soft lashes · sheer color</text>
    <text x="60" y="1442" fill="${COLORS.white}" font-family="Arial" font-size="26" font-weight="700">FULL 8-STEP TUTORIAL</text>
    <text x="940" y="1442" fill="#7DA1FF" font-family="Arial" font-size="26" font-weight="700" text-anchor="end">HUESTEPS.COM</text>
    <text x="60" y="1480" fill="#9DA3AA" font-family="Arial" font-size="18">AI-assisted visual</text>
  `;
  const photoComposites = photos.map((input, index) => ({ input, ...positions[index] }));
  return sharp({ create: { width: W, height: H, channels: 4, background: COLORS.paper } })
    .composite([...photoComposites, { input: svg(overlay), top: 0, left: 0 }])
    .png({ compressionLevel: 9, quality: 92 })
    .toFile(path.join(pinsDir, `${recipe.slug}-steps.png`));
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
  return sharp({ create: { width: 1200, height: 630, channels: 4, background: COLORS.paper } })
    .composite([{ input: hero, top: 0, left: 480 }, { input: Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">${body}</svg>`), top: 0, left: 0 }])
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(path.join(socialDir, 'huesteps-default.png'));
};

const recipes = JSON.parse(await readFile(recipesPath, 'utf8'));
const identityRegistry = JSON.parse(await readFile(identityRegistryPath, 'utf8'));
await mkdir(pinsDir, { recursive: true });
await mkdir(socialDir, { recursive: true });

let generatedPins = 0;
for (const recipe of recipes) {
  if (recipe.slug === DAY_ONE_SLUG) {
    await makeDayOneFinalPin(recipe);
    await makeDayOneBeforeAfterPin(recipe);
    await makeDayOneStepsPin(recipe);
    generatedPins += 3;
  } else {
    await makeFinalPin(recipe);
    await makeStepsPin(recipe);
    generatedPins += 2;
  }
}

await makeSocialImage(recipes.find((recipe) => recipe.featured) ?? recipes[0]);

const pinManifest = {
  version: 1,
  identityRegistryVersion: identityRegistry.version,
  records: recipes.map((recipe) => {
    const model = identityRegistry.models[recipe.slug];
    if (!model) throw new Error(`Missing model identity for Pin manifest: ${recipe.slug}`);

    const destinationBase = `${SITE_URL}/${recipe.hub}/${recipe.slug}/`;
    const variants = [
      {
        kind: 'final',
        file: `/pins/${recipe.slug}-final.png`,
        destinationUrl: `${destinationBase}?utm_source=pinterest&utm_medium=social&utm_campaign=${recipe.slug}&utm_content=final`
      },
      {
        kind: 'steps',
        file: `/pins/${recipe.slug}-steps.png`,
        destinationUrl: `${destinationBase}?utm_source=pinterest&utm_medium=social&utm_campaign=${recipe.slug}&utm_content=steps`
      }
    ];
    if (recipe.slug === DAY_ONE_SLUG) {
      variants.push({
        kind: 'before-after',
        file: `/pins/${recipe.slug}-before-after.png`,
        destinationUrl: `${destinationBase}?utm_source=pinterest&utm_medium=social&utm_campaign=${recipe.slug}&utm_content=before-after`
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
