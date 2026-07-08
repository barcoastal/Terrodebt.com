// Pull Search Console performance for businessdebtinsider.com.
// Usage: node scripts/gsc-report.mjs [days=30]
// Reads GSC_CLIENT_ID / GSC_CLIENT_SECRET / GSC_REFRESH_TOKEN from .env.

import fs from "node:fs";

const env = Object.fromEntries(
  fs
    .readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).replace(/^"|"$/g, "")])
);

const SITE = encodeURIComponent("https://businessdebtinsider.com/");
const days = Number(process.argv[2] || 30);
const d = (n) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);

const tok = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: env.GSC_CLIENT_ID,
    client_secret: env.GSC_CLIENT_SECRET,
    refresh_token: env.GSC_REFRESH_TOKEN,
    grant_type: "refresh_token",
  }),
}).then((r) => r.json());
if (!tok.access_token) throw new Error("Token refresh failed: " + JSON.stringify(tok));

const query = (body) =>
  fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${SITE}/searchAnalytics/query`, {
    method: "POST",
    headers: { authorization: "Bearer " + tok.access_token, "content-type": "application/json" },
    body: JSON.stringify({ startDate: d(days), endDate: d(1), ...body }),
  }).then((r) => r.json());

const [totals, queries, pages] = await Promise.all([
  query({ dimensions: ["date"], rowLimit: 500 }),
  query({ dimensions: ["query"], rowLimit: 50, orderBy: [{ field: "impressions", descending: true }] }),
  query({ dimensions: ["page"], rowLimit: 50, orderBy: [{ field: "impressions", descending: true }] }),
]);

let c = 0, i = 0;
(totals.rows || []).forEach((r) => ((c += r.clicks), (i += r.impressions)));
console.log(`=== ${d(days)} → ${d(1)} | clicks=${c} impressions=${i} ===`);

console.log("\n=== TOP QUERIES ===");
(queries.rows || []).forEach((r) =>
  console.log(`${String(r.impressions).padStart(6)} impr | ${String(r.clicks).padStart(3)} clk | pos ${r.position.toFixed(1).padStart(5)} | ${r.keys[0]}`)
);

console.log("\n=== TOP PAGES ===");
(pages.rows || []).forEach((r) =>
  console.log(`${String(r.impressions).padStart(6)} impr | ${String(r.clicks).padStart(3)} clk | ${r.keys[0].replace("https://businessdebtinsider.com", "")}`)
);
