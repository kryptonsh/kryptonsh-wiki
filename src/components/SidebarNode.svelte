<script lang="ts">
  import { activeNode } from '$lib/utils';
  import { createEventDispatcher } from 'svelte';
  import SidebarButton from './SidebarButton.svelte';
  import SidebarGroup from './SidebarGroup.svelte';

  export let node: RNodeRuntime;
  export let nested = 0;

  const dispatch = createEventDispatcher();

  function onClicked() {
    dispatch('clicked');
  }
</script>

{#if node.children === null}
  <SidebarButton
    on:clicked={onClicked}
    active={$activeNode && node.id === $activeNode.id}
    name={node.name}
    route={node.path}
    {nested}
  />
{:else}
  <SidebarGroup name={node.name} {nested} />
  {#each node.children as child}
    <svelte:self node={child} nested={nested + 1} />
  {/each}
{/if}
