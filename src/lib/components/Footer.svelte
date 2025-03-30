<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="relative right-0 bottom-0 left-0 mt-auto min-h-5"></div>

<div class="bg-base-content h-[2px] w-full border-spacing-2 opacity-50"></div>

{#snippet footerLink(/** @type {string} */ href, /** @type {string} */ displayText, /** @type {string} */ target = "_self")}
  <a {href} {target} class="dy-link-hover dy-link">{displayText}</a>
{/snippet}

<footer
  class="dy-footer dy-footer-center text-base-content relative right-0 bottom-0 left-0 justify-items-center bg-transparent p-10 pt-15 pb-5"
>
  <nav class="grid grid-flow-col gap-4">
    {@render footerLink("/impressum", "Impressum")}
    {@render footerLink("/setlist", "Setlist")}
    {@render footerLink("https://github.com/The-LukeZ/burningdezibelz", "GitHub", "_blank")}
  </nav>
  <aside>
    <p id="copyright">
      Copyright © <span id="year">{page.data.date?.getUTCFullYear()}</span> - Alle Rechte vorbehalten
    </p>
  </aside>
  <nav class="grid grid-flow-col gap-4">
    <a class="dy-link-hover dy-link text-xs" href="/dash/login">Intern</a>
  </nav>
</footer>
