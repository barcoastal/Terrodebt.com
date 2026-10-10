import type { SourceInput } from "./visitor-source";

export const AI_PROVIDERS = ["ChatGPT", "Perplexity", "Microsoft Copilot", "Gemini", "Claude", "Grok"] as const;
export type AiProvider = (typeof AI_PROVIDERS)[number];
const DOMAINS: Record<string, AiProvider> = {
  "chatgpt.com": "ChatGPT", "chat.openai.com": "ChatGPT",
  "perplexity.ai": "Perplexity", "copilot.microsoft.com": "Microsoft Copilot",
  "gemini.google.com": "Gemini", "claude.ai": "Claude", "grok.com": "Grok",
};
const TAGS: Record<string, AiProvider> = {
  ...DOMAINS, chatgpt: "ChatGPT", perplexity: "Perplexity", copilot: "Microsoft Copilot",
  "microsoft copilot": "Microsoft Copilot", gemini: "Gemini", claude: "Claude", grok: "Grok",
};
export const AI_REFERRAL_DOMAINS = Object.keys(DOMAINS);
export const AI_SOURCE_TAGS = Object.keys(TAGS);

export function aiReferral(v: SourceInput): { provider: AiProvider; evidence: "utm" | "referrer" } | null {
  // Preserve explicit paid and affiliate attribution; an AI referrer is not proof of organic acquisition.
  if (v.gclid || v.fbclid || v.affiliateClickid || /^(cpc|ppc|paid.*|affiliate|display)$/i.test(v.utmMedium?.trim() || "")) return null;
  const tag = v.utmSource?.trim().toLowerCase().replace(/^www\./, "");
  if (tag && TAGS[tag]) return { provider: TAGS[tag], evidence: "utm" };
  // A different explicit campaign source takes precedence over a browser referrer.
  if (tag) return null;
  try {
    const url = new URL(v.referrer || "");
    if (!/^https?:$/.test(url.protocol)) return null;
    const host = url.hostname.toLowerCase().replace(/\.$/, "");
    for (const [domain, provider] of Object.entries(DOMAINS)) {
      if (host === domain || host.endsWith("." + domain)) return { provider, evidence: "referrer" };
    }
  } catch {}
  // Generic Google/Bing traffic cannot be separated into AI vs traditional search from referrer alone.
  return null;
}

export function isBotTraffic(v: { deviceType?: string | null; userAgent?: string | null }) {
  return v.deviceType === "bot" || /bot|crawl|spider|slurp|headless|ChatGPT-User|Claude-User|Perplexity-User/i.test(v.userAgent || "");
}

export type AiVisitor = SourceInput & { eliClickid: string; landingPath: string | null; firstSeen: Date; deviceType: string | null; userAgent: string | null };
export type AiLead = { eliClickid: string | null; createdAt: Date };
export type AiRow = { name: string; visitors: number; convertedVisitors: number; leads: number };

export function summarizeAiReferrals(visitors: AiVisitor[], leads: AiLead[], end: Date) {
  const sources = new Map<string, AiRow>();
  const pages = new Map<string, AiRow>();
  const leadDates = new Map<string, Date[]>();
  for (const lead of leads) if (lead.eliClickid && lead.createdAt <= end) {
    const dates = leadDates.get(lead.eliClickid) || [];
    dates.push(lead.createdAt); leadDates.set(lead.eliClickid, dates);
  }
  let count = 0, converted = 0, submissions = 0;
  const seen = new Set<string>();
  for (const visitor of visitors) {
    const match = aiReferral(visitor);
    if (!match || isBotTraffic(visitor) || seen.has(visitor.eliClickid) || visitor.firstSeen > end) continue;
    const rawPath = visitor.landingPath || "";
    const path = rawPath.startsWith("/") && !rawPath.startsWith("//") ? rawPath.split(/[?#]/)[0] : "Unknown";
    if (/^\/(admin|api)(\/|$)/.test(path)) continue;
    seen.add(visitor.eliClickid);
    const numLeads = (leadDates.get(visitor.eliClickid) || []).filter(date => date >= visitor.firstSeen).length;
    count++; converted += Number(numLeads > 0); submissions += numLeads;
    for (const [map, name] of [[sources, match.provider], [pages, path]] as const) {
      const row = map.get(name) || { name, visitors: 0, convertedVisitors: 0, leads: 0 };
      row.visitors++; row.convertedVisitors += Number(numLeads > 0); row.leads += numLeads; map.set(name, row);
    }
  }
  const sorted = (map: Map<string, AiRow>) => [...map.values()].sort((a,b) => b.visitors-a.visitors || a.name.localeCompare(b.name));
  return { visitors: count, convertedVisitors: converted, leads: submissions, sources: sorted(sources), pages: sorted(pages) };
}
