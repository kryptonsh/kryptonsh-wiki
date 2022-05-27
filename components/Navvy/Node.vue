<script setup lang="ts">
import type { NodeTreeNode } from '~~/composables/useNodeTree';

defineProps<{ node: NodeTreeNode; depth: number }>();
</script>

<template>
  <li v-if="depth < 10 && node.children?.length" class="navvy-node" :class="node.active ? 'active' : ''">
    <div>
      <span class="inline-flex items-center">
        <span>{{ node.title }}</span>
      </span>
    </div>

    <ul v-if="depth < 10 && node.children?.length">
      <NavvyNode v-for="child in node.children" :key="child._path" :node="child" :depth="depth + 1" />
    </ul>
  </li>

  <li v-else class="navvy-node" :class="node.active ? 'active' : ''">
    <a :href="node._path">
      <span class="inline-flex items-center">
        <span>{{ node.title }}</span>
      </span>
    </a>
  </li>
</template>

<style lang="postcss">
.navvy-node {
  @apply dark:(border-gray-700  hover:border-gray-500) ml-2 border-gray-100 pl-3 transition-colors hover:border-gray-300;
}

.navvy-node .navvy-node {
  @apply border-l;
}

.navvy-node.active {
  @apply border-wicked-400 dark:border-wicked-600;
}

.navvy-node > div {
  @apply flex items-center justify-between pt-2 text-sm font-semibold text-gray-900 dark:text-gray-200;
}

.navvy-node > a {
  @apply dark:(text-gray-300 hover:text-gray-200) flex items-center justify-between py-1.5 text-sm text-gray-600 hover:text-gray-800;
}

.navvy-node.active > a {
  @apply text-wicked font-medium;
}

.navvy-node > ul {
  @apply py-2;
}

.navvy-node,
.navvy-node > ul > li {
  @apply list-none;
}
</style>
