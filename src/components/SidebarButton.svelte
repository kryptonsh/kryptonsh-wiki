<script lang="ts">
  import IndentGuide from './IndentGuide.svelte';

  export let route: string;
  export let name: string;
  export let nested: number = 0; //

  function clicked() {
    history.pushState(null, null, route);
  }
</script>

<div class="flex select-none flex-row">
  <IndentGuide {nested} />
  <button class="flex-grow" on:click={clicked}>{name.replace(/-/g, ' ')}</button>
</div>

<style scoped lang="scss">
  button {
    @apply rounded-md text-left font-roboto capitalize hover:bg-elevated active:bg-muted;

    padding: 6px 10px;

    font-weight: 500;
    line-height: 22px;
    font-size: 1rem;

    color: lighten(#5c6975, 40%);
  }
</style>
