<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import PWrapper from "$lib/components/PWrapper.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import { marked } from "marked";
  import { fade } from "svelte/transition";

  let { data } = $props();
  let members = data.members.reduce((acc, member) => {
    acc[member.name] = member;
    return acc;
  }, {});

  /**
   * @typedef {Object} BandMember
   * @property {string} name
   * @property {string[]} roles
   * @property {string} image
   * @property {string?} link
   * @property {string?} bio
   */

  /**
   * @type {BandMember | null}
   */
  let memberDetails = $state(null);
  let showMemberDetails = $state(false);

  /**
   * @param {string} encodedName
   */
  function openBandMemberModal(encodedName) {
    const member = members[decodeURIComponent(encodedName)];
    console.log(member);
    if (!member) return;
    memberDetails = member;
    showMemberDetails = true;
    return;
  }

  function eradicateMemberDetails() {
    // Wait 150ms for the dialog to close
    setTimeout(() => {
      memberDetails = null;
      showMemberDetails = false;
    }, 150);
  }

  $effect(() => {
    if (memberDetails !== null) {
      /** @type {any} */
      const dialog = document.getElementById("memberDetails-" + encodeURIComponent(memberDetails.name));
      dialog.showModal();
    }
  });
</script>

<Navbar />

<SiteHeader text="Über uns" />

<div class="container flex max-w-[1500px] flex-col self-center">
  <div class="flex flex-col lg:flex-row-reverse">
    <!-- Bild -->
    <div class="relative container mx-8 w-full self-center p-5 lg:max-w-[50%]">
      <img src="/burningdezibelz_logo.png" alt="Band-Logo" class="mx-auto w-full rounded-2xl object-contain" />
      <div class="bg-opacity-50 visible absolute right-5 bottom-5 rounded-xs bg-transparent px-2 py-1 text-slate-300 italic">
        Dieses Bild ist noch in Arbeit...
      </div>
    </div>

    <!-- Text -->
    <section class="text-base-content w-full self-center p-5 text-center lg:w-1/2">
      <h1 id="die-band" class="mb-4 text-2xl font-bold underline"><a href="#die-band">Die Band</a></h1>
      <PWrapper>
        Die Band wurde 2023 in Zwickau gegründet. Wir spezialisieren uns seitdem auf Rock und Metal und spielten am 21.12.2023 im <a
          href="https://www.facebook.com/ontherocks.zwickau/"
          class="dy-link dy-link-primary"
          target="_blank">Rocks</a
        > unser Debut.
      </PWrapper>
      <PWrapper>
        Kurz darauf folgte schon der erst Bandmitgliederwechsel. Max, <span class="italic">ehem. Schlagzeuger</span>, verließ im
        Frühjahr 2024 die Band, woraufhin Luca dazu kam; Er ist bis heute dabei.
      </PWrapper>
      <PWrapper>Diese Besetzung hält bis heute an und wir spielen regelmäßig in Zwickau und Umgebung.</PWrapper>
      <PWrapper>
        Gespielt wird AC/DC, Metallica, Iron Maiden, Ozzy Osbourne, Black Sabbath, Mötorhead, Mötley Crüe, und viele mehr.
      </PWrapper>
      <a href="/setlist" class="dy-link dy-link-primary">Erfahre mehr über unsere Setlist.</a>
    </section>
  </div>

  <div class="dy-divider dy-divider-primary"></div>

  <h1 id="mitglieder" class="mb-6 text-center text-2xl font-bold underline"><a href="#mitglieder">Mitglieder</a></h1>

  {#snippet bandMemberCard(/** @type {BandMember} */ { name, roles, image })}
    <div
      id={encodeURIComponent(name)}
      transition:fade
      class="dy-card bg-secondary max-w-[300px] flex-none overflow-hidden lg:transition lg:delay-[50ms] lg:ease-in-out lg:hover:-translate-y-1 lg:hover:scale-[101%]"
    >
      <div class="pointer-events-none absolute inset-0 -m-1"></div>
      <figure><img src={image} alt={name} /></figure>
      <div class="dy-card-body items-center text-center">
        <h2 class="dy-card-title">{name}</h2>
        <p>{roles.join(", ")}</p>
        <div class="dy-card-actions justify-end">
          <button class="dy-btn dy-btn-outline dy-btn-sm" onclick={() => openBandMemberModal(encodeURIComponent(name))}
            >Mehr lesen</button
          >
        </div>
      </div>
    </div>
  {/snippet}

  <section class="container mx-auto flex flex-row flex-wrap items-stretch justify-center gap-5">
    {#each data.members as bandMember}
      {@render bandMemberCard(bandMember)}
    {/each}
  </section>
</div>

{#if Boolean(memberDetails)}
  <dialog id={"memberDetails-" + encodeURIComponent(memberDetails.name)} class="dy-modal">
    <div class="dy-modal-box max-w-[1000px]">
      <form method="dialog" onsubmit={eradicateMemberDetails}>
        <button class="dy-btn dy-btn-square absolute top-4 right-4">
          <img src="/cross.svg" alt="X" class="dy-btn dy-btn-md" />
        </button>
      </form>

      <!-- Items -->
      <ul class="w-full list-none space-y-4">
        <li>
          <h2 class="text-2xl font-bold">{memberDetails.name}</h2>
        </li>
        <li class="poppins">
          <p class="w-full">
            {@html marked.parse(memberDetails.bio)}
          </p>
        </li>
      </ul>
    </div>
    <form method="dialog" class="dy-modal-backdrop cursor-default" onsubmit={eradicateMemberDetails}>
      <button>close</button>
    </form>
  </dialog>
{/if}
