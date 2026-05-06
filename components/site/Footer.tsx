import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="mx-auto max-w-content px-6 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="text-slate font-bold mb-2">TerraDebt</div>
          <p className="text-muted">MCA debt relief with a published flat fee.</p>
        </div>
        <div>
          <div className="font-medium mb-2">Programs</div>
          <ul className="space-y-1 text-muted">
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
