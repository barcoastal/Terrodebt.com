// One-time OAuth flow to get a Google Search Console refresh token for BDI.
// Usage: GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... node scripts/gsc-auth.mjs
// Opens a local server on :8585, prints the consent URL, waits for the redirect,
// exchanges the code, and appends GSC_* vars to .env.

import http from "node:http";
import fs from "node:fs";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:8585/";
const SCOPE = "https://www.googleapis.com/auth/webmasters email";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET env vars");
  process.exit(1);
}

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    prompt: "consent",
  });

console.log("\nOpen this URL in a browser and sign in as barelezra10@gmail.com:\n");
console.log(authUrl + "\n");

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(404).end();
    return;
  }
  try {
    const r = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });
    const tok = await r.json();
    if (!tok.refresh_token) throw new Error("No refresh_token in response: " + JSON.stringify(tok));

    const ui = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { authorization: "Bearer " + tok.access_token },
    }).then((x) => x.json());
    console.log("SIGNED IN AS:", ui.email || JSON.stringify(ui));

    const envPath = new URL("../.env", import.meta.url).pathname;
    let env = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
    env = env.replace(/\n?# GSC \(Search Console\)[\s\S]*?GSC_REFRESH_TOKEN=[^\n]*\n?/g, "");
    env +=
      `\n# GSC (Search Console) - barelezra10@gmail.com, property https://businessdebtinsider.com/\n` +
      `GSC_CLIENT_ID=${CLIENT_ID}\nGSC_CLIENT_SECRET=${CLIENT_SECRET}\nGSC_REFRESH_TOKEN=${tok.refresh_token}\n`;
    fs.writeFileSync(envPath, env);

    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h2>Done. Token saved to terradebt/.env - you can close this tab.</h2>");
    console.log("SUCCESS: refresh token saved to .env");
    setTimeout(() => process.exit(0), 500);
  } catch (e) {
    res.writeHead(500).end("Token exchange failed");
    console.error("FAILED:", e.message);
    setTimeout(() => process.exit(1), 500);
  }
});

server.listen(8585, () => console.log("Waiting for OAuth redirect on http://localhost:8585 ..."));
setTimeout(() => {
  console.error("Timed out after 10 minutes.");
  process.exit(1);
}, 600_000);
