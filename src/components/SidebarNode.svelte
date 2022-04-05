<script lang="ts">
  import SidebarButton from './SidebarButton.svelte';
  import SidebarGroup from './SidebarGroup.svelte';
  import { activeNode } from '$lib/utils';

  export let node: RNodeRuntime;
  export let nested = 0;
</script>

{#if node.children === null}
  <SidebarButton active={$activeNode && node.id === $activeNode.id} name={node.name} route={node.path} {nested} />
{:else}
  <SidebarGroup name={node.name} {nested} />
  {#each node.children as child}
    <svelte:self node={child} nested={nested + 1} />
  {/each}
{/if}
