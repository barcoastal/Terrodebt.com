import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/product-content";
import { SubscribeForm } from "./SubscribeForm";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-14 grid gap-10 md:grid-cols-12 text-sm">
        <div className="md:col-span-3">
          <Image src="/logos/terradebt-wordmark.svg" alt="TerraDebt" width={140} height={28} className="mb-3" />
          <p className="text-muted leading-relaxed">Business debt restructure across six coverage areas.</p>
          <Link href="/about" className="block mt-4 text-xs font-mono uppercase tracking-wider text-electric no-underline hover:underline">
            About TerraDebt →
          </Link>
        </div>

        <div className="md:col-span-2">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-3">Sections</div>
          <ul className="space-y-2 text-slate">
            <li><Link href="/services" className="no-underline hover:text-electric">Topics</Link></li>
            <li><Link href="/industries" className="no-underline hover:text-electric">Industries</Link></li>
            <li><Link href="/articles" className="no-underline hover:text-electric">Research</Link></li>
            <li><Link href="/tools" className="no-underline hover:text-electric">Tools</Link></li>
            <li><Link href="/about" className="no-underline hover:text-electric">About</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-3">Coverage</div>
          <ul className="space-y-2 text-slate">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link href={`/services/${p.slug}`} className="no-underline hover:text-electric">
                  {p.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-3">Subscribe</div>
          <p className="text-muted leading-relaxed mb-3">
            Get our weekly business-debt brief. One email, useful math, no filler.
          </p>
          <SubscribeForm source="footer" />
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            <li><Link href="/privacy" className="no-underline hover:text-slate">Privacy</Link></li>
            <li><Link href="/terms" className="no-underline hover:text-slate">Terms</Link></li>
            <li><Link href="/disclosure" className="no-underline hover:text-slate">Disclosure</Link></li>
            <li><Link href="/contact" className="no-underline hover:text-slate">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto max-w-content px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted">
          <div>
            <span className="font-medium text-slate">GRL Recovery LLC</span>
            <span className="mx-2 text-rule">·</span>
            <span>6301 NW 5th Way 5100, Fort Lauderdale, FL 33309</span>
          </div>
          <div>© {new Date().getFullYear()} GRL Recovery LLC. TerraDebt is a trade name of GRL Recovery LLC. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
