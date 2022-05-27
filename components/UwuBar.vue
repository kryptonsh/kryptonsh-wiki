<script setup lang="ts">
const sidebarOpen = useSidebarOpen();
</script>

<template>
  <header class="surface-blurry h-header sticky top-0 z-10 w-full">
    <div class="lg:max-w-8xl mx-auto flex h-full max-w-full px-3 lg:grid lg:grid-cols-12 lg:gap-8">
      <div class="transition-base text-secondary-hover flex flex-none items-center lg:col-span-2 lg:flex-none">
        <a href="/">
          <span class="font-mono">krypton</span>
        </a>
      </div>
      <div class="flex flex-1 items-center lg:col-span-8">
        <nav
          class="flex hidden max-w-full flex-1 items-center justify-center gap-8 overflow-hidden truncate py-1 font-medium sm:flex"
        >
          <a href="https://krypton.sh">Home</a>
          <a href="https://krypton.sh/search">Search</a>
          <a href="/">Wiki</a>
          <a href="https://discord.gg/rkj9TSn7Vz">Discord</a>
        </nav>
      </div>
      <div class="flex flex-none items-center justify-end lg:col-span-2 gap-2 lg:pl-4">
        <ColorModeSwitch />
        <button class="icon relative z-10 h-8 w-8 rounded-xl lg:hidden" @click="sidebarOpen = !sidebarOpen">
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
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="postcss">
a {
  @apply text-light-200 hover:text-light-600 dark:(text-dark-600 hover:text-dark-200) font-mono transition-colors;
}
</style>
