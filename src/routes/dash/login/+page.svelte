<script lang="ts">
  import { enhance } from "$app/forms";
  import Navbar from "$lib/components/Navbar.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import { onMount } from "svelte";

  let loggingIn = $state(false);

  onMount(() => {
    const usernameInput = document?.getElementById("username");
    if (usernameInput) {
      usernameInput.focus({ preventScroll: true });
    }
  });
</script>

<Navbar />

<SiteHeader text="Login" />

<div class="m-auto mt-5 w-4/5 lg:w-1/4">
  <form use:enhance method="post" action="?/login" onsubmit={() => (loggingIn = true)}>
    <div class="flex w-full flex-col">
      <input
        type="text"
        name="username"
        placeholder="Username"
        id="username"
        class="rounded-md border border-gray-300 p-2 text-black"
        required
      />
    </div>
    <div class="mt-5 flex flex-col">
      <input
        type="password"
        name="password"
        placeholder="Password"
        id="password"
        class="rounded-md border border-gray-300 p-2 text-black"
        required
      />
    </div>
    <div class="mt-5 flex flex-col {loggingIn ? 'cursor-default' : 'cursor-pointer'}">
      {#if loggingIn}
        <button type="submit" class="dy-btn dy-btn-outline" disabled={loggingIn}
          ><span class="dy-loading dy-loading-spinner"></span> Bitte warten...
        </button>
      {:else}
        <button type="submit" class="dy-btn dy-btn-outline" disabled={loggingIn}>Anmelden</button>
      {/if}
    </div>
  </form>
</div>
