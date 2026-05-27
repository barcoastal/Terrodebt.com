# Google Ads conversion uploads — setup

Six environment variables. Set them in Railway → terradebt service → Variables.

## 1. `GOOGLE_ADS_DEVELOPER_TOKEN`

1. Go to https://ads.google.com/
2. **Tools** (top right) → **API Center**
3. If you don't have a token, click **Apply for token**. Basic access is instant for individual advertisers and gives you enough quota for conversion uploads.
4. Copy the token string. Looks like `aB1c2D3e4F5g6H7i8J9k0LM`.

## 2. `GOOGLE_ADS_CUSTOMER_ID`

The Google Ads account you want conversions to land in.

- Top-right of any Google Ads page shows the account ID like `123-456-7890`.
- Strip the dashes: `1234567890` (10 digits).

## 3. `GOOGLE_ADS_LOGIN_CUSTOMER_ID`

- If you access the account through an MCC (manager account), this is the **MCC's** ID, 10 digits without dashes.
- If the Ads account is standalone (no manager), set this to the same value as `GOOGLE_ADS_CUSTOMER_ID`.

## 4. `GOOGLE_ADS_CONVERSION_ACTION_ID`

The default conversion action that fires on every form submit.

1. In Google Ads → **Tools** → **Conversions**.
2. Create a new conversion: **Website** → **Submit lead form** category. Name it something like `BDI — Lead submitted`. Set "Count" to **One** per click. Conversion window: 30–90 days.
3. After it's created, open the action. The URL ends with `/conversions/{ID}`. That number is your `GOOGLE_ADS_CONVERSION_ACTION_ID`.
4. **Important:** in the action settings, the **Source** must be set to **Import** (manual uploads) for API-based conversions to be accepted.

Optionally repeat for funnel stages — create separate conversion actions for `Qualified`, `Signed`, `Won`. Each one has its own ID; paste it into the admin's "Fire conversion" form to trigger that specific stage.

## 5. `GOOGLE_ADS_CLIENT_ID` and `GOOGLE_ADS_CLIENT_SECRET`

1. Go to https://console.cloud.google.com/
2. Create a new project named something like `bdi-google-ads` (or pick one you've created for this brand — per project policy, don't reuse another brand's OAuth client).
3. **APIs & Services** → **Library** → search "Google Ads API" → **Enable**.
4. **APIs & Services** → **Credentials** → **Create credentials** → **OAuth client ID**.
5. If prompted, configure the OAuth consent screen first:
   - User type: **External**
   - App name: `Business Debt Insider`
   - User support email: your email
   - Developer email: same
   - Scopes: skip (add later)
   - Test users: add your own Google account email
   - Publishing status: leave in Testing
6. Back at credentials, **OAuth client ID** → Application type: **Web application**.
7. Authorized redirect URI: `http://localhost:8080`
8. Click Create. Copy the **Client ID** and **Client secret**.

## 6. `GOOGLE_ADS_REFRESH_TOKEN`

Run the one-shot helper to generate this:

```bash
cd ~/terradebt
GOOGLE_ADS_CLIENT_ID=... GOOGLE_ADS_CLIENT_SECRET=... node scripts/get-google-ads-refresh-token.mjs
```

A browser tab opens. Sign in with the Google account that owns or manages the Ads account from step 2. Approve the scope. The terminal prints the refresh token. Paste it into Railway.

## Verify

1. After all 6 env vars are set in Railway, redeploy (it will pick them up).
2. Go to `/admin/leads` and open a lead that has a non-empty `gclid`.
3. Click **Fire conversion** in the **Send event to Google Ads** panel.
4. The history table below shows `✓ sent` on success, or the exact error message on failure (most common: developer token not approved, customer ID mismatch, conversion action source not set to "Import").
