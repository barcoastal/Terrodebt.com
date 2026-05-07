import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-content flex items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center no-underline" aria-label="TerraDebt home">
          <Image src="/logos/terradebt-lockup.svg" alt="TerraDebt" width={170} height={26} priority />
        </Link>
        <nav className="hidden md:flex gap-6 text-sm text-slate">
          <Link href="/programs" className="hover:text-electric transition no-underline">Programs</Link>
          <Link href="/industries" className="hover:text-electric transition no-underline">Industries</Link>
          <Link href="/contract-review" className="hover:text-electric transition no-underline">Contract Review</Link>
          <Link href="/case-studies" className="hover:text-electric transition no-underline">Case Studies</Link>
          <Link href="/articles" className="hover:text-electric transition no-underline">Articles</Link>
          <Link href="/about" className="hover:text-electric transition no-underline">About</Link>
        </nav>
        <Link href="/get-started" className="bg-slate text-white px-4 py-2 rounded-lg text-sm font-medium no-underline hover:bg-slate-soft transition">
          Get assessment
        </Link>
      </div>
    </header>
  );
}
