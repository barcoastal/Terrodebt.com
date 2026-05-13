"use client";
import { useEffect, useState } from "react";

export type TocItem = { id: string; text: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function extractToc(md: string): TocItem[] {
  const lines = md.split("\n");
  const items: TocItem[] = [];
  for (const line of lines) {
    const m = /^##\s+(.+)$/.exec(line.trim());
    if (m) {
      const text = m[1].replace(/^\*\*|\*\*$/g, "").trim();
      items.push({ id: slugify(text), text });
    }
  }
  return items;
}

export function Toc({ items, label = "In this guide" }: { items: TocItem[]; label?: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
            break;
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="text-sm">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{label}</p>
      <ul className="mt-3 space-y-2 border-l border-rule">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={`block pl-3 -ml-px border-l no-underline leading-snug transition ${
                active === it.id
                  ? "border-electric text-electric"
                  : "border-transparent text-slate hover:text-electric"
              }`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
