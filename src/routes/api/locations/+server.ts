export async function GET({ locals }) {
  console.log("Logged in?", locals.loggedIn);
  return new Response("Hello from the server again!");
}
