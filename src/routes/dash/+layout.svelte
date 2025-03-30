<script lang="ts">
  import EmbedInfo from "$lib/components/EmbedInfo.svelte";

  let { children } = $props();
</script>

<EmbedInfo siteName="Dashboard" optionalDescription="Dashboard" robots="noindex, nofollow" />

{@render children()}
