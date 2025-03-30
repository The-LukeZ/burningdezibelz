/** @type {import('./$types').RequestHandler} */
export async function GET({ locals, params }) {
  console.log("Logged in?", locals.loggedIn);
  return new Response("Hello from the server again!");
}
