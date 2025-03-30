import { dash_password, dash_username, DB_SECRET, JWT_SECRET } from "$env/static/private";
import { encryptIP, LoginSession } from "$lib/models/loginSession";
import { redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

export async function load({ cookies, url, locals }) {
  if (url.searchParams?.get("logout") == "true") {
    cookies.delete("auth_token", { path: "/" });
    url.searchParams.delete("logout");
    return redirect(302, url);
  }

  if (locals.loggedIn) {
    return redirect(302, "/dash");
  }
}

export const actions = {
  async login({ request, cookies, getClientAddress }) {
    // Perform the login
    console.log("login action");
    const data = await request.formData();
    const uname = data.get("username");
    const pw = data.get("password");
    console.log("uname", uname);
    console.log("pw", pw);
    if (uname !== dash_username || pw !== dash_password) {
      return redirect(300, "/dash/login");
    }

    let session;
    try {
      console.log("creating session");
      let encryptedData = encryptIP(getClientAddress(), DB_SECRET);
      console.log("encryptedData", encryptedData);
      session = await LoginSession.create({ ipHash: encryptedData.encryptedIP, iv: encryptedData.iv });
      encryptedData = undefined;
    } catch (e) {
      console.error("Error creating session", e);
      return redirect(300, "/dash/login");
    }

    if (!session) {
      console.log("session is undefined");
      return redirect(300, "/dash/login");
    }

    console.log("session", session);
    const token = jwt.sign({ sessionId: session._id.toHexString() }, JWT_SECRET, { expiresIn: 604_800, algorithm: "HS256" });
    session = undefined;

    console.log("setting cookie");
    cookies.set("auth_token", token, {
      path: "/",
      // secure: true,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 604_800,
      expires: new Date(Date.now() + 604_800 * 1000),
    });
    console.log("redirecting");
    return redirect(302, "/dash");
  },
};
