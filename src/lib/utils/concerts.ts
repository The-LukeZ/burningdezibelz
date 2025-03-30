import { Concert } from "../models/concert";
const rawConcerts = (await import("$lib/demo_concerts.json")).default;
const concerts = rawConcerts.map((concert) => ({
  ...concert,
  date: new Date(concert.date).toISOString(),
})) as any as DBModels.Concert[];

export async function fetchConcerts() {
  return (concerts).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // sort by date
}

export function fetchConcertById(id: string) {
  return Concert.findById(id);
}
