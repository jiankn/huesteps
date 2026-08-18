import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/make-handoff-contact-sheet.mjs <slug>');
  process.exit(1);
}

const base = path.resolve('tmp/gemini-image-handoff-2026-08-17', slug);
const hero = path.join(base, 'hero/hero-master.png');
const files = [hero, ...Array.from({ length: 8 }, (_, i) => path.join(base, 'raw', `step-${String(i + 1).padStart(2, '0')}.png`))];
const labels = ['HERO', ...Array.from({ length: 8 }, (_, i) => `STEP ${String(i + 1).padStart(2, '0')}`)];
const width = 520;
const imageHeight = 390;
const labelHeight = 54;
const columns = 3;

const tiles = await Promise.all(files.map(async (file, index) => {
  const image = await sharp(file).rotate().resize(width, imageHeight, { fit: 'cover' }).webp({ quality: 92 }).toBuffer();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${labelHeight}"><rect width="100%" height="100%" fill="#111317"/><text x="18" y="35" fill="#f4f1eb" font-family="Arial" font-size="18" font-weight="700">${labels[index]}</text></svg>`;
  const label = Buffer.from(svg);
  return sharp({ create: { width, height: imageHeight + labelHeight, channels: 3, background: '#111317' } })
    .composite([{ input: image, top: 0, left: 0 }, { input: label, top: imageHeight, left: 0 }])
    .webp({ quality: 92 }).toBuffer();
}));

const rows = Math.ceil(tiles.length / columns);
const outDir = path.join(base, 'final-audit');
await mkdir(outDir, { recursive: true });
const out = path.join(outDir, 'hero-plus-8-review-contact-sheet.webp');
await sharp({ create: { width: width * columns, height: (imageHeight + labelHeight) * rows, channels: 3, background: '#0a0b0e' } })
  .composite(tiles.map((input, index) => ({ input, left: (index % columns) * width, top: Math.floor(index / columns) * (imageHeight + labelHeight) })))
  .webp({ quality: 92 }).toFile(out);

console.log('Created contact sheet:', out);
