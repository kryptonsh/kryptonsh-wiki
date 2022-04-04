<script lang="ts">
  export let nested: number = 0;

  const lineOnLevel0 = false;
  let indent = 0;

  $: {
    indent = lineOnLevel0 ? nested + 1 : nested;
  }
</script>

<div style="width: {indent}rem" class="my-[-4px] flex flex-row">
  {#each Array(indent) as _}
    <div class="h-full w-[1rem] border-l-2 border-l-muted" />
  {/each}
</div>
