<template>
  <Suspense>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Suspense>
</template>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&family=Roboto:wght@100;300;400;500;700;900&family=Ubuntu:wght@300;400;500;700&display=swap');

body {
  @apply bg-bglight-50 text-light-100 dark:(bg-bgdark-50 text-dark-200);
}

:root {
  --header-height: 48px;
  --full-header: calc(100vh - var(--header-height));
  --page-height: calc(100vh - var(--header-height));
}

.grid-leyout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 12px;
}

.icon {
  @apply text-light-200 hover:text-light-600 dark:(text-dark-600 hover:text-dark-200) transition-colors;
}

@media (min-width: 1024px) {
  .grid-leyout {
    grid-template-columns: 250px 1fr 250px;
  }
}

.surface-blurry {
  @apply bg-bglight-50 bg-opacity-90 backdrop-blur-sm backdrop-filter;
}

.dark .surface-blurry {
  @apply bg-bgdark-50 bg-opacity-90 backdrop-blur-sm backdrop-filter;
}
</style>
