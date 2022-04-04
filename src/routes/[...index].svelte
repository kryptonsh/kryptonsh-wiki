<script context="module">
  import { createRouter, Router } from '@roxi/routify';
  import Navbar from '../components/Navbar.svelte';
  import routes from '../../.routify/routes.default';
  import Scroller from '../components/Scroller.svelte';
  import Sidebar from '../components/Sidebar.svelte';

  const router = createRouter({ routes });
  const rootNode = router.rootNode;

  export const load = ({ url }) => router.url.replace(url.pathname);
</script>

<Navbar />
<main>
  <Scroller>
    <Sidebar {rootNode} />
  </Scroller>
  <Scroller>
    <section class="p-4">
      <div class="markdown-body">
        <Router {router} />
      </div>
      <div class="divider no-text my-4" />
      <footer>:)</footer>
      <div class="h-12" />
    </section>
  </Scroller>
</main>
