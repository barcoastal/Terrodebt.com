// One-off: validate that our Google Ads credentials authenticate.
// Calls listAccessibleCustomers via SDK — if it returns the BDI customer, we're good.

import { GoogleAdsApi } from "google-ads-api";

const c = {
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
};
const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;
const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;

const missing = Object.entries({ ...c, customerId, refreshToken, loginCustomerId }).filter(([, v]) => !v).map(([k]) => k);
if (missing.length) {
  console.error("Missing env:", missing.join(", "));
  process.exit(1);
}

const client = new GoogleAdsApi(c);
try {
  const customer = client.Customer({ customer_id: customerId, refresh_token: refreshToken, login_customer_id: loginCustomerId });
  const rows = await customer.query("SELECT customer.id, customer.descriptive_name FROM customer LIMIT 1");
  console.log("SUCCESS — credentials work. Customer query returned:", JSON.stringify(rows, null, 2));

  // Also list conversion actions to verify our action ID exists
  const actions = await customer.query("SELECT conversion_action.id, conversion_action.name, conversion_action.type FROM conversion_action");
  console.log("\nConversion actions in account:");
  for (const r of actions) {
    console.log(`  ${r.conversion_action.id}  ${r.conversion_action.name}  (${r.conversion_action.type})`);
  }
} catch (e) {
  console.error("FAILED:", e.message ?? e);
  if (e.errors) console.error(JSON.stringify(e.errors, null, 2));
  process.exit(2);
}
