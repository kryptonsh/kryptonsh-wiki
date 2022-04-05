<script context="module" lang="ts">
  import type { ErrorLoad } from '@sveltejs/kit';

  export const load: ErrorLoad = ({ error, status }) => {
    console.error({ error, status });
    if (error.message.includes('could not find route')) {
      return {
        props: {
          status: 404,
          error: {
            message: error.message.split('could not find route: /')[1],
          },
        },
      };
    }

    return {
      props: {
        error,
        status,
      },
    };
  };
</script>

<script lang="ts">
  export let error: Error;
  export let status: number;
</script>

<div class="flex h-full flex-col justify-center text-center align-middle">
  <h1 class="py-16 font-mono text-9xl">{status}</h1>
  {#if status === 404}
    <h2 class="font-mono text-5xl">Page <code class="rounded-lg bg-elevated px-4">{error.message}</code> not found</h2>
  {:else}
    <h2 class="font-mono text-5xl">{error.message}</h2>
  {/if}
</div>
