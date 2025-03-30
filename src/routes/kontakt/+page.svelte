<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";

  import { onMount } from "svelte";

  let subject = $state("");
  let message = $state("");
  let mailUrl = $derived(
    `mailto:burningdezibelz.de?${new URLSearchParams({
      subject: subject,
      body: message,
    }).toString()}`,
  );

  function handleSubmit() {
    window.open(mailUrl, "_blank");
  }

  onMount(() => {
    document.getElementById("subject")?.focus({ preventScroll: true });
  });
</script>

<Navbar />

<SiteHeader text={"Kontakt"} />

<div class="m-5 mx-auto flex w-full max-w-[1000px] justify-center p-3">
  <form class="w-full items-center" onsubmit={handleSubmit}>
    <input
      type="text"
      class="dy-input dy-input-bordered mb-[3px] w-full font-semibold text-white"
      style="font-family: Poppins, sans-serif;"
      placeholder="Betreff"
      bind:value={subject}
      id="subject"
      required
    />
    <textarea
      class="dy-textarea dy-textarea-bordered mt-[3px] h-fit min-h-[9rem] w-full font-sans font-normal text-white"
      style="font-family: Poppins, sans-serif;"
      placeholder="Deine Nachricht"
      bind:value={message}
      id="message"
      required
    ></textarea>
    <button type="submit" class="dy-btn dy-btn-outline float-right mt-5 justify-self-end">Senden</button>
  </form>
</div>
