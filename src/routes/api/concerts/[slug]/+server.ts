import { json } from "@sveltejs/kit";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

let ratelimter = new RateLimiterMemory({ duration: 5, points: 5, blockDuration: 15 });

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, getClientAddress }) {
  try {
    await ratelimter.consume(getClientAddress(), 1);
  } catch (rej) {
    if (rej instanceof RateLimiterRes)
      return json(
        {
          status: 429,
          statusText: "Zu viele Anfragen",
          message: `Zu viele Anfragen, bitte warten Sie ${rej.msBeforeNext / 1000} Sekunden`,
          wait_seconds: rej.msBeforeNext / 1000,
        },
        { status: 429 },
      );
    throw rej;
  }

  if (!params.slug) {
    return json({ error: "slug is required" }, { status: 400 });
  }

  const conerts = (await import("$lib/demo_concerts.json")).default;
  const concert = conerts.find((c) => c._id === params.slug);

  if (!concert) {
    return json({ error: "concert not found" }, { status: 404 });
  }

  return json(concert);
}
