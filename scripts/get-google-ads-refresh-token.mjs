// One-shot helper to generate a Google Ads API refresh token.
//
// Usage:
//   GOOGLE_ADS_CLIENT_ID=... GOOGLE_ADS_CLIENT_SECRET=... node scripts/get-google-ads-refresh-token.mjs
//
// Prereqs:
//   1. Google Cloud Console -> APIs & Services -> Credentials
//   2. Create OAuth 2.0 Client ID, type "Web application"
//   3. Add http://localhost:8080 as an authorized redirect URI
//   4. Copy client ID + client secret into the env vars above
//
// The script opens a browser tab, you sign in with the Google account that owns
// (or manages) the Google Ads account you want to send conversions to, then it
// prints the refresh token to paste into Railway as GOOGLE_ADS_REFRESH_TOKEN.

import http from "node:http";
import { URL } from "node:url";
import { exec } from "node:child_process";

const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET;
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set GOOGLE_ADS_CLIENT_ID and GOOGLE_ADS_CLIENT_SECRET before running.");
  process.exit(1);
}

const REDIRECT = "http://localhost:8080";
const SCOPE = "https://www.googleapis.com/auth/adwords";

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id", CLIENT_ID);
authUrl.searchParams.set("redirect_uri", REDIRECT);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", SCOPE);
authUrl.searchParams.set("access_type", "offline");
authUrl.searchParams.set("prompt", "consent");

console.log("\nOpening this URL in your browser:\n");
console.log(authUrl.toString());
console.log("\nIf the browser does not open automatically, copy and paste the link.\n");

const opener =
  process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
exec(`${opener} "${authUrl.toString()}"`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", REDIRECT);
  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(400, { "content-type": "text/plain" });
    res.end("Missing authorization code.");
    return;
  }

  res.writeHead(200, { "content-type": "text/html" });
  res.end("<html><body style='font:16px system-ui;padding:32px'><h2>Authorized.</h2><p>You can close this tab. Check the terminal for your refresh token.</p></body></html>");

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT,
        grant_type: "authorization_code",
      }),
    });
    const json = await tokenRes.json();
    if (!tokenRes.ok || !json.refresh_token) {
      console.error("\nToken exchange failed:", json);
      process.exit(1);
    }
    console.log("\n=========== SUCCESS ===========\n");
    console.log("Refresh token (paste into Railway as GOOGLE_ADS_REFRESH_TOKEN):");
    console.log("\n  " + json.refresh_token + "\n");
    console.log("Also note:");
    console.log("  access_token: " + json.access_token);
    console.log("  expires_in:   " + json.expires_in);
    console.log("  scope:        " + json.scope);
    console.log("\nDone. Press Ctrl-C to exit.\n");
  } catch (e) {
    console.error("\nFailed to exchange code for token:", e);
    process.exit(1);
  }
});

server.listen(8080, () => {
  console.log("Waiting for OAuth callback on " + REDIRECT + " ...");
});
