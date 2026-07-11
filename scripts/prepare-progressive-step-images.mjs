import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const recipe = valueFor('--recipe');
const sourceDirArg = valueFor('--source-dir');
const outputDirArg = valueFor('--output-dir');

if (!recipe || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(recipe)) {
  throw new Error('Pass a valid --recipe slug.');
}
if (!sourceDirArg) throw new Error('Pass --source-dir containing step-01 through step-08 source images.');

const sourceDir = path.resolve(sourceDirArg);
const outputDir = outputDirArg
  ? path.resolve(outputDirArg)
  : path.resolve('src', 'assets', 'tutorial-steps', recipe);

const findSource = (stepNumber) => {
  for (const extension of ['png', 'jpg', 'jpeg', 'webp']) {
    const candidate = path.join(sourceDir, `step-${stepNumber}.${extension}`);
    if (existsSync(candidate)) return candidate;
  }
  return undefined;
};

const sources = Array.from({ length: 8 }, (_, index) => {
  const stepNumber = String(index + 1).padStart(2, '0');
  const file = findSource(stepNumber);
  if (!file) throw new Error(`Missing step-${stepNumber} source image in ${sourceDir}.`);
  return { stepNumber, file };
});

await mkdir(outputDir, { recursive: true });

for (const source of sources) {
  const metadata = await sharp(source.file).metadata();
  if (!metadata.width || !metadata.height || metadata.width < 1280 || metadata.height < 960) {
    throw new Error(`${path.basename(source.file)} is ${metadata.width ?? 0}x${metadata.height ?? 0}; source must be at least 1280x960.`);
  }

  const output = path.join(outputDir, `step-${source.stepNumber}-curated.webp`);
  await sharp(source.file)
    .rotate()
    .resize({ width: 1280, height: 960, fit: 'cover', position: 'centre' })
    .webp({ quality: 92, effort: 6, smartSubsample: false })
    .toFile(output);

  const finalMetadata = await sharp(output).metadata();
  console.log(`${path.basename(output)}: ${finalMetadata.width}x${finalMetadata.height}`);
}

console.log(`Prepared 8 progressive step images for ${recipe} in ${outputDir}.`);
