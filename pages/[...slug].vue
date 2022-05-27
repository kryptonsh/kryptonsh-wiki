<script setup lang="ts">
import 'assets/css/md.css';
</script>

<template>
  <div class="md relative min-w-0">
    <ContentDoc>
      <template #not-found>
        <h1 class="text-2xl">Page not found</h1>
      </template>
    </ContentDoc>
  </div>
</template>
