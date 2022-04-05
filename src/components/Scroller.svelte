<script lang="ts">
  import OverlayScrollbars from 'overlayscrollbars';

  let el: HTMLElement;

  OverlayScrollbars(el, {
    className: 'wicked-scrollbars',
  });
</script>

<div class="min-h-fit overflow-auto" bind:this={el}>
  <slot />
</div>
