<script lang="ts">
  import type { Page } from '../routes/pages/_pages';

  export let pages = [] as Page[];
</script>

<aside>
  {#each pages as page}
    <a href={`/${page.slug}`}>{page.name}</a>
  {/each}
</aside>

<style lang="scss">
  aside {
    @apply px-4 hidden md:flex;
  }
</style>
