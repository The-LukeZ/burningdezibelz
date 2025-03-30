<script lang="ts">
  import EmbedInfo from "$lib/components/EmbedInfo.svelte";

  /** @type {{ children: import('svelte').Snippet }} */
  let { children } = $props();
</script>

<EmbedInfo siteName="Setlist" optionalDescription="Setlist der Burning Dezibelz" robots="index, follow" />

{@render children()}
