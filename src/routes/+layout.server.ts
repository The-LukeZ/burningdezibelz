import { getDate } from "$lib/utils/utilityFuncs";

export async function load() {
  const _data = getDate();
  return {
    ..._data,
  };
}
