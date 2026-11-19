import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

/** Preview image when a page is shared (WhatsApp, LinkedIn, X…) and for search engines. */
export const alt = `${BRAND.name}: dMAT mock tests, live classes and study in Germany`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#8c0a55",
          color: "white",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "white",
              color: "#8c0a55",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            D
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{BRAND.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
            Practise the dMAT exactly as it feels on test day.
          </div>
          <div style={{ fontSize: 32, opacity: 0.85 }}>Free mock tests · Live classes · Study in Germany</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <div style={{ opacity: 0.85 }}>www.dmatmockprep.com</div>
          <div style={{ width: 120, height: 14, borderRadius: 7, background: "#cdd600" }} />
        </div>
      </div>
    ),
    size,
  );
}
