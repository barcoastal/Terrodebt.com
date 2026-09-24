import OpengraphImage from "../(site)/opengraph-image";

// A stable URL for JSON-LD and fallback sharing metadata. The metadata-file
// convention generates its own route name, which must not be hard-coded.
export const dynamic = "force-static";

export function GET() {
  return OpengraphImage();
}
