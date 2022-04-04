<script lang="ts">
  import IndentGuide from './IndentGuide.svelte';

  export let name: string;
  export let nested: number = 0;
</script>

<div class="flex flex-row">
  <IndentGuide {nested} />
  <h3>{name.toUpperCase()}</h3>
</div>

<style scoped lang="css">
  h3 {
    @apply select-none font-roboto text-sm font-[900] text-secondary;
    letter-spacing: 1.2px;
    line-height: 18px;
  }
</style>
