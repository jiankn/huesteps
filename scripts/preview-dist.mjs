import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const root = path.resolve('dist');
const host = process.env.HOST ?? '127.0.0.1';
const port = Number(process.env.PORT ?? 4321);

const types = new Map([
  ['.avif', 'image/avif'],
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.xml', 'application/xml; charset=utf-8']
]);

const safePath = (pathname) => {
  const decoded = decodeURIComponent(pathname);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const candidate = path.join(root, normalized);
  return candidate.startsWith(root) ? candidate : null;
};

const findFile = async (pathname) => {
  const candidate = safePath(pathname);
  if (!candidate) return null;
  const attempts = path.extname(candidate)
    ? [candidate]
    : [path.join(candidate, 'index.html'), `${candidate}.html`];

  for (const file of attempts) {
    try {
      const info = await stat(file);
      if (info.isFile()) return file;
    } catch {
      // Try the next route shape.
    }
  }
  return null;
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${host}:${port}`);
  const file = await findFile(url.pathname) ?? path.join(root, '404.html');
  const ext = path.extname(file);
  response.setHeader('Content-Type', types.get(ext) ?? 'application/octet-stream');
  response.statusCode = file.endsWith(`${path.sep}404.html`) ? 404 : 200;
  createReadStream(file).pipe(response);
});

server.listen(port, host, () => {
  console.log(`HueSteps dist preview: http://${host}:${port}/`);
});
