import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;'
      },

      postcss: true
    }),
    mdsvex(mdsvexConfig)
  ],

  kit: {
    adapter: adapter(),

    // Override http methods in the Todo forms
    methodOverride: {
      allowed: ['PATCH', 'DELETE']
    },

    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "src/variables.scss" as *;'
          }
        }
      }
    }
  }
};

export default config;
