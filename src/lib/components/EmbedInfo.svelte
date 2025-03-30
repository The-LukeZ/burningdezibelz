<script lang="ts">
  import { page } from "$app/state";
  import { PUBLIC_BASE_URL } from "$env/static/public";

  /**
   * @typedef {Object} EmbedInfoProps
   * @property {string?} [siteName] - `"Burning Dezibelz" + (siteName ? "| {siteName}" : "")`
   * @property {string?} [optionalDescription] - Default: "Die offizielle Website der Band Burning Dezibelz"
   * @property {string?} [robots] - The robots meta tag value | Default: "index"
   */

  /** @type {EmbedInfoProps} */
  const { siteName = undefined, optionalDescription = undefined, robots = "index" } = $props();

  const data = {
    title: "Burning Dezibelz" + (siteName ? ` | ${siteName}` : ""),
    description: optionalDescription ?? "Die offizielle Website der Band Burning Dezibelz",
    bigImageUrl: PUBLIC_BASE_URL + "/burningdezibelz_logo.png",
    url: PUBLIC_BASE_URL,
    keywords: ["Rock", "Metal", "Zwickau", "Band", "Musik"],
  };
</script>

<svelte:head>
  <!-- Open Graph protocol tags -->
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={data.title} />
  <meta property="og:description" content={data.description} />
  <meta property="og:image" content={data.bigImageUrl} />
  <meta property="og:url" content={page.url.toString()} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="de_DE" />

  <!-- Twitter Card tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.title} />
  <meta name="twitter:description" content={data.description} />
  <meta name="twitter:image" content={data.bigImageUrl} />

  <!-- Other relevant meta tags -->
  <title>{data.title}</title>
  <meta name="description" content={`${data.title} - ${data.description}`} />
  <meta name="keywords" content={data.keywords.join(",")} />
  <meta name="robots" content={robots} />
</svelte:head>
