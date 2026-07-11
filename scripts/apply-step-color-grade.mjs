import { existsSync } from 'node:fs';
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const sourceDirArg = valueFor('--source-dir');
const outputDirArg = valueFor('--output-dir');
const stepsArg = valueFor('--steps');
const offset = Number(valueFor('--rgb-offset') ?? 0);

if (!sourceDirArg || !outputDirArg || !stepsArg) {
  throw new Error('Pass --source-dir, --output-dir, --steps 01,02 and --rgb-offset.');
}
if (!Number.isFinite(offset) || Math.abs(offset) > 24) {
  throw new Error('--rgb-offset must be a number from -24 to 24.');
}

const sourceDir = path.resolve(sourceDirArg);
const outputDir = path.resolve(outputDirArg);
const gradedSteps = new Set(stepsArg.split(',').map((value) => value.trim().padStart(2, '0')));
await mkdir(outputDir, { recursive: true });

for (let index = 0; index < 8; index += 1) {
  const stepNumber = String(index + 1).padStart(2, '0');
  const input = path.join(sourceDir, `step-${stepNumber}.png`);
  const output = path.join(outputDir, `step-${stepNumber}.png`);
  if (!existsSync(input)) throw new Error(`Missing ${input}.`);

  if (gradedSteps.has(stepNumber)) {
    await sharp(input)
      .linear(1, offset)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(output);
    console.log(`step-${stepNumber}: applied neutral RGB offset ${offset}.`);
  } else {
    await copyFile(input, output);
  }
}

console.log(`Prepared color-graded step set in ${outputDir}. No sharpening or smoothing applied.`);
