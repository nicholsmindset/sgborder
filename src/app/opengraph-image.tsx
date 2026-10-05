import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 68, background: "linear-gradient(135deg, #101d31 0%, #1a3549 62%, #163d42 100%)", color: "#ffffff", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 35, fontWeight: 700 }}>
        <div style={{ width: 24, height: 24, borderRadius: 12, background: "#31d39c" }} />
        <span>SG Border Live</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <span style={{ fontSize: 24, color: "#45dfac", letterSpacing: 4, fontWeight: 700 }}>SINGAPORE ↔ JOHOR BAHRU</span>
        <span style={{ maxWidth: 900, fontSize: 76, lineHeight: 1.08, fontWeight: 800 }}>See the crossing before you leave.</span>
        <span style={{ fontSize: 30, color: "#cfdae3" }}>Woodlands · Tuas · Timestamped cameras · Trip guides</span>
      </div>
      <span style={{ fontSize: 24, color: "#a8bfca" }}>sgborder.live</span>
    </div>,
    size,
  );
}
