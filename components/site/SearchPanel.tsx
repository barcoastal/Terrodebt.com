"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type SearchItem = {
  type: "article" | "topic" | "industry" | "glossary" | "tool";
  title: string;
  slug: string;
  excerpt?: string;
};

export function SearchPanel() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || loaded) return;
    let cancelled = false;
    fetch("/api/search-index")
      .then((r) => r.json())
      .then((j: { items?: SearchItem[] }) => {
        if (cancelled) return;
        setItems(j.items ?? []);
        setLoaded(true);
      })
      .catch(() => {
        if (cancelled) return;
        setItems([]);
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [open, loaded]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const results = useMemo(() => {
    if (!items) return [];
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items
      .filter((i) =>
        i.title.toLowerCase().includes(q) ||
        (i.excerpt?.toLowerCase().includes(q) ?? false)
      )
      .slice(0, 24);
  }, [items, query]);

  return (
    <div ref={panelRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Search"
        className="flex items-center gap-2 border border-rule bg-white px-3 py-2 text-xs text-muted hover:border-slate hover:text-slate transition"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="hidden sm:inline font-mono uppercase tracking-wider">Search</span>
      </button>
      {open && (
        <div className="fixed left-1/2 top-20 z-50 w-[min(640px,90vw)] -translate-x-1/2 border border-rule bg-white shadow-lg">
          <div className="border-b border-rule p-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search topics, guides, glossary, industries..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-slate outline-none placeholder:text-muted"
            />
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {!loaded && (
              <div className="p-6 text-xs font-mono uppercase tracking-wider text-muted">
                Loading...
              </div>
            )}
            {loaded && results.length === 0 && (
              <div className="p-6 text-xs font-mono uppercase tracking-wider text-muted">
                No matches.
              </div>
            )}
            {loaded && results.length > 0 && (
              <ul className="divide-y divide-rule">
                {results.map((r, i) => (
                  <li key={`${r.type}-${r.slug}-${i}`}>
                    <Link
                      href={r.slug}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 no-underline transition hover:bg-offwhite"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-electric w-20 shrink-0">
                          {r.type}
                        </span>
                        <span className="text-sm font-medium text-slate">{r.title}</span>
                      </div>
                      {r.excerpt && (
                        <p className="ml-[5.75rem] mt-1 text-xs text-muted line-clamp-1">{r.excerpt}</p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-rule px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-muted">
            Press esc to close
          </div>
        </div>
      )}
    </div>
  );
}
