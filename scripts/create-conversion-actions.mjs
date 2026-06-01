// Create the missing BDI conversion actions via Google Ads API:
//   - Opportunity (offline upload, no value)
//   - Closed Won  (offline upload, value from upload)

import { GoogleAdsApi, enums } from "google-ads-api";

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});

const customer = client.Customer({
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
  login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
});

const toCreate = [
  {
    name: "Opportunity",
    category: enums.ConversionActionCategory.LEAD,
    counting_type: enums.ConversionActionCountingType.ONE_PER_CLICK,
    value_settings: { default_value: 0, always_use_default_value: true },
  },
  {
    name: "Closed Won",
    category: enums.ConversionActionCategory.PURCHASE,
    counting_type: enums.ConversionActionCountingType.ONE_PER_CLICK,
    value_settings: { default_value: 0, always_use_default_value: false },
  },
];

for (const def of toCreate) {
  const op = {
    create: {
      name: def.name,
      type: enums.ConversionActionType.UPLOAD_CLICKS,
      category: def.category,
      status: enums.ConversionActionStatus.ENABLED,
      counting_type: def.counting_type,
      click_through_lookback_window_days: 30,
      value_settings: {
        default_value: def.value_settings.default_value,
        default_currency_code: "USD",
        always_use_default_value: def.value_settings.always_use_default_value,
      },
    },
  };
  try {
    const result = await customer.conversionActions.create([op.create]);
    const resource = result.results?.[0]?.resource_name ?? "?";
    const id = resource.split("/").pop();
    console.log(`Created "${def.name}":  id=${id}  resource=${resource}`);
  } catch (e) {
    console.error(`Failed to create "${def.name}":`, e?.errors ? JSON.stringify(e.errors, null, 2) : e.message ?? e);
  }
}
