import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="mx-auto max-w-content px-6 py-12 grid gap-8 md:grid-cols-4 text-sm">
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
      <div className="border-t border-border text-center text-xs text-muted py-4">© {new Date().getFullYear()} TerraDebt. All rights reserved.</div>
    </footer>
  );
}
