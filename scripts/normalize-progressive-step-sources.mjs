import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const execFileAsync = promisify(execFile);
const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const sourceDirArg = valueFor('--source-dir');
const outputDirArg = valueFor('--output-dir');
const sigmaColor = valueFor('--sigma-color') ?? '14';
const noise = valueFor('--noise') ?? '0.35';
const radius = valueFor('--radius') ?? '2';
const sigmaSpace = valueFor('--sigma-space') ?? '1.25';

if (!sourceDirArg || !outputDirArg) {
  throw new Error(
    'Usage: node scripts/normalize-progressive-step-sources.mjs --source-dir <raw> --output-dir <sources> '
    + '[--sigma-color 14] [--noise 0.35] [--radius 2] [--sigma-space 1.25]'
  );
}

const sourceDir = path.resolve(sourceDirArg);
const outputDir = path.resolve(outputDirArg);
const normalizer = path.resolve('scripts', 'normalize-ai-image-texture.mjs');
await mkdir(outputDir, { recursive: true });

const findSource = (stepNumber) => {
  for (const extension of ['png', 'jpg', 'jpeg', 'webp']) {
    const candidate = path.join(sourceDir, `step-${stepNumber}.${extension}`);
    if (existsSync(candidate)) return candidate;
  }
  return undefined;
};

for (let index = 1; index <= 8; index += 1) {
  const stepNumber = String(index).padStart(2, '0');
  const input = findSource(stepNumber);
  if (!input) throw new Error(`Missing raw step-${stepNumber} in ${sourceDir}.`);
  const output = path.join(outputDir, `step-${stepNumber}.png`);
  const { stdout } = await execFileAsync(process.execPath, [
    normalizer,
    '--input',
    input,
    '--output',
    output,
    '--sigma-color',
    sigmaColor,
    '--noise',
    noise,
    '--radius',
    radius,
    '--sigma-space',
    sigmaSpace
  ]);
  process.stdout.write(stdout);
}

console.log(`Normalized 8 progressive step sources into ${path.relative(process.cwd(), outputDir)}.`);
