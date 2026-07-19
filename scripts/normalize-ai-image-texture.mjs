import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const inputArg = valueFor('--input');
const outputArg = valueFor('--output');
const sigmaColor = Number(valueFor('--sigma-color') ?? 14);
const noiseAmplitude = Number(valueFor('--noise') ?? 0.35);
const radius = Number(valueFor('--radius') ?? 2);
const sigmaSpace = Number(valueFor('--sigma-space') ?? 1.25);

if (!inputArg || !outputArg) {
  throw new Error(
    'Usage: node scripts/normalize-ai-image-texture.mjs --input <file> --output <file> '
    + '[--sigma-color 14] [--noise 0.35] [--radius 2] [--sigma-space 1.25]'
  );
}
if (!Number.isFinite(sigmaColor) || sigmaColor < 8 || sigmaColor > 22) {
  throw new Error('--sigma-color must be between 8 and 22; stronger correction is a regeneration failure, not a production fix.');
}
if (!Number.isFinite(noiseAmplitude) || noiseAmplitude < 0 || noiseAmplitude > 1) {
  throw new Error('--noise must be between 0 and 1.');
}
if (!Number.isInteger(radius) || radius < 1 || radius > 3) {
  throw new Error('--radius must be an integer between 1 and 3; larger kernels can conceal hard-fail artifacts.');
}
if (!Number.isFinite(sigmaSpace) || sigmaSpace < 0.75 || sigmaSpace > 1.8) {
  throw new Error('--sigma-space must be between 0.75 and 1.8.');
}

const input = path.resolve(inputArg);
const output = path.resolve(outputArg);
const { data, info } = await sharp(input)
  .rotate()
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const spatialWeights = [];
for (let y = -radius; y <= radius; y += 1) {
  for (let x = -radius; x <= radius; x += 1) {
    spatialWeights.push(Math.exp(-((x * x) + (y * y)) / (2 * sigmaSpace * sigmaSpace)));
  }
}

const maxColorDistance = 3 * 255 * 255;
const colorWeights = new Float32Array(maxColorDistance + 1);
const colorDenominator = 2 * sigmaColor * sigmaColor;
for (let distance = 0; distance <= maxColorDistance; distance += 1) {
  colorWeights[distance] = Math.exp(-distance / colorDenominator);
}

let randomState = 0x5f3759df;
const random = () => {
  randomState ^= randomState << 13;
  randomState ^= randomState >>> 17;
  randomState ^= randomState << 5;
  return (randomState >>> 0) / 4294967296;
};

const normalized = Buffer.alloc(data.length);
for (let y = 0; y < info.height; y += 1) {
  for (let x = 0; x < info.width; x += 1) {
    const offset = (y * info.width + x) * info.channels;
    const baseRed = data[offset];
    const baseGreen = data[offset + 1];
    const baseBlue = data[offset + 2];
    let red = 0;
    let green = 0;
    let blue = 0;
    let totalWeight = 0;
    let spatialIndex = 0;

    for (let offsetY = -radius; offsetY <= radius; offsetY += 1) {
      const sourceY = Math.max(0, Math.min(info.height - 1, y + offsetY));
      for (let offsetX = -radius; offsetX <= radius; offsetX += 1, spatialIndex += 1) {
        const sourceX = Math.max(0, Math.min(info.width - 1, x + offsetX));
        const sourceOffset = (sourceY * info.width + sourceX) * info.channels;
        const redDifference = data[sourceOffset] - baseRed;
        const greenDifference = data[sourceOffset + 1] - baseGreen;
        const blueDifference = data[sourceOffset + 2] - baseBlue;
        const colorDistance =
          (redDifference * redDifference)
          + (greenDifference * greenDifference)
          + (blueDifference * blueDifference);
        const weight = spatialWeights[spatialIndex] * colorWeights[colorDistance];
        red += data[sourceOffset] * weight;
        green += data[sourceOffset + 1] * weight;
        blue += data[sourceOffset + 2] * weight;
        totalWeight += weight;
      }
    }

    const neutralNoise = noiseAmplitude
      ? (random() + random() + random() + random() - 2) * noiseAmplitude
      : 0;
    normalized[offset] = Math.max(0, Math.min(255, Math.round((red / totalWeight) + neutralNoise)));
    normalized[offset + 1] = Math.max(0, Math.min(255, Math.round((green / totalWeight) + neutralNoise)));
    normalized[offset + 2] = Math.max(0, Math.min(255, Math.round((blue / totalWeight) + neutralNoise)));
  }
}

await mkdir(path.dirname(output), { recursive: true });
const pipeline = sharp(normalized, { raw: info });
if (path.extname(output).toLowerCase() === '.webp') {
  await pipeline.webp({ quality: 94, effort: 6, smartSubsample: false }).toFile(output);
} else {
  await pipeline.png({ compressionLevel: 9 }).toFile(output);
}

console.log(`Normalized repeated AI microtexture: ${path.relative(process.cwd(), output)} (${info.width}x${info.height})`);
