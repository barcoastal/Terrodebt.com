import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/lib/session";

const COOKIE = "eli_clickid";

// Old /services/{product-slug} URLs that 404 now → permanent redirects to live URLs
const SERVICE_REDIRECTS: Record<string, string> = {
  "/services/mca-debt-relief": "/services/creditor-liaison",
  "/services/equipment-finance-restructure": "/services/creditor-liaison",
  "/services/vendor-supplier-debt": "/services/creditor-liaison",
  "/services/bank-loan-workout": "/services/creditor-liaison",
  "/services/business-tax-debt": "/services/creditor-liaison",
};

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function proxy(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").toLowerCase();

  // www → apex 308 (preserve scheme + path, drop port so Railway internal :8080 doesn't leak)
  if (host.startsWith("www.")) {
    const apex = host.slice(4).replace(/:\d+$/, "");
    const url = req.nextUrl.clone();
    url.host = apex;
    url.port = "";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  // Permanent redirects for retired /services/{product-slug} URLs
  const target = SERVICE_REDIRECTS[req.nextUrl.pathname];
  if (target) {
    const url = req.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 301);
  }

  // /articles/* → /insights/* (article body links use the old path)
  if (req.nextUrl.pathname.startsWith("/articles/")) {
    const url = req.nextUrl.clone();
    url.pathname = req.nextUrl.pathname.replace(/^\/articles\//, "/insights/");
    return NextResponse.redirect(url, 301);
  }

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
