<script lang="ts">
  import SidebarButton from './SidebarButton.svelte';
  import SidebarGroup from './SidebarGroup.svelte';

  export let node;
  export let nested = 0;
</script>

{#if node.children === null}
  <SidebarButton name={node.name} route={node.path} {nested} />
{:else}
  <SidebarGroup name={node.name} {nested} />
  {#each node.children as child}
    <svelte:self node={child} nested={nested + 1} />
  {/each}
{/if}
