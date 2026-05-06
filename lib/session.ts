import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = { userId?: string; email?: string };

const password = process.env.SESSION_SECRET ?? "dev-only-change-me-please-32-chars-min!!";
const cookieName = "td_admin";

export const sessionOptions: SessionOptions = {
  password,
  cookieName,
  cookieOptions: { secure: process.env.NODE_ENV === "production", httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 8 },
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
