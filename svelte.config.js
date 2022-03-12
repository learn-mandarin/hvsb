import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const md = require('vite-plugin-markdown');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    defaults: {
      sourceMap: true,
      style: 'postcss',
    },
    postcss: true,
  }),

  disableDependencyReinclusion: ['svench'],
  kit: {
    adapter: adapter(),
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          $sveltefirets: path.resolve('./src/sveltefirets'),
        },
      },
      server: {
        hmr: {
          clientPort: process.env.HMR_HOST ? 443 : 3000,
          host: process.env.HMR_HOST
            ? process.env.HMR_HOST.substring('https://'.length)
            : 'localhost',
        },
      },
      plugins: [md.plugin({ mode: 'html' })],
      optimizeDeps: {
        include: [
          'linkifyjs/html.js',
          // 'instantsearch.js/es/widgets/index.js'
        ],
      },
    },
  },
};

export default config;
