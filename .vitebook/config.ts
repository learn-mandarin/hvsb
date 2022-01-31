import { svelte } from '@sveltejs/vite-plugin-svelte';
import { clientPlugin, defineConfig } from '@vitebook/client/node';
import { svelteMarkdownPlugin } from '@vitebook/markdown-svelte/node';
import { defaultThemePlugin, DefaultThemeConfig } from '@vitebook/theme-default/node';
import preprocess from 'svelte-preprocess';

export default defineConfig<DefaultThemeConfig>({
  include: ['docs/**/*.md', 'docs/**/*.story.svelte'],
  // include: ['src/**/*.{md,svelte}'],
  plugins: [
    svelteMarkdownPlugin(),
    clientPlugin({ appFile: 'App.svelte' }),
    defaultThemePlugin(),
    svelte({
      extensions: ['.svelte', '.md'],
      // Consult https://github.com/sveltejs/svelte-preprocess for more information
      // about preprocessors.
      preprocess: preprocess(),
    }),
  ],
  site: {
    title: 'HVSB',
    description: 'The fastest way to build Svelte apps.',
    theme: {
      sidebar: {
        style: 'explorer',
        // categories: true,
      },
      markdown: {
        toc: true,
        editLink: true,
        editLinkText: 'Edit on GitHub',
        prevLink: true,
        nextLink: true,
        lastUpdated: true,
      },
      remoteGitRepo: {
        url: 'jacob-hvsb/hvsb',
      },
    },
  },
  vite: {
    server: {
      hmr: {
        clientPort: process.env.HMR_HOST ? 443 : 3000,
        host: process.env.HMR_HOST
          ? process.env.HMR_HOST.substring('https://'.length)
          : 'localhost',
      },
    },
  },
});
