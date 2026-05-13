import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/product-content";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-ink text-white">
      <div className="mx-auto max-w-content px-6 py-14 grid gap-10 md:grid-cols-12 text-sm">
        <div className="md:col-span-3">
          <Image
            src="/logos/terradebt-wordmark-white.svg"
            alt="TerraDebt"
            width={140}
            height={28}
            className="mb-3"
          />
          <p className="text-white/70 leading-relaxed text-sm">
            Information hub and program shop for business debt restructure across six coverage areas.
          </p>
          <div className="mt-5 text-xs text-white/60 leading-relaxed">
            <p className="text-white font-medium">GRL Recovery LLC dba TerraDebt</p>
            <p className="mt-1">6301 NW 5th Way 5100</p>
            <p>Fort Lauderdale, FL 33309</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric font-bold mb-3">
            Topics
          </div>
          <ul className="space-y-2 text-white/85">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/services/${p.slug}`}
                  className="no-underline text-white/85 hover:text-electric hover:underline"
                >
                  {p.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric font-bold mb-3">
            Industries
          </div>
          <ul className="space-y-2 text-white/85">
            {VERTICAL_CONTENT.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/industries/${v.slug}`}
                  className="no-underline text-white/85 hover:text-electric hover:underline"
                >
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric font-bold mb-3">
            Resources
          </div>
          <ul className="space-y-2 text-white/85">
            <li><Link href="/articles" className="no-underline text-white/85 hover:text-electric hover:underline">Articles</Link></li>
            <li><Link href="/tools" className="no-underline text-white/85 hover:text-electric hover:underline">Tools</Link></li>
            <li><Link href="/glossary" className="no-underline text-white/85 hover:text-electric hover:underline">Glossary</Link></li>
            <li><Link href="/about" className="no-underline text-white/85 hover:text-electric hover:underline">About</Link></li>
            <li><Link href="/contact" className="no-underline text-white/85 hover:text-electric hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric font-bold mb-3">
            Legal
          </div>
          <ul className="space-y-2 text-white/85">
            <li><Link href="/privacy" className="no-underline text-white/85 hover:text-electric hover:underline">Privacy</Link></li>
            <li><Link href="/terms" className="no-underline text-white/85 hover:text-electric hover:underline">Terms</Link></li>
            <li><Link href="/disclosure" className="no-underline text-white/85 hover:text-electric hover:underline">Disclosure</Link></li>
          </ul>
          <p className="mt-5 text-xs text-white/60 leading-relaxed">
            TerraDebt is not a law firm. When legal defense is required, we coordinate licensed counsel in your state.
          </p>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-content px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} GRL Recovery LLC. TerraDebt is a trade name of GRL Recovery LLC.</div>
          <Link
            href="/#subscribe"
            className="text-white/70 hover:text-electric no-underline transition font-mono uppercase tracking-[0.18em] text-[11px]"
          >
            Subscribe to the weekly brief →
          </Link>
        </div>
      </div>
    </footer>
  );
}
