import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  if (!locals.loggedIn) {
    return redirect(302, "/login");
  }
}

export const actions = {
  create: async function ({ request }) {
    console.log(request);
  },
};
