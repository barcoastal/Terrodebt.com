import Link from "next/link";
import type { Reference } from "@/lib/editorial";

export function References({ items, furtherReading = false }: { items: Reference[]; furtherReading?: boolean }) {
  return (
    <aside className="mt-10 border-t border-hairline pt-8 max-w-3xl" aria-label={furtherReading ? "Primary sources and further reading" : "Sources"}>
      <h2 className="text-xl font-semibold text-ink">{furtherReading ? "Primary sources and further reading" : "Sources"}</h2>
      {furtherReading && <p className="mt-3 text-sm text-muted">These official resources provide background on the topic. State rules and program eligibility vary; the links do not establish a result for a particular contract or endorse BDI.</p>}
      <ul className="mt-4 space-y-3 list-disc pl-5">
        {items.map((item) => <li key={item.url}><a href={item.url} className="text-pine underline underline-offset-2">{item.label}</a></li>)}
      </ul>
      <p className="mt-5 text-sm text-muted">Published by Business Debt Insider, a trade name of GRL Recovery LLC. <Link href="/editorial-policy" className="text-pine underline">Editorial standards and corrections</Link>.</p>
    </aside>
  );
}
