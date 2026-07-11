import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://huesteps.com',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  vite: {
    build: {
      sourcemap: false
    }
  }
});
