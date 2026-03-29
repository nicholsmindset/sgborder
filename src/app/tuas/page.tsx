import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import TuasClient from "@/page-components/TuasPage";

export const metadata: Metadata = {
  title: "Tuas Checkpoint Live CCTV Camera & Traffic Today (2026) — Second Link Status",
  description:
    "Tuas Checkpoint traffic today with live LTA CCTV cameras, Second Link wait times & bus info. Less crowded than Woodlands — check Tuas status before you cross to JB.",
  alternates: { canonical: "https://www.sgborder.live/tuas" },
  openGraph: {
    title: "Tuas Checkpoint Live Traffic — Second Link Status",
    description: "Real-time Tuas Second Link traffic, cameras, and wait times.",
    url: "https://www.sgborder.live/tuas",
  },
};

export default function TuasPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Place",
          name: "Tuas Checkpoint (Second Link)",
          description: "Singapore's Tuas Checkpoint connecting to Johor Bahru via the Malaysia-Singapore Second Link.",
          geo: { "@type": "GeoCoordinates", latitude: 1.34029, longitude: 103.63649 },
          address: { "@type": "PostalAddress", addressCountry: "SG", addressLocality: "Tuas" },
        }}
      />
      <div className="sr-only">
        <h1>Tuas Checkpoint Traffic Today — Second Link Live Status</h1>
        <p>Real-time traffic at Tuas Checkpoint (Second Link). Live LTA cameras, wait times, and bus info. Toll: S$2.10 for cars. Typically 20-40% less congested than Woodlands.</p>
        <h2>Why Choose Tuas over Woodlands?</h2>
        <ul>
          <li>20-40% less congested than Woodlands, especially during peak hours</li>
          <li>Best alternative during Friday evenings and Saturday mornings</li>
          <li>Buses via Tuas: CW3, CW7, 160</li>
        </ul>
      </div>
      <TuasClient />
    </>
  );
}
