import { ImageResponse } from "next/og";

export const alt = "Business Debt Insider — Inside business debt restructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div
            style={{
              position: "relative",
              width: "180px",
              height: "180px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                letterSpacing: "-3px",
                lineHeight: 1,
                marginBottom: "12px",
              }}
            >
              BDI
            </div>
            <svg
              width="180"
              height="180"
              viewBox="0 0 100 100"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <path
                d="M 10 45 L 28 32 L 46 38 L 78 14"
                stroke="#10B981"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 22,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "5px",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Business Debt
            </div>
            <div
              style={{
                height: "2px",
                width: "240px",
                background: "#10B981",
                margin: "10px 0",
              }}
            />
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                letterSpacing: "3px",
              }}
            >
              INSIDER
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-3px",
              lineHeight: 1,
              display: "flex",
            }}
          >
            Inside business
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-3px",
              lineHeight: 1,
              marginTop: 8,
              display: "flex",
            }}
          >
            <span style={{ color: "#10B981" }}>debt</span>
            <span>.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 24,
              color: "rgba(255,255,255,0.65)",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "5px",
              textTransform: "uppercase",
            }}
          >
            businessdebtinsider.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
