import { dbConnect } from "$lib/utils/dbInternal";
import verifyLogin, { responseOK } from "$lib/utils/verifyLogin";

export async function init() {
  await dbConnect();
}

export async function handle({ event, resolve }) {
  const loggedIn = await verifyLogin(event.cookies).catch(() => null);
  event.locals.loggedIn = responseOK(loggedIn?.status || 500);

  const response = await resolve(event);
  return response;
}

export async function handleError({ error, message, status }) {
  return { message: message || "An error occurred", status: status };
}
