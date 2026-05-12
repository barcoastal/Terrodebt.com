import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-offwhite">
      <div className="mx-auto max-w-content flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center no-underline" aria-label="TerraDebt home">
            <Image src="/logos/terradebt-lockup.svg" alt="TerraDebt" width={160} height={24} priority />
          </Link>
          <nav className="hidden md:flex gap-7 text-sm text-slate">
            <Link href="/services" className="hover:text-electric transition no-underline">Topics</Link>
            <Link href="/articles" className="hover:text-electric transition no-underline">Research</Link>
            <Link href="/industries" className="hover:text-electric transition no-underline">Industries</Link>
            <Link href="/tools" className="hover:text-electric transition no-underline">Tools</Link>
            <Link href="/about" className="hover:text-electric transition no-underline">About</Link>
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/get-started" className="hidden sm:inline-block text-sm text-slate hover:text-electric no-underline transition">
            Get assessment
          </Link>
          <Link href="/#subscribe" className="bg-slate text-white px-3.5 py-2 rounded-md text-sm font-medium no-underline hover:bg-slate-soft transition">
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
}
