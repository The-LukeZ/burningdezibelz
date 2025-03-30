import { LoginSession } from "$lib/models/loginSession";
import { JWT_SECRET } from "$env/static/private";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import type { Cookies } from "@sveltejs/kit";

export default async function verifyLogin(cookies: Cookies) {
  const auth_token = cookies.get("auth_token");
  if (!auth_token) {
    return { status: 404 };
  }

  let decoded: jwt.JwtPayload;
  try {
    decoded = jwt.verify(auth_token, JWT_SECRET, { algorithms: ["HS256"] }) as jwt.JwtPayload;
  } catch (err) {
    console.error("Error while verifying jwt", err);
    return { status: 400 };
  }

  const sessionId = decoded.sessionId;
  const session = await LoginSession.findById(sessionId);

  if (!session) {
    return { status: 404 };
  }

  if (session.valid && session.createdAt >= dayjs().subtract(7, "day").toDate()) {
    return { status: 200 };
  } else {
    console.log("Session is not valid or expired");
    return { status: 400 };
  }
}

export function responseOK(status: number) {
  return status >= 200 && status < 300;
}
