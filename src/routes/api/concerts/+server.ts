import { json } from "@sveltejs/kit";
import dayjs from "dayjs";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

let ratelimter = new RateLimiterMemory({ duration: 5, points: 5, blockDuration: 30 });

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, getClientAddress }) {
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

  let concerts = (await import("$lib/demo_concerts.json")).default;

  const nowTs = dayjs();

  /**
   * @type {any}
   */
  const params = {
    search: url.searchParams.get("search"),
    before: url.searchParams.get("before"),
    after: url.searchParams.get("after") || nowTs,
    skip: parseInt(url.searchParams.get("skip")),
    limit: parseInt(url.searchParams.get("limit")),
  };

  if (params.search) {
    concerts = concerts.filter((c) => c.name.toLowerCase().includes(params.search.toLowerCase()));
  }
  if (params.before) {
    concerts = concerts.filter((c) => dayjs(c.date).isBefore(nowTs));
  } else if (params.after) {
    concerts = concerts.filter((c) => dayjs(c.date).isAfter(nowTs));
  }
  if (params.skip) {
    concerts = concerts.slice(params.skip);
  }
  if (params.limit) {
    concerts = concerts.slice(0, params.limit);
  }

  return json(concerts);
}
