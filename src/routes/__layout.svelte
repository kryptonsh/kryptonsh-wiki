<script context="module" lang="ts">
  import Sidebar from '$lib/Sidebar.svelte';
  import '../app.scss';
  import type { Page } from '../routes/pages/_pages';

  export async function load({ fetch }) {
    const res = await fetch('pages.json');
    const pages = (await res.json()) as Page[];

    return {
      status: 200,
      props: { pages },
    };
  }
</script>

<script lang="ts">
  export let pages: Page[] = [];
</script>

<Sidebar {pages} />

<section class="markdown-body">
  <slot />
</section>

<style>
</style>
