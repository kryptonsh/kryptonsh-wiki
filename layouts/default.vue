<script setup lang="ts">
import type { NodeTreeNode } from '~~/composables/useNodeTree';

const route = useRoute();
const activeNode = useActiveNode();
const nodeTree = useNodeTree();
const sidebarOpen = useSidebarOpen();

const { data: navigation } = await useAsyncData('navigation', () => {
  return fetchContentNavigation();
});

nodeTree.value = navigation.value as NodeTreeNode[];

activeNode.value = (await queryContent(route.path)
  .only(['_path', 'title', 'navTitle'])
  .findOne()) as unknown as NodeTreeNode;
</script>

<template>
  <div class="flex flex-col">
    <Html lang="en" />
    <Meta property="og:image" content="/cover.jpg" />
    <Meta name="twitter:card" content="summary_large_image" />
    <UwuBar />

    <main
      class="lg:max-w-8xl min-h-page relative mx-auto flex max-w-full flex-col-reverse px-4 pb-4 sm:px-6 sm:pb-6 lg:grid lg:grid-cols-12 lg:gap-8"
    >
      <!-- <Sidebar /> -->
      <Navvy class="hidden lg:sticky" />

      <section class="relative flex flex-1 flex-col pt-12 lg:col-span-8 lg:mt-0 lg:pt-8">
        <slot></slot>
        <footer>
          <span>foober</span>
        </footer>
      </section>
      <TableOfContents />
    </main>
    <Teleport to="body">
      <div id="mobile-nav-scrim" :class="sidebarOpen ? 'opacity-100' : 'opacity-0'"></div>
      <div id="mobile-nav-surface" :class="sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'">
        <div class="flex flex-row justify-end p-2">
          <button class="icon" @click="sidebarOpen = !sidebarOpen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              role="img"
              class="mx-auto h-6 w-6"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="z-40 mb-2 max-h-full overflow-y-auto px-0 pt-4">
          <Navvy />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style lang="postcss">
#mobile-nav-scrim {
  @apply z-15 pointer-events-none fixed left-0 top-0 h-full w-full bg-opacity-50 backdrop-blur backdrop-filter transition dark:bg-opacity-50 lg:hidden;
}

#mobile-nav-surface {
  @apply <sm:(left-4) right-4 top-4 w-auto sm:min-w-[320px] lg:hidden;
  @apply bg-bglight-50 dark:bg-bgdark-50 border-light-200 dark:border-dark-200 fixed z-20 origin-top-right overflow-hidden rounded-2xl border shadow-xl transition-transform ease-out;
}
</style>
