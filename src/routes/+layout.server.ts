import dayjs from "dayjs";

export async function load() {
  const _date = dayjs().toDate();
  return { ..._date };
}
