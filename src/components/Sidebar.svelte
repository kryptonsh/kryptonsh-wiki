<script lang="ts">
  import SidebarButton from './SidebarButton.svelte';
  import SidebarGroup from './SidebarGroup.svelte';
  import SidebarNode from './SidebarNode.svelte';

  export let rootNode;

  let nodeTree = [];

  function simplify(node: RNodeRuntime) {
    return {
      id: node.id,
      name: node.name === 'index' ? node.parent.name ?? 'home' : node.name,
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
    // console.log(nodeTree);
  }
</script>

<aside class="flex h-full flex-col gap-2 bg-[#1c1c1c] p-4">
  {#each nodeTree as node}
    <SidebarNode {node} />
  {/each}
</aside>
