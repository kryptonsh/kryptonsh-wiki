import type { RequestHandler } from '@sveltejs/kit';
import pages from './_pages.js';

const contents: string = JSON.stringify(
    pages.map(page => ({
      name: page.name,
      slug: page.slug
    }))
);


// noinspection JSUnusedGlobalSymbols
export const get: RequestHandler = () => ({
  body: contents
});
