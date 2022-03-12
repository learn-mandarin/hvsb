import { svelte } from '@sveltejs/vite-plugin-svelte';
import { clientPlugin, defineConfig } from '@vitebook/client/node';
import { svelteMarkdownPlugin } from '@vitebook/markdown-svelte/node';
import { defaultThemePlugin, DefaultThemeConfig } from '@vitebook/theme-default/node';
import { shikiMarkdownPlugin } from '@vitebook/markdown-shiki/node';
import preprocess from 'svelte-preprocess';

export default defineConfig<DefaultThemeConfig>({
  include: ['docs/**/*.md', 'src/**/*.story.svelte'],
  // include: ['docs/**/*.md', 'src/**/*.md', 'src/**/*.story.svelte'],
  alias: {
    $lib: '/src/lib',
  },
  plugins: [
    svelteMarkdownPlugin({
      code: {
        lineNumbers: false,
      },
    }),
    shikiMarkdownPlugin({
      langs: ['html', 'css', 'js', 'ts', 'svelte'],
      theme: 'dark-plus',
    }),
    clientPlugin({ appFile: 'App.svelte' }),
    defaultThemePlugin(),
    svelte({
      compilerOptions: {
        hydratable: true,
      },
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
        style: 'docs',
        categories: true,
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
