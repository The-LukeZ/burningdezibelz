import dayjs from "dayjs";

export function prettyURL(link: any): string {
  if (typeof link !== "string") return "";
  return link.replace(/(https:\/\/|\/$)/gi, "");
}

