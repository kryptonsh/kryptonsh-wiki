<script lang="ts">
  import { getFriendlyNodeName } from '$lib/utils';
  import { createEventDispatcher } from 'svelte';
  import SidebarNode from './SidebarNode.svelte';

  export let rootNode: RNodeRuntime;

  let nodeTree = [];

  function simplify(node: RNodeRuntime) {
    return {
      id: node.id,
      name: getFriendlyNodeName(node),
      path: node.path.endsWith('index') ? node.path.slice(0, -5) : node.path,
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

  const dispatch = createEventDispatcher();

  function onClicked() {
    dispatch('clicked');
  }
</script>

<aside class="flex h-full flex-col gap-2 bg-[#1c1c1c] p-4">
  {#each nodeTree as node}
    <SidebarNode on:clicked={onClicked} {node} />
  {/each}
</aside>
