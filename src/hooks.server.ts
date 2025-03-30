import { dbConnect } from "$lib/utils/dbInternal";
import verifyLogin, { responseOK } from "$lib/utils/verifyLogin";

/** @type {import('@sveltejs/kit').ServerInit} */
export async function init() {
  await dbConnect();
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const loggedIn = await verifyLogin(event.cookies).catch(() => null);
  event.locals.loggedIn = responseOK(loggedIn?.status || 500);

  const response = await resolve(event);
  return response;
}

// export async function handleError() {}
