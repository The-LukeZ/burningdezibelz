<script lang="ts">
  import { enhance } from "$app/forms";
  import Navbar from "$lib/components/Navbar.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import { stringifyLocation } from "$lib/utils/location";
  import ky from "ky";
  import { onMount } from "svelte";

  let inputValue = $state("");

  /** @type {DBModels.Location[]} */
  let locations = $state([]);
  let filteredLocations = $derived(
    locations.filter((loc) => stringifyLocation(loc).toLowerCase().includes(inputValue.toLowerCase())),
  );

  onMount(async () => {
    /** @type {DBModels.Location[]} */
    const res = await ky
      .get("/api/locations", {
        credentials: "include",
        retry: { limit: 3 },
      })
      .json();
    locations = res;
  });

  function handleItemClick(item) {
    inputValue = item;
  }

  const today = new Date();
</script>

<Navbar withLogoutButton={true} />

<SiteHeader text="New Concert" />

<main class="mx-auto w-full items-center">
  <div class="mx-auto max-w-[700px] px-2 md:px-4">
    <form class="space-y-3" use:enhance onSubmit={(e) => e.preventDefault()} method="post" action="?/create">
      <!-- Location Name -->
      <div class="form-container-col">
        <label for="concert-name" class="dy-label">Concert / Location Name</label>
        <input id="concert-name" type="text" class="dy-input dy-input-bordered dy-input-primary w-full" required />
      </div>
      <div class="form-container-row">
        <!-- Date -->
        <div class="form-container-col w-full max-w-xs">
          <label for="concert-date" class="dy-label">Concert Date</label>
          <input
            id="concert-date"
            type="date"
            class="dy-input dy-input-bordered dy-input-primary"
            min={today.toISOString().split("T")[0]}
            required
          />
        </div>
        <!-- Time -->
        <div class="form-container-col w-full">
          <label for="concert-time" class="dy-label">Concert Time</label>
          <input id="concert-time" type="time" class="dy-input dy-input-bordered dy-input-primary" step="300" required />
        </div>
      </div>
      <!-- Location Link -->
      <div class="form-container-col">
        <label for="location-link" class="dy-label">Location Link</label>
        <input
          id="location-link"
          type="url"
          class="dy-input dy-input-bordered dy-input-primary w-full"
          placeholder="https://..."
        />
      </div>
      <!-- Location 2 -->
      <div class="form-container-col">
        <label for="location" class="dy-label">Location / Address</label>
        <input
          id="location"
          type="text"
          class="dy-input dy-input-bordered dy-input-primary w-full"
          required
          bind:value={inputValue}
        />
        {#if filteredLocations.length > 0 && inputValue.trim()}
          <ul class="absolute z-10 mt-1 w-full border bg-white">
            {#each filteredLocations as loc}
              <li class="cursor-pointer px-4 py-2 hover:bg-gray-100">
                <button class="" onclick={() => (inputValue = stringifyLocation(loc))}>
                  {stringifyLocation(loc)}
                </button>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
      <!-- Submit -->
      <div class="form-container-row">
        <button class="dy-btn dy-btn-success dy-btn-md w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span class="text-lg">Create Concert</span>
        </button>
      </div>
    </form>
  </div>
</main>

<style>
  .form-container-row {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: stretch;
  }

  .form-container-col {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  label {
    font-weight: bolder;
  }
</style>
