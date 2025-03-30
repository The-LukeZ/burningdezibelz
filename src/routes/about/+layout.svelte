<script lang="ts">
  import EmbedInfo from "$lib/components/EmbedInfo.svelte";

  /** @type {{ children: import('svelte').Snippet }} */
  let { children } = $props();
</script>

<EmbedInfo siteName="Über uns" optionalDescription="Bandinfo der Burning Dezibelz" robots="index, follow" />

{@render children()}
