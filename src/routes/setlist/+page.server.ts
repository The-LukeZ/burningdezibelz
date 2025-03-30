export const csr = false;

/** @type {import('../$types').PageServerLoad} */
export async function load() {
  let songs = (await import("$lib/songs.json")).default
  songs.sort((a, b) => a.title.localeCompare(b.title));
  return {
    songs: songs,
  };
}
