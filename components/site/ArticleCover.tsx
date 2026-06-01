import type { CSSProperties } from "react";

const TOPIC_GLYPHS: Record<string, string> = {
  "Debt Relief": "◐",
  "MCA": "◐",
  "Equipment": "▣",
  "Vendor & Supplier": "◇",
  "Vendor": "◇",
  "Bank Loan Workouts": "▤",
  "Bank": "▤",
  "Business Tax": "✦",
  "Tax": "✦",
  "Insight": "◆",
  "Guide": "◆",
};

function readingDuration(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function ArticleCover({
  title,
  topic,
  date,
  className,
  size = "default",
}: {
  title: string;
  topic: string;
  date?: Date | null;
  className?: string;
  size?: "default" | "small";
}) {
  const glyph = TOPIC_GLYPHS[topic] ?? "◆";
  const stamp = date ? readingDuration(date) : "";

  const titleSize =
    size === "small"
      ? "text-base md:text-lg leading-snug"
      : "text-2xl md:text-3xl lg:text-4xl leading-[1.1]";

  return (
    <div
      className={`relative w-full aspect-[16/9] overflow-hidden bg-pine text-paper ${className ?? ""}`}
      style={
        {
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.10) 100%)",
        } as CSSProperties
      }
    >
      {/* Hairline grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 border border-white/15" />
        <div className="absolute inset-4 border border-white/10" />
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/10" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
      </div>

      {/* Top-left topic kicker */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em]">
        <span className="opacity-90">Business Debt Insider</span>
        <span className="opacity-70">{stamp}</span>
      </div>

      {/* Centered title block */}
      <div className="absolute inset-0 flex items-center px-6 md:px-10">
        <div className="max-w-[85%]">
          <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-paper/80">
            <span className="mr-3">{glyph}</span>
            {topic}
          </div>
          <h3 className={`mt-3 font-bold tracking-tight text-paper ${titleSize}`}>
            {title}
          </h3>
        </div>
      </div>

      {/* Bottom-right wordmark accent */}
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">
        <span>Inside the workout</span>
        <span className="text-paper/70">bdi · guide</span>
      </div>
    </div>
  );
}
