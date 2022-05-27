<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core';
import type { Ref } from 'vue';

const route = useRoute();

type TocItem = {
  id: string;
  text: string;
  depth: number;
};

type ContentToc = {
  body: {
    toc: {
      links: TocItem[];
    };
  };
};

const content = ref(null);
const tableOfContents = ref(null as TocItem[] | null);
const refs = ref({} as { [key: string]: Partial<{ el: HTMLElement; visible: Ref<boolean> }> });
const gatherRefs = ref(false);

watch(route, findTableOfContents, { immediate: true });

async function findTableOfContents() {
  content.value = queryContent(route.path);

  if (content.value) {
    const toc: ContentToc = await content.value.only(['body']).findOne();

    if (toc?.body?.toc?.links?.length > 0) {
      tableOfContents.value = toc.body.toc.links;

      gatherRefs.value = true;
    } else {
      tableOfContents.value = null;
    }
  }
}

onMounted(() => {
  watch(
    gatherRefs,
    () => {
      if (gatherRefs.value) {
        refs.value = {};

        tableOfContents.value.forEach((item) => {
          refs.value[item.id] = {
            el: document.getElementById(item.id),
          };
        });
      }
    },
    { immediate: true },
  );
});

watch(refs, watchVisibility);

function watchVisibility() {
  Object.keys(refs.value).forEach((id) => {
    refs.value[id].visible = useElementVisibility(refs.value[id].el);
  });
}

const open = ref(false);
</script>

<template>
  <div class="toc" :class="open || 'closed'">
    <div v-if="tableOfContents" class="w-full cursor-pointer">
      <button class="flex items-center gap-1 py-3 lg:hidden" @click="open = !open">
        <span class="text-xs font-semibold">Table of Contents</span>
        <svg
          class="h-4 w-4 transform transition-transform duration-100"
          :class="{ 'rotate-90': open }"
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
            d="m9 5l7 7l-7 7"
          ></path>
        </svg>
      </button>
      <div class="mb-4 flex hidden flex-col space-y-1 sm:space-y-2 lg:mt-0 lg:block">
        <div class="hidden items-center overflow-hidden font-semibold lg:flex">
          <span>Table Of Contents</span>
        </div>
      </div>
      <ul class="pl-3">
        <li
          v-for="item in tableOfContents"
          :key="item.id"
          :class="refs[item.id].visible ? 'toc-item-active' : 'toc-item'"
        >
          <a :href="`#${item.id}`">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="postcss">
.toc {
  @apply top-$header-height lg:max-h-$page-height relative sticky -mx-4 -mt-8 flex items-center px-3 sm:-mx-6 lg:col-span-2 lg:mx-0 lg:self-start lg:bg-transparent lg:px-0 lg:pt-8;
  @apply bg-bglight-50 dark:bg-bgdark-50 !bg-opacity-80 backdrop-blur-md backdrop-filter;
}

.toc.closed {
  @apply lg:block;
}

.toc.closed > div > ul {
  @apply hidden lg:block;
}

.toc-item {
  @apply min-w-0 border-gray-200 transition-colors hover:border-gray-300 dark:border-gray-700 hover:dark:border-gray-600;
}

.toc-item > a {
  @apply text-light-200 font-normal hover:text-light-50 dark:(text-dark-400 hover:text-dark-50) block truncate py-1 text-sm lg:pr-3;
}

.toc-item-active {
  @apply min-w-0 transition-colors;
}

.toc-item-active > a {
  @apply text-light-50 dark:text-dark-100 block truncate py-1 text-sm font-medium lg:pr-3;
}
</style>
