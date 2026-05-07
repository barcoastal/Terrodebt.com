import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="mx-auto max-w-content px-6 py-12 grid gap-8 md:grid-cols-5 text-sm">
        <div>
          <Image src="/logos/terradebt-wordmark.svg" alt="TerraDebt" width={140} height={28} className="mb-3" />
          <p className="text-muted">Resolve stacked MCAs with a tailored program.</p>
          <Link href="/brand" className="block mt-3 text-xs text-muted hover:text-slate">Brand &amp; design system →</Link>
        </div>
        <div>
          <div className="font-medium mb-2">Services</div>
          <ul className="space-y-1 text-muted">
            <li><Link href="/services/mca-debt-relief">MCA Debt Relief</Link></li>
            <li><Link href="/programs/settlement">Settlement</Link></li>
            <li><Link href="/programs/restructure">Restructure</Link></li>
            <li><Link href="/programs/reverse-consolidation-defense">Reverse Consolidation Defense</Link></li>
            <li><Link href="/programs/legal-defense">Legal Defense</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Tools</div>
          <ul className="space-y-1 text-muted">
            <li><Link href="/tools">All free tools</Link></li>
            <li><Link href="/tools/apr-calculator">Effective APR Calculator</Link></li>
            <li><Link href="/tools/stack-calculator">Stacked MCA Calculator</Link></li>
            <li><Link href="/tools/health-check">MCA Health Check</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Company</div>
          <ul className="space-y-1 text-muted">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/case-studies">Case Studies</Link></li>
            <li><Link href="/articles">Articles</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Legal</div>
          <ul className="space-y-1 text-muted">
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/disclosure">Disclosure</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-content px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted">
          <div>
            <span className="font-medium text-slate">GRL Recovery LLC</span>
            <span className="mx-2 text-border">·</span>
            <span>6301 NW 5th Way 5100, Fort Lauderdale, FL 33309</span>
          </div>
          <div>© {new Date().getFullYear()} GRL Recovery LLC. TerraDebt is a trade name of GRL Recovery LLC. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
