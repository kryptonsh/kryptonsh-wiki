<script setup lang="ts">
const theme = useColorMode();

function onClick() {
  return theme.value === 'light' ? (theme.preference = 'dark') : (theme.preference = 'light');
}
</script>

<template>
  <button aria-label="Color Mode" class="flex" @click="onClick">
    <ColorScheme placeholder="...">
      <Icon v-if="theme.value === 'dark'" class="icon" name="heroicons-outline:moon" />
      <Icon v-else class="icon" name="heroicons-outline:sun" />
    </ColorScheme>
  </button>
</template>
