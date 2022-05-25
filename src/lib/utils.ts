import type { RNodeRuntime } from '@roxi/routify/lib/runtime/Instance/RNodeRuntime';
import { writable, type Writable } from 'svelte/store';

export function getFriendlyNodeName(node: RNodeRuntime) {
  return node.name === 'index' ? node.parent.name ?? 'home' : node.name ?? 'null';
}

export function kebabToSentenceCase(str: string) {
  return str
    .replace(/-/g, ' ')
    .split(' ')
    .map((w: string) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
}

const repoBase = {
  name: 'kryptonsh-wiki',
  owner: 'kryptonsh',
};

/**
 * Get url to last commit from github api
 * @param path Page path
 * @returns {URL} Url
 */
export function getLastCommitUrl(path: string): URL {
  return new URL(`https://api.github.com/repos/${repoBase.owner}/${repoBase.name}/commits?path=${path}&per_page=1&page=1`);
}

export function fragmentToPath(fragment: string) {
  return fragment.replace('_default', '').replace('_', '/');
}

export const activeNode: Writable<RNodeRuntime> = writable(null);
