<script lang="ts">
  import EmbedInfo from "$lib/components/EmbedInfo.svelte";

  /** @type {{ children: import('svelte').Snippet }} */
  let { children } = $props();
</script>

<EmbedInfo siteName="Impressum" optionalDescription="Impressum der Burning Dezibelz" />

{@render children()}
