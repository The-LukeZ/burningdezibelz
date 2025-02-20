import dayjs from "dayjs";

/**
 *
 * @param {any} link
 * @returns {string}
 */
export function prettyURL(link) {
  if (typeof link !== "string") return "";
  return link.replace(/(https:\/\/|\/$)/gi, "");
}

export function getDate() {
  const _nowTs = dayjs();
  return {
    date: _nowTs.toISOString(),
    year: _nowTs.year(),
  };
}
