import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  if (locals.loggedIn) {
    return {
      loggedIn: true,
    };
  } else {
    return redirect(302, "/dash/login");
  }
}
