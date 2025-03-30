import { model, Schema } from "mongoose";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const loginSessionSchema = new Schema(
  {
    ipHash: { type: String, required: true },
    iv: { type: String, required: true },
    valid: { type: Boolean, default: true }, // Set to false to log user out
  },
  { timestamps: true },
);

/**
 * @type {import("mongoose").Model}
 */
let LoginSession;
try {
  LoginSession = model("LoginSession");
} catch {
  LoginSession = model("LoginSession", loginSessionSchema, "loginSessions");
}

export function invalidateSessions(ipHash = "") {
  let filter = {};
  if (ipHash) filter = { ipHash };
  return LoginSession.updateMany(filter, { valid: false });
}

export { LoginSession, loginSessionSchema };

/*
The IV generated is stored on the user-side and can be used to decrpyt the IP address when needed.
*/

/**
 *
 * @param {string} ip
 * @param {string} key
 */
export function encryptIP(ip, key) {
  const iv = randomBytes(16).toString("hex");
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = cipher.update(ip, "utf8", "hex");
  return { iv: iv, encryptedIP: encrypted + cipher.final("hex") };
}

/**
 *
 * @param {string} encryptedIP
 * @param {string} key
 * @param {string} iv
 */
export function decryptIP(encryptedIP, key, iv) {
  const decipher = createDecipheriv("aes-256-ccm", key, iv);
  const decrypted = decipher.update(encryptedIP, "hex", "utf8");
  return decrypted + decipher.final("utf8");
}
