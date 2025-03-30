<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
</script>

<Navbar />

<SiteHeader text="Impressum" />

<div class="mx-auto flex w-full max-w-[1000px] items-center justify-between p-4">
  <article class="prose w-full text-slate-300">
    <p>Angaben gemäß § 5 TMG</p>

    <ul class="list-none">
      <li class="mt-0 mb-0">Jan Mehlhorn</li>
      <li class="mt-0 mb-0">Poststraße 10</li>
      <li class="mt-0 mb-0">09353 Oberlungwitz</li>
      <li class="mt-0 mb-0">Deutschland</li>
    </ul>
    <p>
      Email: <a href="mailto:burningdezibelz@gmail.com" target="_blank" class="dy-link-primary">burningdezibelz@gmail.com</a>
    </p>
    <hr />
    <p><b>Verantwortlich für den Inhalt der Seiten:</b></p>
    <ul class="list-none">
      <li class="mt-0 mb-0">Luca Hentschel</li>
      <li class="mt-0 mb-0">Schneeberger Straße 31</li>
      <li class="mt-0 mb-0">08112 Wilkau-Haßlau</li>
      <li class="mt-0 mb-0">Deutschland</li>
    </ul>
  </article>
</div>
