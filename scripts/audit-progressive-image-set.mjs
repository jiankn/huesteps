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
const suffix = valueFor('--suffix') ?? '';
const visualFocusesArg = valueFor('--visual-focuses');
const skinToneMode = valueFor('--skin-tone-mode') ?? 'strict';
const recipeSlugArg = valueFor('--recipe-slug');
if (!sourceDirArg) throw new Error('Pass --source-dir containing step-01 through step-08 images.');
if (suffix && !/^-[a-z0-9-]+$/.test(suffix)) throw new Error('--suffix must look like -curated.');
if (!['strict', 'manual'].includes(skinToneMode)) throw new Error('--skin-tone-mode must be strict or manual.');

const visualFocuses = visualFocusesArg?.split(',');
if (visualFocuses && visualFocuses.length !== 8) {
  throw new Error('--visual-focuses must contain exactly 8 comma-separated values.');
}
if (skinToneMode === 'manual' && !visualFocuses) {
  throw new Error('--visual-focuses is required when --skin-tone-mode is manual.');
}

const sourceDir = path.resolve(sourceDirArg);
const outputDir = outputDirArg ? path.resolve(outputDirArg) : sourceDir;
const recipeSlug = recipeSlugArg ?? path.basename(sourceDir);
await mkdir(outputDir, { recursive: true });

const findSource = (stepNumber) => {
  for (const extension of ['png', 'jpg', 'jpeg', 'webp']) {
    const candidate = path.join(sourceDir, `step-${stepNumber}${suffix}.${extension}`);
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

const horizontalBandScore = async (file) => {
  const { data, info } = await sharp(file)
    .rotate()
    .resize(256, 192, { fit: 'cover', position: 'centre' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const luma = (x, y) => {
    const offset = (y * info.width + x) * channels;
    return data[offset] * 0.2126 + data[offset + 1] * 0.7152 + data[offset + 2] * 0.0722;
  };
  const xStart = Math.floor(info.width * 0.08);
  const xEnd = Math.floor(info.width * 0.92);
  const yStart = Math.floor(info.height * 0.30);
  const yEnd = Math.floor(info.height * 0.75);
  const columns = xEnd - xStart;
  let best = 0;

  for (let y = yStart; y < yEnd; y += 1) {
    let positive = 0;
    let negative = 0;
    for (let x = xStart; x < xEnd; x += 1) {
      const above = (luma(x, y - 5) + luma(x, y - 3)) / 2;
      const below = (luma(x, y + 3) + luma(x, y + 5)) / 2;
      const diff = luma(x, y) - ((above + below) / 2);
      if (diff > 8) positive += 1;
      else if (diff < -8) negative += 1;
    }
    const dominant = Math.max(positive, negative) / columns;
    best = Math.max(best, dominant);
  }

  return Number(best.toFixed(3));
};

const darkGuideLineScore = async (file) => {
  const { data, info } = await sharp(file)
    .rotate()
    .resize(320, 240, { fit: 'cover', position: 'centre' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const luma = (x, y) => {
    const offset = (y * info.width + x) * channels;
    return data[offset] * 0.2126 + data[offset + 1] * 0.7152 + data[offset + 2] * 0.0722;
  };
  const xStart = Math.floor(info.width * 0.10);
  const xEnd = Math.floor(info.width * 0.90);
  const yStart = Math.floor(info.height * 0.30);
  const yEnd = Math.floor(info.height * 0.76);
  const centerX = Math.floor(info.width / 2);
  const slopes = [-0.34, -0.24, -0.14, -0.06, 0, 0.06, 0.14, 0.24, 0.34];
  let best = 0;

  for (const slope of slopes) {
    for (let y0 = yStart; y0 < yEnd; y0 += 2) {
      let dark = 0;
      let points = 0;
      let run = 0;
      let maxRun = 0;
      for (let x = xStart; x < xEnd; x += 1) {
        const y = Math.round(y0 + slope * (x - centerX));
        if (y < 4 || y >= info.height - 4) {
          run = 0;
          continue;
        }
        points += 1;
        const local = (luma(x, y - 4) + luma(x, y - 2) + luma(x, y + 2) + luma(x, y + 4)) / 4;
        const current = luma(x, y);
        if (current < 118 && local - current > 18) {
          dark += 1;
          run += 1;
          maxRun = Math.max(maxRun, run);
        } else {
          run = 0;
        }
      }
      if (points > 0) {
        const coverage = dark / points;
        const continuity = maxRun / points;
        best = Math.max(best, (coverage * 0.6) + (continuity * 0.4));
      }
    }
  }

  return Number(best.toFixed(3));
};

const rows = [];
const hashes = new Map();
const failures = [];
const warnings = [];
let manualArtifactReviewRequired = false;

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
  let skinToneRgb = null;
  if (skinToneMode === 'strict') {
    const leftTone = await meanPatch(file, metadata, 0.12);
    const rightTone = await meanPatch(file, metadata, 0.70);
    skinToneRgb = leftTone.map((value, channel) => Math.round((value + rightTone[channel]) / 2));
  }
  const bandScore = metadata.width && metadata.height ? await horizontalBandScore(file) : 0;
  const darkLineScore = metadata.width && metadata.height ? await darkGuideLineScore(file) : 0;
  rows.push({
    step: Number(stepNumber),
    file: path.basename(file),
    visualFocus: visualFocuses?.[index] ?? null,
    width: metadata.width,
    height: metadata.height,
    bytes: (await readFile(file)).length,
    skinToneRgb,
    entropy: Number(fullStats.entropy.toFixed(3)),
    sharpness: Number(fullStats.sharpness.toFixed(3)),
    horizontalBandScore: bandScore,
    darkGuideLineScore: darkLineScore
  });
}

if (rows.length === 8) {
  if (skinToneMode === 'strict') {
    const earlyBandMedian = rows
      .slice(0, 4)
      .map((row) => row.horizontalBandScore)
      .sort((a, b) => a - b);
    const baselineBandScore = (earlyBandMedian[1] + earlyBandMedian[2]) / 2;
    for (const row of rows) {
      if (row.horizontalBandScore > 0.36 && row.horizontalBandScore - baselineBandScore > 0.08) {
        warnings.push(`step-${String(row.step).padStart(2, '0')} may introduce a horizontal band or guide-line artifact (score ${row.horizontalBandScore}, baseline ${baselineBandScore.toFixed(3)}); review before approval.`);
      }
    }

    const earlyDarkMedian = rows
      .slice(0, 4)
      .map((row) => row.darkGuideLineScore)
      .sort((a, b) => a - b);
    const baselineDarkLineScore = (earlyDarkMedian[1] + earlyDarkMedian[2]) / 2;
    for (const row of rows) {
      if (row.darkGuideLineScore > 0.18 && row.darkGuideLineScore - baselineDarkLineScore > 0.045) {
        warnings.push(`step-${String(row.step).padStart(2, '0')} may contain dark drawn guide lines, lash-map ticks, or ruler marks (score ${row.darkGuideLineScore}, baseline ${baselineDarkLineScore.toFixed(3)}); review before approval.`);
      }
    }
  } else {
    const focusGroups = new Map();
    for (const row of rows) {
      if (!focusGroups.has(row.visualFocus)) focusGroups.set(row.visualFocus, []);
      focusGroups.get(row.visualFocus).push(row);
    }
    const undersampledGroups = [];
    const median = (values) => {
      const sorted = [...values].sort((a, b) => a - b);
      const middle = Math.floor(sorted.length / 2);
      return sorted.length % 2 === 1 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
    };

    for (const [visualFocus, group] of focusGroups) {
      if (group.length < 3) {
        undersampledGroups.push(`${visualFocus} (${group.map((row) => `step-${String(row.step).padStart(2, '0')}`).join(', ')})`);
        continue;
      }

      const baselineBandScore = median(group.map((row) => row.horizontalBandScore));
      const baselineDarkLineScore = median(group.map((row) => row.darkGuideLineScore));
      for (const row of group) {
        if (row.horizontalBandScore > 0.36 && row.horizontalBandScore - baselineBandScore > 0.08) {
          warnings.push(`step-${String(row.step).padStart(2, '0')} may introduce a horizontal band within visualFocus=${visualFocus} (score ${row.horizontalBandScore}, same-focus baseline ${baselineBandScore.toFixed(3)}); review before approval.`);
        }
        if (row.darkGuideLineScore > 0.18 && row.darkGuideLineScore - baselineDarkLineScore > 0.045) {
          warnings.push(`step-${String(row.step).padStart(2, '0')} may contain a dark guide-line artifact within visualFocus=${visualFocus} (score ${row.darkGuideLineScore}, same-focus baseline ${baselineDarkLineScore.toFixed(3)}); review before approval.`);
        }
      }
    }

    if (undersampledGroups.length) {
      manualArtifactReviewRequired = true;
      warnings.push(`Mixed-focus artifact baselines were not compared across different target regions. Human artifact review is required for undersampled groups: ${undersampledGroups.join('; ')}.`);
    }
  }

  if (skinToneMode === 'strict') {
    const medianTone = [0, 1, 2].map((channel) => {
      const values = rows.map((row) => row.skinToneRgb[channel]).sort((a, b) => a - b);
      return Math.round((values[3] + values[4]) / 2);
    });

    for (const row of rows) {
      row.skinToneDistance = Number(Math.sqrt(row.skinToneRgb.reduce((sum, value, channel) => sum + (value - medianTone[channel]) ** 2, 0)).toFixed(1));
      if (row.skinToneDistance > 35) failures.push(`step-${String(row.step).padStart(2, '0')} has severe sampled skin-tone drift (${row.skinToneDistance}).`);
      else if (row.skinToneDistance > 22) warnings.push(`step-${String(row.step).padStart(2, '0')} has visible sampled skin-tone drift (${row.skinToneDistance}); review white balance and undertone.`);
    }
  } else {
    for (const row of rows) row.skinToneDistance = null;
    warnings.push('Mixed-focus sequence uses target-specific crops, so fixed-coordinate skin-tone drift is not scored. Human review must confirm comparable skin depth, undertone, white balance, and lighting before approval.');
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

await writeFile(path.join(outputDir, 'progressive-image-audit.json'), JSON.stringify({
  recipeSlug,
  skinToneMode,
  manualSkinToneReviewRequired: skinToneMode === 'manual',
  manualArtifactReviewRequired,
  rows,
  warnings,
  failures,
}, null, 2) + '\n');

if (warnings.length) {
  console.error(`Progressive image warnings [${recipeSlug}]:`);
  for (const warning of warnings) console.error(`- [${recipeSlug}] ${warning}`);
}
if (failures.length) {
  console.error(`Progressive image audit failed [${recipeSlug}]:`);
  for (const failure of failures) console.error(`- [${recipeSlug}] ${failure}`);
  process.exit(1);
}

console.log(`Progressive image audit passed for ${rows.length} images. Full-resolution makeup-sequence and skin-texture review remains required.`);
