import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import slug from 'remark-slug';

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [slug],
  rehypePlugins: [],
});

export default config;
