<script lang="ts">
  import { kebabToSentenceCase } from '$lib/utils';
  import { createEventDispatcher } from 'svelte';
  import IndentGuide from './IndentGuide.svelte';

  export let active: boolean;
  export let route: string;
  export let name: string;
  export let nested: number = 0; //

  const dispatch = createEventDispatcher();

  function clicked(event: Event) {
    dispatch('clicked');

    event.preventDefault();

    history.pushState(null, null, route);
  }
</script>

<div class="flex select-none flex-row">
  <IndentGuide {nested} />
  <a href={route.replace(/\/index$/, '')} disabled={active} class="inline-flex flex-grow" on:click={clicked}>
    {#if active}
      <i>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path
            d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"
          />
        </svg>
      </i>
    {/if}

    {kebabToSentenceCase(name)}
  </a>
</div>

<style scoped lang="scss">
  a {
    @apply items-center rounded-md text-left font-roboto capitalize;
    @apply hover:bg-elevated active:bg-muted disabled:text-white;
    @apply py-[6px] px-[10px];

    font-weight: 500;
    line-height: 22px;
    font-size: 1rem;

    color: lighten(#5c6975, 40%);

    & i {
      @apply flex fill-white;
      @apply pb-[1px];

      height: 14px;
      width: 14px;
    }
  }
</style>
