<script setup lang="ts">
import type { Ref } from 'vue';
import type { NodeTreeNode } from '~~/composables/useNodeTree';

const nodeTree = useNodeTree();
const activeNode = useActiveNode();

const computedTree = ref([]) as Ref<NodeTreeNode[]>;

watch(
  nodeTree,
  () => {
    computedTree.value = nodeTree.value.map((n) => ({
      ...n,
      children: n.children.map((cn) => ({
        ...cn,
        title: cn._path === n._path ? 'Home' : cn.title,
      })),
    }));
  },
  { immediate: true, deep: true },
);

watch(
  activeNode,
  () => {
    computedTree.value.forEach((n) => {
      setActive(n, []);
    });
  },
  { immediate: true },
);

function setActive(node: NodeTreeNode, parents: NodeTreeNode[]) {
  if (node._path === activeNode.value._path) {
    node.active = true;

    parents.forEach((p) => {
      p.active = true;
    });

    if (node.children) {
      node.children.forEach((c) => {
        if (c._path === activeNode.value._path) {
          c.active = true;
        }
      });
    }
  } else {
    node.children?.forEach((child) => {
      setActive(child, [...parents, node]);
    });
  }
}

// onMounted(() => {
//   computedTree.value.forEach((n) => logNode(n, 0));
// });

// function logNode(node: NodeTreeNode, depth: number) {
//   // eslint-disable-next-line no-console
//   console.log(`${' '.repeat(depth * 2)}${node.title}`);
//   if (node.children) {
//     node.children.forEach((child) => logNode(child, depth + 1));
//   }
// }
</script>

<template>
  <aside class="navvy">
    <nav>
      <ul>
        <NavvyNode v-for="node in computedTree" :key="node._path" :node="node" :depth="0" />
      </ul>
    </nav>
  </aside>
</template>

<style lang="postcss">
.navvy {
  @apply lg:top-$header-height overflow-y-auto overflow-x-hidden pb-8  lg:col-span-2 lg:-mt-8 lg:block lg:self-start lg:pb-0 lg:pt-8;
}
</style>
