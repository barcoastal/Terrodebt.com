import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/lib/session";

const COOKIE = "eli_clickid";

// Old /services/{slug} URLs → live slugs (301)
const SERVICE_REDIRECTS: Record<string, string> = {
  // Retired 2026-05 product slugs
  "/services/mca-debt-relief": "/services/debt-relief-planning",
  "/services/equipment-finance-restructure": "/services/business-debt-restructuring",
  "/services/vendor-supplier-debt": "/services/creditor-communication",
  "/services/bank-loan-workout": "/services/business-debt-restructuring",
  "/services/business-tax-debt": "/services/debt-relief-planning",
  // Retired 2026-06 process-named slugs
  "/services/forensic-audit": "/services/debt-relief-planning",
  "/services/liquidity-engineering": "/services/debt-relief-planning",
  "/services/creditor-liaison": "/services/creditor-communication",
  "/services/operational-restructuring": "/services/bankruptcy-alternative",
  // Retired 2026-06 outcome-named intermediate slugs
  "/services/business-debt-relief": "/services/debt-relief-planning",
  "/services/business-debt-resolution": "/services/debt-relief-planning",
  "/services/business-debt-settlement": "/services/debt-relief-planning",
  // Pre-rebrand /article/{slug} URLs still indexed by Google (no live equivalent)
  "/article/best-bankruptcy-attorneys-georgia": "/mca-defense/ga",
  "/article/personal-guarantee-defenses": "/mca-defense",
  "/article/sba-loan-default": "/insights",
  "/article/statute-of-limitations-business-debt": "/insights",
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

  // /articles/* and pre-rebrand /article/* → /insights/*
  if (/^\/articles?\//.test(req.nextUrl.pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = req.nextUrl.pathname.replace(/^\/articles?\//, "/insights/");
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
