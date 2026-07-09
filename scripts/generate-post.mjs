// Generate and publish a branded BDI social post (FB Page + Instagram).
//
// Pipeline: pick an unposted insight article -> Gemini writes card copy + captions
// -> render card via headless Chrome -> public/social/<slug>.jpg -> git push (Railway
// deploys, making the image URL public for IG) -> publish via Graph API.
//
// Usage:
//   node scripts/generate-post.mjs            # full run: generate, deploy, publish
//   node scripts/generate-post.mjs --dry-run  # generate + render only, no deploy/post
//
// State: scripts/social-posted.json tracks which article slugs were already used.

import fs from "node:fs";
import { execSync } from "node:child_process";

const ROOT = new URL("..", import.meta.url).pathname;
const env = Object.fromEntries(
  fs.readFileSync(ROOT + ".env", "utf8").split("\n").filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).replace(/^"|"$/g, "")])
);
const DRY = process.argv.includes("--dry-run");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SITE = "https://businessdebtinsider.com";
const STATE_FILE = ROOT + "scripts/social-posted.json";

// 1. Pick an article that hasn't been posted yet
const state = fs.existsSync(STATE_FILE) ? JSON.parse(fs.readFileSync(STATE_FILE, "utf8")) : { posted: [] };
const sitemap = await fetch(SITE + "/sitemap.xml").then((r) => r.text());
const slugs = [...sitemap.matchAll(/<loc>[^<]*\/insights\/([^<]+)<\/loc>/g)].map((m) => m[1]);
const candidates = slugs.filter((s) => !state.posted.includes(s));
if (!candidates.length) {
  console.log("All articles have been posted about. Clear scripts/social-posted.json to recycle.");
  process.exit(0);
}
const slug = candidates[Math.floor(Math.random() * candidates.length)];
const articleUrl = `${SITE}/insights/${slug}`;
const articleHtml = await fetch(articleUrl).then((r) => r.text());
const articleText = articleHtml
  .replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "")
  .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 6000);
console.log("Article:", slug);

// 2. Gemini writes the copy
const prompt = `You write social content for Business Debt Insider, a strategic consulting practice for small businesses drowning in MCA and short-term debt. Voice: calm, direct, plain language, insider expertise. Hard rules: NEVER use em dashes or long dashes anywhere. No emojis. No hype words.

Based on this article, produce JSON with exactly these keys:
- kicker: 2-4 word all-caps label for a social card (e.g. "MCA REALITY CHECK")
- headline: one punchy sentence for the card, max 90 characters, ending with a period
- emphasis: the last 1-3 words of the headline (they get highlighted in green)
- style: "dark" or "light" (pick what fits the mood)
- caption: 2-3 sentence Facebook caption in plain language, ends with "Full guide at businessdebtinsider.com"
- hashtags: 4-6 hashtags for Instagram as a single space-separated string

Article URL: ${articleUrl}
Article content: ${articleText}`;

let copy;
for (let attempt = 1; attempt <= 3; attempt++) {
  const gemini = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", {
    method: "POST",
    headers: { "x-goog-api-key": env.GEMINI_API_KEY, "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    }),
  }).then((r) => r.json());
  const raw = gemini.candidates?.[0]?.content?.parts?.[0]?.text;
  if (raw) {
    try { copy = JSON.parse(raw); break; }
    catch { console.error(`Gemini attempt ${attempt}: invalid JSON:`, raw.slice(0, 200)); }
  } else {
    console.error(`Gemini attempt ${attempt} failed:`, JSON.stringify(gemini).slice(0, 300));
  }
  if (attempt === 3) throw new Error("Gemini gave no usable response after 3 attempts");
  await new Promise((r) => setTimeout(r, 5000));
}
// enforce the no-dash rule regardless of what the model did
for (const k of Object.keys(copy)) if (typeof copy[k] === "string") copy[k] = copy[k].replace(/—|–/g, ",");
console.log("Copy:", JSON.stringify(copy, null, 2));

// 3. Render the card
const dark = copy.style !== "light";
const headline = copy.headline.replace(
  new RegExp(copy.emphasis.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\.?\\s*$"),
  `<span class="em">${copy.emphasis.replace(/\.$/, "")}.</span>`
);
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{margin:0;font-family:'Inter Tight',sans-serif}
.card{width:1080px;height:1080px;background:${dark ? "#0A0A0A" : "#FFFFFF"};color:${dark ? "#fff" : "#0A0A0A"};display:flex;flex-direction:column;justify-content:space-between;padding:90px;${dark ? "" : "border:1px solid #E5E5E5;"}}
.kicker{font-size:34px;font-weight:500;letter-spacing:10px;color:${dark ? "rgba(255,255,255,0.55)" : "#6B6B6B"}}
.rule{width:140px;height:8px;background:${dark ? "#10B981" : "#064E3B"};margin-top:36px}
.big{font-size:88px;font-weight:700;line-height:1.12;letter-spacing:-1px}
.big .em{color:${dark ? "#10B981" : "#064E3B"}}
.foot{display:flex;justify-content:space-between;align-items:flex-end}
.brand{font-size:30px;font-weight:600;letter-spacing:3px}
.brand .thin{font-weight:400;color:${dark ? "rgba(255,255,255,0.55)" : "#6B6B6B"}}
.site{font-size:26px;color:${dark ? "rgba(255,255,255,0.55)" : "#6B6B6B"};font-weight:400}
</style></head><body><div class="card">
<div><div class="kicker">${copy.kicker}</div><div class="rule"></div></div>
<div class="big">${headline}</div>
<div class="foot"><div class="brand">BD<span class="thin">I</span></div><div class="site">businessdebtinsider.com</div></div>
</div></body></html>`;

const tmpHtml = `/tmp/bdi-card-${slug}.html`;
fs.writeFileSync(tmpHtml, html);
const png = `/tmp/bdi-card-${slug}.png`;
execSync(`"${CHROME}" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1080,1080 --virtual-time-budget=8000 --screenshot="${png}" "file://${tmpHtml}"`, { stdio: "pipe" });
const jpg = ROOT + `public/social/${slug}.jpg`;
execSync(`sips -s format jpeg -s formatOptions 92 "${png}" --out "${jpg}"`, { stdio: "pipe" });
console.log("Card rendered:", jpg);

if (DRY) {
  console.log("Dry run: open", jpg, "to review. Not deployed, not posted.");
  process.exit(0);
}

// 4. Deploy the image (push to main -> Railway)
execSync(`git -C "${ROOT}" add public/social/${slug}.jpg && git -C "${ROOT}" commit -m "Social card: ${slug}" -m "Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git -C "${ROOT}" push origin main`, { stdio: "pipe" });
const imageUrl = `${SITE}/social/${slug}.jpg`;
process.stdout.write("Waiting for deploy");
for (let i = 0; i < 40; i++) {
  const code = await fetch(imageUrl, { method: "HEAD" }).then((r) => r.status).catch(() => 0);
  if (code === 200) break;
  if (i === 39) throw new Error("Image never went live: " + imageUrl);
  process.stdout.write(".");
  await new Promise((r) => setTimeout(r, 15000));
}
console.log(" live:", imageUrl);

// 5. Publish
const fbCaption = copy.caption;
const igCaption = copy.caption + "\n\n" + copy.hashtags;
const G = "https://graph.facebook.com/v25.0";
const call = async (path, params) => {
  for (let attempt = 1; ; attempt++) {
    try {
      const d = await fetch(`${G}${path}`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ ...params, access_token: env.FB_PAGE_TOKEN }) }).then((r) => r.json());
      if (d.error) throw new Error(path + ": " + d.error.message);
      return d;
    } catch (e) {
      if (attempt >= 4 || !/fetch failed|ETIMEDOUT|ECONNRESET|EHOSTUNREACH/.test(String(e.cause ?? e))) throw e;
      console.error(`Graph call ${path} network failure (attempt ${attempt}), retrying in 20s`);
      await new Promise((r) => setTimeout(r, 20000));
    }
  }
};
const fb = await call(`/${env.FB_PAGE_ID}/photos`, { url: imageUrl, caption: fbCaption });
console.log("FB post:", fb.post_id || fb.id);
const container = await call(`/${env.IG_USER_ID}/media`, { image_url: imageUrl, caption: igCaption });
for (let i = 0; i < 10; i++) {
  const s = await fetch(`${G}/${container.id}?fields=status_code&access_token=${env.FB_PAGE_TOKEN}`).then((r) => r.json());
  if (s.status_code === "FINISHED") break;
  if (s.status_code === "ERROR") throw new Error("IG container failed");
  await new Promise((r) => setTimeout(r, 3000));
}
const ig = await call(`/${env.IG_USER_ID}/media_publish`, { creation_id: container.id });
console.log("IG post:", ig.id);

// 6. Log to the admin calendar (best effort)
try {
  const igInfo = await fetch(`${G}/${ig.id}?fields=permalink&access_token=${env.FB_PAGE_TOKEN}`).then((r) => r.json());
  await fetch(`${SITE}/api/social/log`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-social-secret": env.SOCIAL_LOG_SECRET },
    body: JSON.stringify({
      slug, type: "image", caption: igCaption, mediaUrl: imageUrl,
      fbPostId: fb.post_id || fb.id, igMediaId: ig.id, igPermalink: igInfo.permalink ?? null,
    }),
  });
  console.log("Logged to admin calendar");
} catch (e) {
  console.error("Calendar log failed (post still published):", e.message);
}

// 7. Record state
state.posted.push(slug);
fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
execSync(`git -C "${ROOT}" add scripts/social-posted.json && git -C "${ROOT}" commit -m "Mark ${slug} as posted" -m "Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git -C "${ROOT}" push origin main`, { stdio: "pipe" });
console.log("Done. Posted about:", slug);
