import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[11px] font-mono uppercase tracking-wider text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="text-muted hover:text-electric no-underline transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden className="text-rule">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
