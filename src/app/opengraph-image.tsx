import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BrinMetal - Professional Metal Fabrication";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          position: "relative",
        }}
      >
        {/* Subtle top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: "#c4956a",
          }}
        />

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.08em",
            }}
          >
            BRIN
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#c4956a",
              letterSpacing: "0.08em",
            }}
          >
            METAL
          </span>
        </div>

        {/* Copper divider line */}
        <div
          style={{
            width: 120,
            height: 2,
            backgroundColor: "#c4956a",
            marginTop: 24,
            marginBottom: 24,
            opacity: 0.7,
          }}
        />

        {/* Subtitle */}
        <span
          style={{
            fontSize: 28,
            color: "#999999",
            letterSpacing: "0.15em",
            fontWeight: 400,
          }}
        >
          Professional Metal Fabrication
        </span>

        {/* Location */}
        <span
          style={{
            fontSize: 20,
            color: "#666666",
            letterSpacing: "0.12em",
            marginTop: 12,
            fontWeight: 300,
          }}
        >
          Netanya, Israel
        </span>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: "#c4956a",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
