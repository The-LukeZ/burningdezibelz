<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  let { data } = $props();
  let songs = data.songs;
</script>

<Navbar />

<div class="mt-5">
  <table class="dy-table dy-table-zebra table-fixed">
    <!-- head -->
    <thead>
      <tr>
        <th class="w-[5%]">Nr.</th>
        <th class="text-right text-xl">Titel</th>
        <th class="text-left text-xl">Interpret</th>
      </tr>
    </thead>
    <tbody>
      {#each songs as song, index}
        <tr>
          <td>{index + 1}</td>
          <td class="text-right">{song.title}</td>
          <td>{song.author}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
