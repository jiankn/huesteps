import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const sourceDirArg = valueFor('--source-dir');
const outputDirArg = valueFor('--output-dir');
if (!sourceDirArg) throw new Error('Pass --source-dir containing step-01 through step-08 images.');

const sourceDir = path.resolve(sourceDirArg);
const outputDir = outputDirArg ? path.resolve(outputDirArg) : sourceDir;
await mkdir(outputDir, { recursive: true });

const findSource = (stepNumber) => {
  for (const extension of ['png', 'jpg', 'jpeg', 'webp']) {
    const candidate = path.join(sourceDir, `step-${stepNumber}.${extension}`);
    if (existsSync(candidate)) return candidate;
  }
  return undefined;
};

const meanPatch = async (file, metadata, xRatio) => {
  const width = Math.max(8, Math.floor(metadata.width * 0.18));
  const height = Math.max(8, Math.floor(metadata.height * 0.18));
  const left = Math.max(0, Math.min(metadata.width - width, Math.floor(metadata.width * xRatio)));
  const top = Math.max(0, Math.min(metadata.height - height, Math.floor(metadata.height * 0.64)));
  const stats = await sharp(file).extract({ left, top, width, height }).stats();
  return stats.channels.slice(0, 3).map((channel) => channel.mean);
};

const rows = [];
const hashes = new Map();
const failures = [];
const warnings = [];

for (let index = 0; index < 8; index += 1) {
  const stepNumber = String(index + 1).padStart(2, '0');
  const file = findSource(stepNumber);
  if (!file) {
    failures.push(`Missing step-${stepNumber}.`);
    continue;
  }

  const metadata = await sharp(file).metadata();
  if (!metadata.width || !metadata.height || metadata.width < 1280 || metadata.height < 960) {
    failures.push(`step-${stepNumber} must be at least 1280x960; found ${metadata.width ?? 0}x${metadata.height ?? 0}.`);
  }
  if (metadata.width && metadata.height && Math.abs(metadata.width / metadata.height - 4 / 3) > 0.02) {
    failures.push(`step-${stepNumber} must be 4:3; found ${metadata.width}x${metadata.height}.`);
  }

  const hash = createHash('sha256').update(await readFile(file)).digest('hex');
  if (hashes.has(hash)) failures.push(`step-${stepNumber} is byte-identical to step-${hashes.get(hash)}.`);
  hashes.set(hash, stepNumber);

  const fullStats = await sharp(file).stats();
  const leftTone = await meanPatch(file, metadata, 0.12);
  const rightTone = await meanPatch(file, metadata, 0.70);
  const skinToneRgb = leftTone.map((value, channel) => Math.round((value + rightTone[channel]) / 2));
  rows.push({
    step: Number(stepNumber),
    file: path.basename(file),
    width: metadata.width,
    height: metadata.height,
    bytes: (await readFile(file)).length,
    skinToneRgb,
    entropy: Number(fullStats.entropy.toFixed(3)),
    sharpness: Number(fullStats.sharpness.toFixed(3))
  });
}

if (rows.length === 8) {
  const medianTone = [0, 1, 2].map((channel) => {
    const values = rows.map((row) => row.skinToneRgb[channel]).sort((a, b) => a - b);
    return Math.round((values[3] + values[4]) / 2);
  });

  for (const row of rows) {
    row.skinToneDistance = Number(Math.sqrt(row.skinToneRgb.reduce((sum, value, channel) => sum + (value - medianTone[channel]) ** 2, 0)).toFixed(1));
    if (row.skinToneDistance > 35) failures.push(`step-${String(row.step).padStart(2, '0')} has severe sampled skin-tone drift (${row.skinToneDistance}).`);
    else if (row.skinToneDistance > 22) warnings.push(`step-${String(row.step).padStart(2, '0')} has visible sampled skin-tone drift (${row.skinToneDistance}); review white balance and undertone.`);
  }

  const tiles = await Promise.all(rows.map(async (row) => {
    const file = findSource(String(row.step).padStart(2, '0'));
    return sharp(file).resize(480, 360, { fit: 'cover', position: 'centre' }).jpeg({ quality: 90 }).toBuffer();
  }));
  await sharp({ create: { width: 1920, height: 720, channels: 3, background: '#f4f1ed' } })
    .composite(tiles.map((input, index) => ({ input, left: (index % 4) * 480, top: Math.floor(index / 4) * 360 })))
    .jpeg({ quality: 92 })
    .toFile(path.join(outputDir, 'progressive-contact-sheet.jpg'));
}

await writeFile(path.join(outputDir, 'progressive-image-audit.json'), JSON.stringify({ rows, warnings, failures }, null, 2) + '\n');

if (warnings.length) {
  console.error('Progressive image warnings:');
  for (const warning of warnings) console.error(`- ${warning}`);
}
if (failures.length) {
  console.error('Progressive image audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Progressive image audit passed for ${rows.length} images. Human makeup-sequence and skin-texture review remains required.`);
