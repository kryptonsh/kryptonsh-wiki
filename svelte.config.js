import routify from '@roxi/routify/vite-plugin';
import adapterAuto from '@sveltejs/adapter-auto';
import cfAdapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import mdsvexConfig from './mdsvex.config.js';

let adapter = adapterAuto();

if (process.env.NODE_ENV === 'production') {
  adapter = cfAdapter();
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      scss: {
        prependData: '@use "src/styles/variables.scss" as *;',
      },

      postcss: true,
    }),
    mdsvex(mdsvexConfig),
  ],

  kit: {
    adapter,

    vite: {
      plugins: [routify({ routesDir: 'src/pages' })],
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "src/styles/variables.scss" as *;',
          },
        },
      },
    },
  },
};

export default config;
