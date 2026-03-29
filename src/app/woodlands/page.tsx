import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import WoodlandsClient from "@/page-components/WoodlandsPage";

export const metadata: Metadata = {
  title: "Woodlands Checkpoint Live Camera & Traffic Today (2026) — CCTV, Wait Time",
  description:
    "Woodlands Checkpoint traffic today with live LTA CCTV cameras, real-time wait times, bus arrivals & hourly patterns. Updated every 5 minutes. Plan your SG to JB crossing now.",
  alternates: { canonical: "https://www.sgborder.live/woodlands" },
  openGraph: {
    title: "Woodlands Checkpoint Live Traffic & Cameras",
    description: "Real-time Woodlands Checkpoint traffic, LTA CCTV cameras, and wait times.",
    url: "https://www.sgborder.live/woodlands",
  },
};

export default function WoodlandsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Place",
          name: "Woodlands Checkpoint",
          description: "Singapore's Woodlands Checkpoint connecting to Johor Bahru via the Causeway.",
          geo: { "@type": "GeoCoordinates", latitude: 1.44643, longitude: 103.76932 },
          address: { "@type": "PostalAddress", addressCountry: "SG", addressLocality: "Woodlands" },
        }}
      />
      <div className="sr-only">
        <h1>Woodlands Checkpoint Traffic Today — Live Camera & Status</h1>
        <p>Real-time traffic conditions at Woodlands Checkpoint (Singapore-JB Causeway). Live LTA CCTV cameras, estimated crossing times, bus arrivals for CW1, CW2, 170, 170X, and 950 services. Toll: S$0.80 for cars. Typical crossing: 20-45 minutes off-peak.</p>
        <h2>Woodlands Checkpoint Quick Facts</h2>
        <ul>
          <li>Singapore toll (cars): S$0.80</li>
          <li>Typical crossing time: 20-45 minutes off-peak</li>
          <li>Address: 21 Woodlands Crossing, Singapore</li>
          <li>Buses via Woodlands: CW1, CW2, 170, 170X, 950, CW5</li>
        </ul>
      </div>
      <WoodlandsClient />
    </>
  );
}
