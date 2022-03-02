import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export type Page = {
  name: string;
  slug: string;
};

const pages: Page[] = [
  {
    name: 'Home',
    slug: '',
  },
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nameRegex = /export const name = '(.*)'/; // wtf is this regex? it's not working for some reason :(  what

fs.readdirSync(path.resolve(__dirname, '../')).forEach((file) => {
  if (file.endsWith('.svx')) {
    const fileContent = fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8');
    const slug = file.replace('.svx', '');
    if (slug === 'index') return;

    const name = nameRegex.exec(fileContent)[1];

    pages.push({
      name,
      slug,
    });
  }
});

export default pages;
