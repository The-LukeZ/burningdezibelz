<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import SectionWrapper from "$lib/components/SectionWrapper.svelte";
  import dayjs from "dayjs";

  let { data } = $props();
  let concerts = data.concerts;
  let width = $state(1920);
</script>

<svelte:window bind:outerWidth={width} />

<Navbar />

<div class="container block max-w-[100%] self-center bg-black">
  <img src="/burningdezibelz_logo.png" alt="Band Banner" class="mx-auto max-h-screen w-full object-contain" />
</div>

<!-- <div class="z-[-1] h-[2000px] bg-linear-to-b from-black to-transparent opacity-90"></div> -->

{#snippet concertRow(concert: DBModels.Concert, i: number)}
  <tr class="dy-hover content-center items-center">
    <td class="hidden w-10 text-center lg:table-cell">{i + 1}</td>
    <td class="dy-link text-center text-lg font-bold text-primary md:dy-link-hover">
      {#if concert.link}
        <a href={concert.link} class="dy-link-hover dy-link" target="_blank">{concert.name}</a>
      {:else}
        {concert.name}
      {/if}
    </td>
    <td class="text-center">{dayjs(concert.date).toDate().toLocaleString("de", { dateStyle: "full" })}</td>
    <td class="text-center"
      ><a href="/konzerte#{concert._id}" class="dy-btn dy-btn-outline lg:dy-btn-sm lg:dy-btn-wide">Mehr Infos</a></td
    >
  </tr>
{/snippet}

<div id="gradient-start-point" class="relative w-full bg-linear-to-b from-black to-transparent">
  <main class="container mx-auto flex flex-col">
    <SectionWrapper id="upcoming-concerts">
      <div class="p-5">
        <h1 class="text-center text-2xl font-bold md:text-3xl">
          <a href="#upcoming-concerts" class="dy-link-hover dy-link">Anstehende Konzerte</a>
        </h1>
      </div>

      <!-- Table with the next 25 concerts -->
      <div class="w-full overflow-x-auto">
        <table class="dy-table my-auto w-full table-auto content-center font-semibold">
          <tbody>
            {#each concerts as concert, i}
              {#if i < 25}
                {@render concertRow(concert, i)}
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    </SectionWrapper>

    {#snippet bandMemberWTooltip(name: string, roles: string[])}
      <span
        class="dy-tooltip dy-tooltip-info underline decoration-dotted underline-offset-4 duration-[50ms]"
        data-tip={roles.join(" & ")}
        >{name}
      </span>
    {/snippet}

    <div class="dy-divider dy-divider-primary w-full"></div>

    <SectionWrapper id="aboutus">
      <div class="pb-5 pt-2 text-center">
        <a href="#about" id="about" class="text-2xl font-black italic">Über Uns</a>
      </div>

      <!-- Short About Us -->

      <div id="aboutusimage" class="justify-items-center">
        <!-- <img
        src="https://picsum.photos/1920/1080"
        alt="Die Band im Bandraum (Jan, Robert, Micha, Luca)"
        class="z-auto mx-auto w-[90%] max-w-[90%] rounded-[10px] hover:z-1 hover:drop-shadow-lg"
      /> -->
        <div class="dy-skeleton flex h-[256px] w-full items-center justify-center shadow-md lg:w-[70%]">
          <p class="mx-auto text-center italic">Bild ist noch in Arbeit...<br />Habt Geduld...</p>
        </div>
      </div>

      <div class="h-10"></div>

      <div class="prose mx-auto space-y-2 text-center font-extralight leading-7 text-base-content md:text-[1.5rem]">
        <p>
          <span class="text-[110%]">Wir sind die <span class="font-bold">Burning Dezibelz</span>!</span><br />
          Eine junge Band aus dem schönen <span class="font-bold">Zwickau</span>, wobei sich "jung" nur auf das Alter der Band
          bezieht, denn uns gibt es seit <b>2023</b>.<br />
        </p>
        <p>
          Wir bestehen aus den vier Mitgliedern:
          {@render bandMemberWTooltip("Jan", ["Gesang", "Gitarre"])},
          {@render bandMemberWTooltip("Robert", ["Gesang", "Bass"])},
          {@render bandMemberWTooltip("Micha", ["Gesang", "Gitarre"])},
          {@render bandMemberWTooltip("Luca", ["Nur Schlagzeug ):"])}.
        </p>
        <p>
          Wir spielen <span class="font-bold">Rock</span>, <span class="font-bold">Metal</span> und alles dazwischen.<br />
        </p>
        <p>
          Mehr über uns erfährst du <a href="/about" class="dy-link-hover dy-link dy-link-primary">hier</a>.
        </p>
      </div>
    </SectionWrapper>
  </main>
</div>
