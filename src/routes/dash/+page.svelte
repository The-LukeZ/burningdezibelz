<script lang="ts">
  import { goto } from "$app/navigation";
  import Navbar from "$lib/components/Navbar.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import { fetchConcerts } from "$lib/utils/concerts.js";
  import dayjs from "dayjs";
  import { onMount } from "svelte";

  let { data } = $props();
  let displayModal = $state(false);

  let loggedIn = $state(data?.loggedIn ?? false);

  let concerts = $state([]);

  onMount(async () => {
    console.log("data", data);

    if (!loggedIn) {
      console.log("Not logged in; Redirecting to login");
      return goto("/dash/login");
    }

    concerts = await fetchConcerts();
    console.log("concerts", concerts);
  });

  /**
   * @param {string} id
   */
  function copyConcertId(id) {
    navigator.clipboard.writeText(id);
    const tooltip = document.getElementById(`copied-${id}`);
    tooltip.classList.add("dy-tooltip");
    setTimeout(() => {
      tooltip.classList.remove("dy-tooltip");
    }, 1700);
  }
</script>

<Navbar withLogoutButton={loggedIn} />

<SiteHeader text="Dashboard" />

<main class="flex w-full flex-col items-center justify-center">
  <div class="mx-auto mb-5 flex w-full items-center justify-center gap-3 lg:mb-0 lg:justify-start lg:px-5">
    <a
      role="button"
      class="dy-btn dy-btn-success dy-btn-sm dy-btn-wide lg:dy-btn-md"
      href="/dash/new_concert"
      target="_self"
      rel="noreferer"
    >
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
      <span class="text-xl">Add</span>
    </a>
  </div>

  {#snippet concertRow(/** @type {DBModels.Concert} */ concert)}
    <tr class="dy-hover content-center items-center">
      <td class="hidden w-10 text-center lg:table-cell">
        <div class="dy-tooltip-open dy-tooltip-success" data-tip="✅ Copied" id="copied-{concert._id}">
          <button class="dy-btn dy-btn-ghost no-animation dy-btn-sm m-2" onclick={() => copyConcertId(concert._id)}
            >{concert._id}</button
          >
        </div>
      </td>
      <td class="dy-link text-primary md:dy-link-hover text-center text-sm font-bold md:text-lg">
        {#if concert.link}
          <a href={concert.link} class="dy-link-hover dy-link" target="_blank">{concert.name}</a>
        {:else}
          {concert.name}
        {/if}
      </td>
      <td class="text-center">{dayjs(concert.date).toDate().toLocaleString("de", { dateStyle: "full" })}</td>
      <td class="items-center justify-center text-center">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <div class="p-2">
          <button
            class="dy-btn dy-btn-md"
            onclick={() => {
              displayModal = true;
              /** @type {any} */
              (document.getElementById("choice_modal")).showModal();
            }}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mx-auto my-1 size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  {/snippet}

  {#await concerts}
    <span class="dy-loading dy-loading-spinner dy-loading-lg"></span>
  {:then concerts}
    <div class="w-full overflow-x-auto lg:p-5">
      <table class="table-zebra border-base-300 table w-full table-auto overflow-x-auto border shadow-md">
        <thead class="border-primary h-fit border-b p-5">
          <tr>
            <th class="hidden lg:table-cell">ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          {#each concerts as concert}
            {@render concertRow(concert)}
          {/each}
        </tbody>
      </table>
    </div>
  {/await}
</main>

{#if displayModal}
  <dialog id="choice_modal" class="dy-modal dy-modal-bottom sm:dy-modal-middle">
    <div class="dy-modal-box">
      <form method="dialog">
        <button class="dy-btn dy-btn-square absolute top-4 right-4">
          <img src="/cross.svg" alt="X" class="dy-btn dy-btn-md" />
        </button>
      </form>
      <h3 class="mb-5 text-center text-lg font-bold">Select Action</h3>
      <div class="dy-btn-wide mx-auto flex flex-col items-center justify-center space-y-2">
        <button class="dy-btn dy-btn-info w-full">Edit</button>
        <button class="dy-btn dy-btn-warning w-full">Cancel</button>
        <button class="dy-btn dy-btn-error w-full">Delete</button>
      </div>
    </div>
    <form method="dialog" class="dy-modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
{/if}
