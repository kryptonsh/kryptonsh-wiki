<script lang="ts">
  import '../app.scss';

  import { activeNode, getFriendlyNodeName, kebabToSentenceCase } from '$lib/utils';

  let nodeName = '';
  $: {
    nodeName = $activeNode
      ? kebabToSentenceCase(getFriendlyNodeName($activeNode))
      : '';
  }
</script>

<svelte:head>
  <title>krypton.sh - Wiki{$activeNode ? ` - ${nodeName}` : ''}</title>
  <meta content="en_US" name="locale" />
  <meta content="#1a1c1d" name="theme-color" />
  <meta content="Wiki" name="description" />
  <meta content="Wiki" property="og:description" />
  <meta content="Wiki" name="twitter:description" />

  <meta content="wiki.krypton.sh" property="og:title" />
  <meta content="wiki.krypton.sh" name="twitter:title" />
  <meta content="wiki.krypton.sh" property="og:site_name" />

  <meta content="website" property="og:type" />
  <meta content="https://wiki.krypton.sh/" property="og:url" />
  <meta content="/favicon.png" property="og:image" />
  <meta content="/favicon.png" name="twitter:image" />
  <meta content="summary" name="twitter:card" />
  <meta content="@kryptonsh" name="twitter:creator" />
  <meta content="@kryptonsh" name="twitter:site" />
</svelte:head>

<slot />
