// Usage: node --import tsx scripts/submit-indexnow.ts /lenders /lenders/fundo [--submit]
import { indexNowPayload } from "../lib/indexnow";
async function main() {
  const paths = process.argv.slice(2).filter(arg => arg !== "--submit");
  if (!paths.length) throw new Error("Provide the changed public paths");
  const payload = indexNowPayload(paths);
  if (!process.argv.includes("--submit")) { console.log(JSON.stringify({ mode: "dry-run", urls: payload.urlList }, null, 2)); return; }
  const keyResponse = await fetch(payload.keyLocation, { signal: AbortSignal.timeout(15000) });
  if (!keyResponse.ok || (await keyResponse.text()).trim() !== payload.key) throw new Error("Deploy the ownership file before submitting URLs");
  const response = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000) });
  console.log(JSON.stringify({ status: response.status, received: [200,202].includes(response.status), count: payload.urlList.length, urls: payload.urlList, note: "Receipt does not establish indexing." }, null, 2));
  if (![200,202].includes(response.status)) process.exitCode = 1;
}
main().catch(error => { console.error(error.message); process.exitCode=1; });
