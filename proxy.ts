import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/lib/session";

const COOKIE = "eli_clickid";

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  if (!req.cookies.get(COOKIE)) {
    res.cookies.set(COOKIE, makeId(), {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      path: "/",
    });
  }

  if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
    const cookieStore = {
      get: (name: string) => {
        const c = req.cookies.get(name);
        return c ? { name: c.name, value: c.value } : undefined;
      },
      set: () => {},
      delete: () => {},
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await getIronSession<SessionData>(cookieStore as any, sessionOptions);
    if (!session.userId) return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/visitor).*)"],
};
