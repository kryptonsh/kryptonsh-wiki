<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function toggleSidebar() {
    dispatch('sidebar');
  }
</script>

<nav class="flex flex-row gap-8 bg-foreground">
  <div class="mr-[-32px] w-0">
    <i class="sidebar-toggle" on:click={toggleSidebar}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
        />
      </svg>
    </i>
  </div>
  <div class="flex-grow" />
  <a class="font-mono" href="https://krypton.sh/">Home</a>
  <a class="font-mono" href="https://krypton.sh/search/">Search</a>
  <a class="font-mono" href="/">Wiki</a>
  <a class="font-mono" href="https://discord.gg/rkj9TSn7Vz">Discord</a>
  <div class="flex-grow" />
</nav>

<style lang="scss">
  a {
    @apply text-[#a9a9a9] hover:text-white;
    line-height: 2.5rem;
    text-align: center;
  }

  .sidebar-toggle {
    @apply relative flex fill-[#a9a9a9] hover:cursor-pointer hover:fill-white md:hidden;

    width: $header-height;
    height: $header-height;

    & svg {
      @apply m-auto;

      width: 1.25rem;
      height: 1.25rem;
    }
  }
</style>
