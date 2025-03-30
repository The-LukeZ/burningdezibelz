<script lang="ts">
  let { text = "" } = $props();
</script>

<div class="mt-[15px] justify-center self-center md:mt-[30px]">
  <article class="prose w-full">
    <h1 style="color: oklch(var(--bc)" class="text-2xl md:text-4xl">{text}</h1>
  </article>
</div>

<div class="dy-divider mt-1 md:mt-[1rem]"></div>
