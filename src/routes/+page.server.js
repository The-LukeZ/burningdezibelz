import { fetchConcerts } from "$lib/utils/concerts";
import dayjs from "dayjs";

export async function load() {
  // TODO: Load data from internal API

  const concerts = await fetchConcerts();
  const nowTs = dayjs();

  return {
    concerts: concerts.filter((concert) => dayjs(concert.date).isAfter(nowTs)),
  };
}
