import { redirect } from "@sveltejs/kit";

export let prerender = false;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({}) {
  return redirect(301, "/");
}
