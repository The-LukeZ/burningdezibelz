<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { slide } from "svelte/transition";
  import XButton from "$lib/components/XButton.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import ExternalLinkIcon from "$lib/components/ExternalLinkIcon.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import dayjs from "dayjs";
  import ky from "ky";
  import { prettyURL } from "$lib/utils/utilityFuncs.js";

  /**
   * @type {"new" | "old"}
   */
  let activeTab = $state("new");

  let { data } = $props();
  let concerts = $state(data.concerts);
  let stillLoading = $derived(concerts == null);
  let innerWidth = $state(0);
  let _error = $state(null);

  let concertId = $state(page.url.hash?.slice(1) ?? null);
  /**
   * @type {DBModels.Concert | null}
   */
  let concertData = $state(null);

  $effect(() => {
    console.log("Concert ID changed", $state.snapshot(concertId));
    if (!concertId) return null;

    let concert = concerts.find((c) => c._id === concertId);

    if (!concert && concerts) {
      console.log("Concert not found in current page, fetching from server...");
      ky.get(`/api/concerts/${concertId}`)
        .json()
        .then((res) => {
          concertData = res.concert;
        })
        .catch((err) => {
          console.error(err);
          concertData = null;
        });
      return;
    }

    concertData = concert ?? null;

    if (concertId) {
      /** @type {HTMLDialogElement | any} */
      const concert_modal = document.getElementById("concertModal");
      concert_modal.showModal();
    }
  });

  /**
   * @param {any} jsonPayload
   */
  async function fetchConcerts(jsonPayload = {}) {
    concerts = null;
    return ky
      .get("/api/concerts", {
        searchParams: jsonPayload,
      })
      .then(async (res) => {
        const _res = await res.json();
        concerts = _res;
      })
      .catch(async (err) => {
        _error = await err.response.json();
        console.error($state.snapshot(_error));
      });
  }

  $effect(() => {
    console.log("Concerts changed", $state.snapshot(concerts));
  });

  function closeModal() {
    concertId = null;
    return goto("");
  }

  /**
   * @param {{ key: string; }} event
   */
  function handleKeyDown(event) {
    if (event.key === "Escape" && concertId != null) {
      concertId = null;
      return goto("");
    }
  }
</script>

<svelte:window onkeydowncapture={handleKeyDown} bind:innerWidth />

<Navbar />

<div class="fixed left-0 right-0 top-0 z-[-1] min-h-screen bg-gradient-to-b from-black to-transparent"></div>

<SiteHeader text="Konzerte" />

{#snippet concertRow(/** @type {any} */ concert)}
  <tr class="dy-hover bg-base-200 p-2">
    <td class="concertTableCell w-[35%]">{dayjs(concert.date).toDate().toLocaleDateString("de", { dateStyle: "full" })}</td>
    <td class="concertTableCell w-[40%]">
      <div class="dy-tooltip-buttom dy-tooltip dy-tooltip-info" data-tip={prettyURL(concert.link)}>
        <a class="dy-link-hover dy-link text-lg font-bold text-primary md:dy-link-hover" href={concert.link} target="_blank">
          {concert.name}
        </a>
      </div>
    </td>
    <td class="concertTableCell w-[25%]"
      ><button
        aria-label="Checkbox"
        class="dy-btn dy-btn-outline dy-btn-block"
        onclick={() => {
          concertId = concert._id;
          return goto(`#${concert._id}`);
        }}>Mehr Infos</button
      ></td
    >
  </tr>
{/snippet}

<div id="concerts" class="flex w-full flex-col items-center text-center">
  <div role="tablist" class="dy-tabs dy-tabs-bordered mx-auto self-center pb-5 md:w-[50%]">
    <button
      disabled={stillLoading}
      role="tab"
      class={`dy-tab ${activeTab == "new" ? "dy-tab-active cursor-default" : ""}`.trimEnd()}
      onclick={async () => {
        if (activeTab == "new") return;
        activeTab = "new";
        await fetchConcerts();
      }}>Anstehend</button
    >
    <button
      disabled={stillLoading}
      role="tab"
      class={`dy-tab ${activeTab == "old" ? "dy-tab-active cursor-default" : ""}`.trimEnd()}
      onclick={async () => {
        if (activeTab == "old") return;
        activeTab = "old";
        await fetchConcerts({ before: dayjs().toISOString() });
      }}>Archiv</button
    >
  </div>
  {#if stillLoading}
    <span class="dy-loading dy-loading-spinner dy-loading-lg"></span>
  {:else if stillLoading && concerts.length === 0}
    <div role="alert" class="dy-alert dy-alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Keine Konzerte gefunden!</span>
    </div>
  {:else if !stillLoading && concerts.length > 0}
    <div class="w-full resize-x justify-center overflow-y-visible md:max-w-[1400px]">
      <table class="w-full table-auto text-center">
        <thead>
          <tr>
            <th class="w-[40%]">Datum & Zeit</th>
            <th class="w-[40%]">Ort</th>
            <th class="w-[20%]"></th>
          </tr>
        </thead>
        <tbody class="rounded-lg">
          <!-- The archived concerts should be in a reversed order but the array should not be mutated -->
          {#each activeTab == "new" ? concerts : new Array(...concerts).reverse() as concert}
            {@render concertRow(concert)}
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

{#snippet concertDetailRow(/** @type {string} */ key, /** @type {string | Array} */ value, align = "center")}
  <tr>
    <td style="font-weight: bold; text-align: {align}; font-size: larger;">{key}</td>
    {@html `<td style="text-align: ${align};">` +
      (value === null ? "X" : Array.isArray(value) ? value.join("<br />") : value) +
      "</td>"}
  </tr>
{/snippet}

<dialog id="concertModal" class="dy-modal dy-modal-bottom sm:dy-modal-middle" transition:slide>
  <div class="dy-modal-box w-full md:max-w-[50%]">
    <form method="dialog" class="flex justify-end" onsubmit={closeModal}><XButton /></form>

    <!-- Items -->
    <div class="flex flex-col items-center gap-4">
      <table class="dy-table dy-table-md border-collapse">
        <tbody>
          <tr>
            <td style="font-weight: bold; text-align: center; font-size: x-large;" class="py-4" colspan="2"
              >{concertData?.name}</td
            >
          </tr>
          {@render concertDetailRow("Datum", dayjs(concertData?.date).toDate().toLocaleDateString())}
          {@render concertDetailRow("Uhrzeit", dayjs(concertData?.date).toDate().toLocaleTimeString())}
          {@render concertDetailRow(
            "Ort",
            concertData?.location
              ? [
                  concertData?.location?.name,
                  concertData?.location?.address,
                  `${concertData?.location?.postalCode} ${concertData?.location?.city}`,
                ]
              : null,
          )}
          {#if concertData?.abendkasse || concertData?.tickets}
            <tr>
              <td style="font-weight: bold; text-align: center; font-size: larger;">Tickets</td>
              <td style="text-align: center;" class="flex flex-col space-y-2">
                <!-- TODO: Find solution for both and none -->
                {#if concertData?.abendkasse}
                  <span>An der Abendkasse</span>
                {/if}
                {#if concertData?.tickets}
                  <span class="dy-tooltip dy-tooltip-bottom dy-tooltip-info" data-tip={prettyURL(concertData.tickets)}>
                    <a href={concertData.tickets} role="button" target="_blank" class="dy-btn dy-btn-ghost dy-btn-sm">
                      <ExternalLinkIcon sizeMultiplier={5} />
                      <span>Zu den Tickets</span>
                    </a>
                  </span>
                {/if}
              </td>
            </tr>
          {/if}
          {#if concertData?.price}
            {@render concertDetailRow("Preis", `${concertData?.price?.toFixed(2).replace(".", ",")} €`)}
          {/if}
          {#if concertData?.notes}
            {@render concertDetailRow("Hinweise", concertData?.notes.join("<br />"))}
          {/if}
          {#if concertData?.link}
            <tr>
              <td colspan="2" class="items-center text-center">
                <div class="dy-tooltip dy-tooltip-top dy-tooltip-info" data-tip={prettyURL(concertData.link)}>
                  <a href={concertData.link} role="button" target="_blank" class="dy-btn dy-btn-outline dy-btn-sm">
                    <ExternalLinkIcon sizeMultiplier={5} />
                    <span class="ml-2">Zur Location</span>
                  </a>
                </div>
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
  <form method="dialog" class="dy-modal-backdrop" onsubmit={closeModal}>
    <button>close</button>
  </form>
</dialog>

{#if _error}
  <dialog id="error-modal" class="dy-modal dy-modal-open dy-modal-bottom sm:dy-modal-middle" transition:slide>
    <div class="dy-modal-box bg-error text-error-content">
      <h3 class="font-bold">Ein Fehler ist aufgetreten!</h3>
      <div class="font-mono font-thin">{_error?.message}</div>
      <form method="dialog" class="mt-3 flex justify-end" onsubmit={() => (_error = null)}>
        <XButton stroke="white" buttonText="Schließen" />
      </form>
    </div>
  </dialog>
{/if}
