import { mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const recipesPath = path.join(root, 'src', 'data', 'recipes.json');
const recipeImageDir = path.join(root, 'src', 'assets', 'recipes-v3');
const fallbackRecipeImageDir = path.join(root, 'src', 'assets', 'recipes-v2');
const legacyRecipeImageDir = path.join(root, 'src', 'assets', 'recipes');
const pinsDir = path.join(root, 'public', 'pins');
const socialDir = path.join(root, 'public', 'social');

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
  const current = path.join(recipeImageDir, filename.replace(/\.png$/, '.webp'));
  if (existsSync(current)) return current;
  const fallback = path.join(fallbackRecipeImageDir, filename);
  return existsSync(fallback) ? fallback : path.join(legacyRecipeImageDir, filename);
};

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
await mkdir(pinsDir, { recursive: true });
await mkdir(socialDir, { recursive: true });

for (const recipe of recipes) {
  await makeFinalPin(recipe);
  await makeStepsPin(recipe);
}

await makeSocialImage(recipes.find((recipe) => recipe.featured) ?? recipes[0]);
console.log(`Generated ${recipes.length * 2} Pin images and 1 social preview image.`);
