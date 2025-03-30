import bandMembers from "$lib/bandMembers.json";

export const prerender = true;

export function load() {
  return {
    members: bandMembers,
  };
}
