import { Concert, concertSchema } from "../models/concert";
import demoConcerts from "$lib/demo_concerts.json";

/**
 *
 * @returns {Promise<DBModels.Concert[]>}
 */
export async function fetchConcerts() {
  return demoConcerts.sort((a, b) => a.date.localeCompare(b.date)); // sort by date
}

export function fetchConcertById(id) {
  return Concert.findById(id);
}

/**
 *
 * @param {concertSchema} data
 */
export function createConcert(data) {
  return Concert.create(data);
}
