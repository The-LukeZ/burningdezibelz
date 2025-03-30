<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import XButton from "./XButton.svelte";

  let currentPath = page.url.pathname;

  let isOpen = $state(false);
  let isHidden = $state(false);
  let newScrollPos = $state(0);
  let oldScrollPos = $state(0);

  let { /** @type {boolean} */ withLogoutButton = false } = $props();

  function toggleNavbar() {
    setTimeout(() => {
      isOpen = !isOpen;
    }, 150);
  }

  $effect(() => {
    if (isOpen) {
      /** @type {any} */
      let mobile_navbar = document.getElementById("mobile_navbar");
      mobile_navbar?.showModal();
    }
  });

  function logout() {
    console.log("Logging out");
    goto("/dash/login?logout=true");
  }

  onMount(() => {
    window.addEventListener("scroll", () => {
      if (newScrollPos < oldScrollPos && isHidden) {
        document.querySelector("header")?.classList.remove("translate-y-[-105%]");
        isHidden = false;
      } else if (newScrollPos > 0 && newScrollPos > oldScrollPos && !isHidden) {
        document.querySelector("header")?.classList.add("translate-y-[-105%]");
        isHidden = true;
      }
      oldScrollPos = newScrollPos;
    });
  });
</script>

<svelte:window bind:scrollY={newScrollPos} />

{#snippet mobileNavbarItem(/** @type {string} */ displayText, /** @type {string} */ href)}
  <a href="/{href}" class="block w-[60%] transform justify-center text-lg font-semibold md:w-[75%]">
    <button class="dy-btn w-full {currentPath === `/${href}` ? 'dy-btn-primary' : 'dy-btn-outline'}">{displayText}</button>
  </a>
{/snippet}

{#snippet dekptopNavbarItem(/** @type {string} */ displayText, /** @type {string} */ href)}
  <a href="/{href}" class="transform text-lg font-semibold text-white {currentPath === `/${href}` ? 'un-force' : 'un'} "
    >{displayText}</a
  >
{/snippet}

{#snippet lougoutButton(mobile = false)}
  <!-- svelte-ignore a11y_consider_explicit_label -->
  <button class="dy-btn dy-btn-outline dy-btn-error {mobile ? 'w-[60%] md:w-[75%]' : ''}" onclick={logout}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="mx-auto block size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      />
    </svg>
  </button>
{/snippet}

<header class="sticky top-0 right-0 left-0 z-1000 shadow-xl backdrop-blur-2xl transition-transform duration-300 ease-in-out">
  <div class="mx-auto flex w-full max-w-[1400px] items-center justify-between p-4">
    <a href="/">
      <h1 class="dy-btn dy-btn-ghost text-xl font-bold md:text-2xl">Burning Dezibelz</h1>
    </a>

    <!-- Sidebar -->
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
      class="dy-btn visible md:hidden"
      onclick={() => {
        toggleNavbar();
        /** @type {any} */
        const mobile_navbar = document.getElementById("mobile_navbar");
        mobile_navbar?.showModal();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mx-auto my-auto block size-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    </button>

    <nav class="hidden items-center gap-4 md:visible md:flex lg:gap-6">
      {@render dekptopNavbarItem("Konzerte", "konzerte")}
      {@render dekptopNavbarItem("Über uns", "about")}
      {@render dekptopNavbarItem("Kontakt", "kontakt")}
      {#if withLogoutButton}
        {@render lougoutButton()}
      {/if}
    </nav>
  </div>
</header>

{#if isOpen}
  <dialog id="mobile_navbar" class="dy-modal">
    <div class="dy-modal-box">
      <form method="dialog" onsubmit={toggleNavbar}>
        <div class="absolute top-4 right-4">
          <XButton stroke="white" />
        </div>
      </form>

      <!-- Items -->
      <nav class="flex flex-col items-center gap-4">
        {@render mobileNavbarItem("Konzerte", "konzerte")}
        {@render mobileNavbarItem("Über uns", "about")}
        {@render mobileNavbarItem("Kontakt", "kontakt")}
        {#if withLogoutButton}
          {@render lougoutButton(true)}
        {/if}
      </nav>
    </div>
    <form method="dialog" class="dy-modal-backdrop" onsubmit={toggleNavbar}>
      <button>close</button>
    </form>
  </dialog>
{/if}
