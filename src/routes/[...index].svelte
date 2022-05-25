<script context="module" lang="ts">
  import { activeNode, getLastCommitUrl } from '$lib/utils';
  import { createRouter, Router } from '@roxi/routify';
  import dayjs from 'dayjs';
  import relative from 'dayjs/plugin/relativeTime';
  import routes from '../../.routify/routes.default';
  import Navbar from '../components/Navbar.svelte';
  import Scroller from '../components/Scroller.svelte';
  import Sidebar from '../components/Sidebar.svelte';

  dayjs.extend(relative);

  type BasedNodeRuntime = {
    file: {
      path: string;
      dir: string;
      base: string;
      ext: string;
      name: string;
    };
  } & RNodeRuntime;

  export async function load() {
    const router = createRouter({ routes });

    return {
      props: {
        router,
      },
    };
  }
</script>

<script lang="ts">
  export let router;

  const rootNode = router.rootNode;

  router &&
    router.activeRoute.subscribe((activeRoute) => {
      if (activeRoute) {
        $activeNode = activeRoute.allFragments[activeRoute.allFragments.length - 1].node as BasedNodeRuntime;
        const path = $activeNode.file.path.startsWith('/') ? $activeNode.file.path.substring(1) : $activeNode.file.path;

        updateLastCommit(path);
      } else {
        $activeNode = null;
      }
    });

  let sidebar = false;

  function toggleSidebar() {
    sidebar = !sidebar;
  }

  let lastCommit = null as {
    author: string;
    time: Date;
    url: string;
    authorUrl: string;
  };

  async function updateLastCommit(path: string) {
    const url = getLastCommitUrl(path);
    // @ts-expect-error this fetch is fucking stupid and thinks it cant accept URL
    const response = await fetch(getLastCommitUrl(path));

    if (response.status !== 200) {
      return;
    }

    const commits = await response.json();

    lastCommit = {
      author: commits[0].author.login,
      time: new Date(commits[0].commit.committer.date),
      url: commits[0].html_url,
      authorUrl: commits[0].author.html_url,
    };
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
      <footer>
        <div />
        <div>
          {#if lastCommit && lastCommit.time}
            <span class="text-secondary">
              Updated
              <a class="text-blue-400 hover:text-blue-500" href={lastCommit.url}>
                <time datetime={lastCommit.time.toString()}>
                  {dayjs(lastCommit.time).fromNow()}
                </time>
              </a>
              by
              <a href="{lastCommit.authorUrl}">
                <code class="font-light text-blue-400 hover:text-blue-500">{lastCommit.author}</code>
              </a>
            </span>
          {:else}
            Unknown commit
          {/if}
        </div>
      </footer>
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
