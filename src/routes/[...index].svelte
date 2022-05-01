<script lang="ts">
  import { activeNode } from '$lib/utils';
  import { createRouter, Router } from '@roxi/routify';
  import routes from '../../.routify/routes.default';
  import Navbar from '../components/Navbar.svelte';
  import Scroller from '../components/Scroller.svelte';
  import Sidebar from '../components/Sidebar.svelte';

  const router = createRouter({ routes });
  const rootNode = router.rootNode;

  router &&
    router.activeRoute.subscribe((activeRoute) => {
      if (activeRoute) {
        $activeNode = activeRoute.allFragments[activeRoute.allFragments.length - 1].node;
      } else {
        $activeNode = null;
      }
    });

  let sidebar = false;

  function toggleSidebar() {
    sidebar = !sidebar;
  }
</script>

<Navbar on:sidebar={toggleSidebar} />
<div class="popup-bg {sidebar ? '' : 'hidden'}" on:click={() => (sidebar = false)} />
<main class={sidebar ? '' : 'no-sidebar'}>
  <div class="sidebar-container {sidebar ? 'open' : 'closed'}">
    <Scroller>
      <Sidebar {rootNode} on:clicked={() => (sidebar = false)} />
    </Scroller>
  </div>
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

<style lang="scss">
  .sidebar-container {
    @apply flex;

    width: $sidebar-width;

    @media screen and (max-width: 768px) {
      position: absolute;
      top: $header-height;
      left: 0;
      bottom: 0;

      &.closed {
        transform: translateX(-$sidebar-width);
      }
    }
  }

  main {
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .popup-bg {
    @apply fixed right-0 bottom-0 left-0;
    top: $header-height;

    @media screen and (max-width: 768px) {
      @apply bg-black opacity-50;
    }

    transition: all 0.2s ease-in-out;
  }
</style>
