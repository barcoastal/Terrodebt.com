import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Missing GEMINI_API_KEY");
  process.exit(1);
}

const MODEL = "gemini-2.5-flash-image";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const OUT_DIR = path.resolve("public/images/articles");
await fs.mkdir(OUT_DIR, { recursive: true });

const STYLE = "Editorial photograph or close-up still-life. Slightly desaturated cool color grading. Natural daylight or soft directional light. Premium fintech editorial aesthetic. No text overlays, no watermarks, no logos, no charts. Composition leaves negative space for type overlay. 35mm or 50mm look.";

// Per-slug visual prompts. Each frames the article's idea visually without text.
const PROMPTS = {
  "what-is-reverse-consolidation":
    "A close-up of a single small tree being moved to a new pot that is the same size as the old one, on a clean wooden desk, soft morning light. Conceptual: rearranging without growing.",
  "mca-settlement-vs-restructure":
    "A clean overhead shot of two different coffee mugs side by side on a desk, with documents and a calculator nearby. Soft daylight from a window.",
  "how-to-read-your-mca-contract":
    "Close-up of a person's hands flipping through a multi-page legal contract on a wooden desk, reading glasses next to it, soft daylight, focused detail on the paper.",
  "effective-apr-explained":
    "A clean editorial still-life of a calculator next to a stack of small business loan documents, with a small chart printed on paper, on a slate-colored surface, soft cool lighting.",
  "coj-defense-basics":
    "A composed editorial shot of a courthouse door from the outside at dawn, classical pillars, soft cool light, subject framed off-center to leave space for type.",
  "when-to-pause-mca-debits":
    "Close-up of a smartphone showing a banking app on a quiet desk, with a coffee mug, the screen mostly out of focus to avoid text. Calm morning light.",
  "how-mca-debt-relief-actually-works":
    "An editorial shot of a small business owner at their workbench reviewing paperwork with a laptop, in a clean industrial workshop, late afternoon side light.",
  "signs-your-mca-relief-firm-is-a-scam":
    "A high-contrast editorial shot of a torn-up direct mail offer on a desk, partially crumpled, late afternoon light, no readable text.",
  "ucc-liens-and-account-freezes":
    "A close-up of a closed file folder labeled with a generic financial label on a desk, with a closed laptop and a stack of paperwork, slightly desaturated cool tones.",
  "how-to-handle-stacked-mcas":
    "An overhead editorial shot of multiple business documents stacked on top of each other on a clean desk with one finger pointing at the top one, daylight.",
  "should-you-consolidate-mcas":
    "A clean still-life of two paths splitting from a single point on a topographic map laid flat on a wooden desk, with a magnifying glass nearby.",
  "mca-restructure-timeline":
    "A clean still-life of a calendar planner open to a future month with handwritten ticks across multiple weeks, on a wooden desk, daylight.",
  "can-i-keep-operating-during-an-mca-program":
    "An editorial shot of a small bakery or cafe owner working behind their counter during morning service, candid, soft natural daylight from the front windows.",
  "how-attorneys-help-with-mca-debt":
    "A composed editorial shot of an attorney's wood-paneled office with a leather chair and a closed legal book on the desk, no people, soft directional light.",
  "negotiating-with-mca-lenders":
    "Close-up of two hands shaking across a wooden conference table with documents in the foreground, business attire, slightly out of focus background, soft daylight.",
  "preserving-business-credit-while-resolving-mca-debt":
    "A clean editorial still-life of a small green plant in a clay pot next to a clean ledger book on a desk, soft daylight, slightly cool tones.",
  "mca-pre-default-options":
    "A composed editorial shot of an open road at dusk leading toward a small town in the distance, slightly desaturated cool tones, no signage.",
  "what-happens-if-you-stop-paying-an-mca":
    "A composed editorial close-up of a closed mailbox at the curb of a small business, slight rain on the metal, slightly desaturated cool tones.",
  "choosing-an-mca-relief-partner":
    "A clean editorial overhead shot of multiple business cards spread on a desk with one pulled forward, slight depth-of-field, neutral tones.",
  "life-after-mca-debt":
    "An editorial shot of a small business owner standing at the door of their open shop at sunrise, looking out at the street, slightly desaturated warm tones.",
  "equipment-finance-when-to-restructure":
    "Close-up editorial shot of a piece of commercial equipment, like an industrial mixer or printing press, on a workshop floor, side lighting with dust particles visible in the beam, slightly desaturated cool tones.",
  "vendor-debt-negotiation-strategies":
    "An editorial overhead shot of a stack of plain invoice envelopes tied with simple twine on a wooden desk, soft daylight from a window, slightly cool tones, generous negative space at the top.",
  "bank-loan-covenant-violations":
    "A composed editorial shot of a closed leather-bound ledger book sitting on a polished wood desk in a bank office, soft directional light from a side window, neutral muted tones.",
  "irs-business-tax-debt-options":
    "An editorial close-up of a manila tax filing folder with tabbed year markers on a clean desk, a fountain pen and reading glasses nearby, soft daylight, cool muted tones.",
  "settle-mca-debt-without-bankruptcy":
    "Composed editorial photograph of a fork in a country road at dusk, one path leading toward a clear horizon and one curving away into trees, slightly desaturated cool tones, no signage.",
  "mca-settlement-letter-template":
    "An editorial close-up of a single sheet of formal letterhead paper with a fountain pen lying beside it on a wood desk, soft directional light from one side.",
  "coj-filed-against-me":
    "An editorial composed shot of an old courthouse hallway with classical columns and a single closed file folder on a wooden bench, soft cool daylight, narrow depth of field.",
  "stop-mca-daily-ach-debits":
    "Editorial close-up of a vintage wall clock with the second hand frozen mid-tick, mounted above a small business desk with a ledger underneath, soft cool light.",
  "stacked-mca-complete-guide":
    "An editorial overhead still-life of multiple folded business contracts stacked deep on a wooden desk, with one half open on top, slight depth of field, neutral cool tones.",
  "reverse-consolidation-unwind":
    "An editorial close-up of a tangled coil of rope being patiently untied on a wooden surface, one hand partially visible, soft daylight, neutral cool tones.",
  "business-debt-vs-bankruptcy":
    "A composed editorial shot of two heavy wooden doors side by side in an old institutional hallway, one slightly ajar and one firmly closed, soft directional light, cool tones.",
  "mca-settlement-lender-order":
    "Editorial overhead shot of wooden dominoes arranged in a deliberate cascading curve on a desk, the first one just beginning to tip, soft side lighting, desaturated cool tones.",
  "business-debt-resolution-timeline":
    "An editorial photograph of a long wooden ruler or planner laid horizontally across a desk with hand-drawn pencil marks for phases, soft window light, neutral muted tones.",
  "business-debt-vs-personal-credit":
    "A composed editorial still-life of a business document and a separate personal document side by side on a desk, separated by a thin sliver of empty wood, neutral tones, no visible text.",
  "loan-during-debt-workout":
    "Editorial composed shot of a hand reaching across a wooden conference table to hand over a small brass key on a keyring, business attire blurred in the background, soft daylight.",
  "how-many-mcas-too-many":
    "An overhead editorial shot of five identical glass jars on a wooden surface, each filled to a progressively higher level, slightly desaturated cool tones, soft natural daylight, negative space above.",
  "mca-settlement-success-rates":
    "An editorial still-life of a stack of closed manila folders with a single open one on top showing a simple printed line chart in profile (not legible), on a wood desk, soft daylight.",
  "mca-reconciliation-request-template":
    "An editorial close-up of a typed formal letter on textured letterhead paper partially out of frame, an unmarked wax seal stamp resting nearby, soft directional daylight.",
  "rebuild-business-credit-after-settlement":
    "An editorial shot of a small green sapling emerging from rich soil in a clean clay pot on a wood desk, soft morning side light, slightly cool tones, generous negative space.",
};

// Inline list of seed articles (slug + title). Keep in sync with lib/seed-data/articles.ts.
const ARTICLES = [
  { slug: "what-is-reverse-consolidation", title: "What is reverse consolidation, and why it usually backfires" },
  { slug: "mca-settlement-vs-restructure", title: "MCA settlement vs restructure: which is right for your business" },
  { slug: "how-to-read-your-mca-contract", title: "How to read your MCA contract: a line-by-line guide" },
  { slug: "effective-apr-explained", title: "Effective APR on MCAs explained (and why it is not what they tell you)" },
  { slug: "coj-defense-basics", title: "Confession of Judgment defense: what to do in the first 72 hours" },
  { slug: "when-to-pause-mca-debits", title: "When to pause MCA debits (and how reconciliation actually works)" },
  { slug: "how-mca-debt-relief-actually-works", title: "How MCA debt relief actually works, step by step" },
  { slug: "signs-your-mca-relief-firm-is-a-scam", title: "Signs your MCA relief firm is a scam" },
  { slug: "ucc-liens-and-account-freezes", title: "UCC liens and account freezes: what they mean and what to do" },
  { slug: "how-to-handle-stacked-mcas", title: "How to handle stacked MCAs without making it worse" },
  { slug: "should-you-consolidate-mcas", title: "Should you consolidate your MCAs? A real-world look" },
  { slug: "mca-restructure-timeline", title: "MCA restructure timeline: what to expect month by month" },
  { slug: "can-i-keep-operating-during-an-mca-program", title: "Can I keep operating during an MCA debt program?" },
  { slug: "how-attorneys-help-with-mca-debt", title: "How attorneys help with MCA debt (and when you actually need one)" },
  { slug: "negotiating-with-mca-lenders", title: "Negotiating with MCA lenders: what works and what does not" },
  { slug: "preserving-business-credit-while-resolving-mca-debt", title: "Preserving business credit while resolving MCA debt" },
  { slug: "mca-pre-default-options", title: "Pre-default options for stacked MCA debt" },
  { slug: "what-happens-if-you-stop-paying-an-mca", title: "What happens if you stop paying an MCA" },
  { slug: "choosing-an-mca-relief-partner", title: "How to choose an MCA relief partner: a buyer's checklist" },
  { slug: "life-after-mca-debt", title: "Life after MCA debt: what comes next" },
  { slug: "equipment-finance-when-to-restructure", title: "Equipment Finance: When to Restructure Before Repossession" },
  { slug: "vendor-debt-negotiation-strategies", title: "Vendor Debt: Negotiating Paydowns That Preserve Supply" },
  { slug: "bank-loan-covenant-violations", title: "Bank Loan Covenant Violations: What Happens Next" },
  { slug: "irs-business-tax-debt-options", title: "IRS Business Tax Debt: Installment Agreements vs Offer in Compromise" },
  { slug: "settle-mca-debt-without-bankruptcy", title: "How to Settle Merchant Cash Advance Debt Without Filing Bankruptcy" },
  { slug: "mca-settlement-letter-template", title: "MCA Settlement Letter: Exact Language That Gets Lenders to the Table" },
  { slug: "coj-filed-against-me", title: "Confession of Judgment Filed Against You: First 72 Hours" },
  { slug: "stop-mca-daily-ach-debits", title: "How to Stop Daily ACH Debits from Your Business Account" },
  { slug: "stacked-mca-complete-guide", title: "The Complete Guide to Resolving Stacked Merchant Cash Advances" },
  { slug: "reverse-consolidation-unwind", title: "How to Unwind a Reverse Consolidation You Shouldn't Have Signed" },
  { slug: "business-debt-vs-bankruptcy", title: "Business Debt Workout vs Bankruptcy: When Each One Wins" },
  { slug: "mca-settlement-lender-order", title: "Which MCA to Settle First: Sequencing That Actually Works" },
  { slug: "business-debt-resolution-timeline", title: "The Real Business Debt Resolution Timeline (Month by Month)" },
  { slug: "business-debt-vs-personal-credit", title: "How Business Debt Settlement Affects Your Personal Credit" },
  { slug: "loan-during-debt-workout", title: "Can You Get a Business Loan While in a Debt Workout?" },
  { slug: "how-many-mcas-too-many", title: "How Many MCAs Is Too Many? A Decision Framework" },
  { slug: "mca-settlement-success-rates", title: "MCA Settlement Success Rates: What Actually Closes" },
  { slug: "mca-reconciliation-request-template", title: "MCA Reconciliation Request: Exact Language That Gets Results" },
  { slug: "rebuild-business-credit-after-settlement", title: "Rebuilding Business Credit After MCA Settlement" },
];

const SKIP_EXISTING = process.env.SKIP_EXISTING === "1";

async function generateOne(slug, title) {
  if (SKIP_EXISTING) {
    try {
      await fs.access(path.join(OUT_DIR, `${slug}.png`));
      console.log(`SKIP ${slug} (already exists)`);
      return { skipped: true };
    } catch {}
  }
  const visual = PROMPTS[slug] ?? `An editorial photograph related to small business cash flow and finance, conceptually inspired by the article title "${title}".`;
  const prompt = `${visual} ${STYLE}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "16:9" } },
  };
  const res = await fetch(URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HTTP ${res.status}: ${err.slice(0, 300)}`);
  }
  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p?.inlineData?.data);
  if (!imagePart) throw new Error("No inline image data");
  const buffer = Buffer.from(imagePart.inlineData.data, "base64");
  const filename = `${slug}.png`;
  await fs.writeFile(path.join(OUT_DIR, filename), buffer);
  console.log(`OK ${filename} (${buffer.length} bytes)`);
  return { skipped: false };
}

let success = 0;
let failed = 0;
let skipped = 0;
for (const a of ARTICLES) {
  try {
    const result = await generateOne(a.slug, a.title);
    if (result?.skipped) skipped += 1;
    else success += 1;
  } catch (e) {
    console.error(`FAIL ${a.slug}: ${e.message}`);
    failed += 1;
  }
  await new Promise((r) => setTimeout(r, 800));
}
console.log(`\nDone: ${success} succeeded, ${skipped} skipped, ${failed} failed.`);
