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

export const activeNode: Writable<RNodeRuntime> = writable(null);
