<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="my-auto flex h-full flex-col items-center justify-center p-2 md:p-10">
  <img
    src="https://http.cat/{page.status}"
    alt="{page.status} {page.error.message}"
    class="shadow-primary-content size-fit rounded-xl shadow-lg"
  />
</div>
