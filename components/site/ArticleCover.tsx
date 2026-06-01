import type { CSSProperties, ReactNode } from "react";

const COMMON_SVG = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function DebtReliefIcon() {
  return (
    <svg {...COMMON_SVG}>
      <line x1="3" y1="6" x2="21" y2="6" strokeDasharray="2 2" opacity="0.5" />
      <line x1="3" y1="11" x2="21" y2="11" opacity="0.75" />
      <line x1="3" y1="16" x2="15" y2="16" />
      <path d="M18 19l-3 3-3-3" />
    </svg>
  );
}

function EquipmentIcon() {
  return (
    <svg {...COMMON_SVG}>
      <rect x="3" y="6" width="14" height="9" />
      <line x1="17" y1="9" x2="21" y2="9" />
      <line x1="17" y1="12" x2="21" y2="12" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="15" cy="18" r="2" />
    </svg>
  );
}

function VendorIcon() {
  return (
    <svg {...COMMON_SVG}>
      <rect x="3" y="6" width="6" height="6" />
      <rect x="15" y="12" width="6" height="6" />
      <path d="M9 9h6" />
      <path d="M15 15l-6-6" opacity="0.5" />
      <path d="M13 9l2-3" />
      <path d="M11 15l-2 3" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg {...COMMON_SVG}>
      <polygon points="12,3 21,8 3,8" />
      <line x1="5" y1="10" x2="5" y2="18" />
      <line x1="9.5" y1="10" x2="9.5" y2="18" />
      <line x1="14.5" y1="10" x2="14.5" y2="18" />
      <line x1="19" y1="10" x2="19" y2="18" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </svg>
  );
}

function TaxIcon() {
  return (
    <svg {...COMMON_SVG}>
      <rect x="5" y="3" width="14" height="18" />
      <circle cx="9" cy="9" r="1.5" />
      <circle cx="15" cy="15" r="1.5" />
      <line x1="15" y1="9" x2="9" y2="15" />
    </svg>
  );
}

function GuideIcon() {
  return (
    <svg {...COMMON_SVG}>
      <polygon points="12,3 21,8 21,16 12,21 3,16 3,8" />
      <line x1="12" y1="3" x2="12" y2="21" opacity="0.4" />
      <line x1="3" y1="8" x2="21" y2="16" opacity="0.4" />
    </svg>
  );
}

function topicIcon(topic: string): ReactNode {
  switch (topic) {
    case "Debt Relief":
    case "MCA":
      return <DebtReliefIcon />;
    case "Equipment":
      return <EquipmentIcon />;
    case "Vendor & Supplier":
    case "Vendor":
      return <VendorIcon />;
    case "Bank Loan Workouts":
    case "Bank":
      return <BankIcon />;
    case "Business Tax":
    case "Tax":
      return <TaxIcon />;
    default:
      return <GuideIcon />;
  }
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
  const stamp = date ? date.toISOString().slice(0, 10) : "";

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

      {/* Top strip */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em]">
        <span className="opacity-90">Business Debt Insider</span>
        <span className="opacity-70">{stamp}</span>
      </div>

      {/* Centered title block */}
      <div className="absolute inset-0 flex items-center px-6 md:px-10">
        <div className="max-w-[85%]">
          <div className="flex items-center gap-3 text-paper/85">
            <span className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 border border-white/30">
              {topicIcon(topic)}
            </span>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em]">
              {topic}
            </span>
          </div>
          <h3 className={`mt-3 font-bold tracking-tight text-paper ${titleSize}`}>
            {title}
          </h3>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">
        <span>Inside the workout</span>
        <span className="text-paper/70">bdi · guide</span>
      </div>
    </div>
  );
}
