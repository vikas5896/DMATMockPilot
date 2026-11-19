import { ImageResponse } from "next/og";

/** Home-screen icon (iPhone/Android) and the logo Google sees in our structured data. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#8c0a55",
          position: "relative",
        }}
      >
        <div style={{ color: "white", fontSize: 112, fontWeight: 700, lineHeight: 1 }}>D</div>
        <div
          style={{
            position: "absolute",
            top: 30,
            right: 30,
            width: 26,
            height: 26,
            borderRadius: 6,
            background: "#cdd600",
          }}
        />
      </div>
    ),
    size,
  );
}
