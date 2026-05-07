import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto max-w-content flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center no-underline hover:no-underline" aria-label="TerraDebt home">
          <Image src="/logos/terradebt-lockup.svg" alt="TerraDebt" width={180} height={28} priority />
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/programs/settlement">Settlement</Link>
          <Link href="/programs/restructure">Restructure</Link>
          <Link href="/contract-review">Contract Review</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link href="/get-started" className="bg-electric text-white px-4 py-2 rounded-md text-sm font-medium no-underline hover:no-underline">Get Started</Link>
      </div>
    </header>
  );
}
