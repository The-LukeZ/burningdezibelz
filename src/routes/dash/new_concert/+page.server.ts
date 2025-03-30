import { redirect } from "@sveltejs/kit";

export async function load({ cookies, locals }) {
  if (!locals.loggedIn) {
    return redirect(302, "/login");
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  create: async function ({ cookies, locals, request, params }) {
    console.log(request);
  },
};
