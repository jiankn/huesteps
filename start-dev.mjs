import { dev } from 'astro';

dev({
  root: process.cwd(),
  server: {
    host: '127.0.0.1',
    port: 4321
  }
}).then(() => {
  console.log("Programmatic dev server started!");
}).catch(console.error);
