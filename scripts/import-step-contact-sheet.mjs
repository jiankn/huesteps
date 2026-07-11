import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const args = Object.fromEntries(process.argv.slice(2).map((value) => {
  const [key, ...rest] = value.replace(/^--/, '').split('=');
  return [key, rest.join('=')];
}));

const input = args.input;
const slug = args.slug;
const columns = Number(args.columns ?? 4);
const rows = Number(args.rows ?? 2);
const gutter = Number(args.gutter ?? 6);
const suffix = args.suffix ?? 'curated';

if (!input || !slug) {
  throw new Error('Usage: node scripts/import-step-contact-sheet.mjs --input=... --slug=... [--columns=4 --rows=2 --gutter=6 --suffix=curated]');
}

const metadata = await sharp(input).metadata();
if (!metadata.width || !metadata.height) throw new Error(`Cannot read contact sheet dimensions: ${input}`);

const cellWidth = (metadata.width - (columns - 1) * gutter) / columns;
const cellHeight = (metadata.height - (rows - 1) * gutter) / rows;
const outputDir = path.resolve('src', 'assets', 'tutorial-steps', slug);
await mkdir(outputDir, { recursive: true });

let index = 0;
for (let row = 0; row < rows; row += 1) {
  for (let column = 0; column < columns; column += 1) {
    index += 1;
    const cellLeft = Math.round(column * (cellWidth + gutter));
    const cellTop = Math.round(row * (cellHeight + gutter));
    const availableWidth = Math.min(Math.round(cellWidth), metadata.width - cellLeft);
    const availableHeight = Math.min(Math.round(cellHeight), metadata.height - cellTop);
    const targetRatio = 4 / 3;
    const cropWidth = Math.min(availableWidth, Math.round(availableHeight * targetRatio));
    const cropHeight = Math.min(availableHeight, Math.round(cropWidth / targetRatio));
    const left = cellLeft + Math.max(0, Math.floor((availableWidth - cropWidth) / 2));
    const top = cellTop + Math.max(0, Math.floor((availableHeight - cropHeight) / 2));
    const filename = `step-${String(index).padStart(2, '0')}-${suffix}.webp`;

    await sharp(input)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(720, 540, { fit: 'cover' })
      .sharpen({ sigma: 0.4 })
      .webp({ quality: 84, effort: 4, smartSubsample: true })
      .toFile(path.join(outputDir, filename));
  }
}

console.log(`Imported ${index} curated step images for ${slug}.`);

