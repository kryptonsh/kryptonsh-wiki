<script setup lang="ts">
type Child = {
  _id: string;
  title: string;
  _path: string;
  children: Child[];
};

type NavNode = {
  title: string;
  _path: string;
  children: Child[];
};

const { data: navigation } = await useAsyncData('navigation', () => {
  return fetchContentNavigation();
});

const navTree = ref([] as NavNode[]);

const route = useRoute();

function isActive(node: NavNode) {
  console.log(node, route.path);

  return node._path === route.path;
}

watch(
  navigation,
  () => {
    navTree.value = (navigation.value as unknown as NavNode[])?.filter((x) => x._path !== '/') || [];
  },
  { immediate: true },
);
</script>

<template>
  <aside
    class="lg:top-header hidden overflow-y-auto overflow-x-hidden pb-8 lg:sticky lg:col-span-2 lg:-mt-8 lg:block lg:self-start lg:pb-0 lg:pt-8"
  >
    <nav>
      <ul>
        <li
          v-for="dir in navTree"
          :key="dir._path"
          class="border-primary-400 dark:border-primary-600 transition-colors"
        >
          <div class="flex items-center justify-between pt-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
            <span class="inline-flex items-center">
              <h5>{{ dir.title }}</h5>
            </span>
          </div>
          <ul class="py-2">
            <li
              v-for="child in dir.children"
              :key="child._path"
              :class="isActive(child) ? 'sidebar-item-active' : 'sidebar-item'"
            >
              <NuxtLink :to="child._path">
                <span class="inline-flex items-center">
                  <span>
                    {{ child.title }}
                  </span>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style lang="postcss">
.sidebar-item {
  @apply dark:(border-gray-700  hover:border-gray-500) ml-2 border-l border-gray-100 transition-colors hover:border-gray-300;
}

.sidebar-item a {
  @apply flex items-center justify-between pt-2 text-sm font-semibold text-gray-900 dark:text-gray-200;
}

.sidebar-item-active {
  @apply border-wicked-400 dark:border-wicked-600 ml-2 border-l transition-colors;
}

.sidebar-item-active a {
  @apply text-wicked flex items-center justify-between py-1.5 pl-4 text-sm font-medium;
}
</style>
