<script lang="ts">
  import { getFriendlyNodeName } from '$lib/utils';
  import SidebarNode from './SidebarNode.svelte';

  export let rootNode: RNodeRuntime;

  let nodeTree = [];

  function simplify(node: RNodeRuntime) {
    console.log({ id: node.id });

    return {
      id: node.id,
      name: getFriendlyNodeName(node),
      path: node.path,
      children: node.module ? null : node.children.map(simplify),
    };
  }

  function getNodeTree(root: RNodeRuntime) {
    if (!root) return;

    nodeTree = root.children.map((child) => {
      return simplify(child as RNodeRuntime);
    });
  }

  $: {
    nodeTree = [];
    getNodeTree(rootNode);
  }
</script>

<aside class="flex h-full flex-col gap-2 bg-[#1c1c1c] p-4">
  {#each nodeTree as node}
    <SidebarNode {node} />
  {/each}
</aside>
