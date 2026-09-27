import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import TuasClient from "@/page-components/TuasPage";

export const metadata: Metadata = {
  title: "Tuas Checkpoint Live CCTV Camera & Traffic Today (2026) — Second Link Status",
  description:
    "Tuas Second Link traffic today: inspect LTA camera images, recent Singapore road conditions and bus routes before leaving for JB.",
  alternates: { canonical: "https://www.sgborder.live/tuas" },
  openGraph: {
    title: "Tuas Checkpoint Live Traffic — Second Link Status",
    description: "Recent Tuas Second Link road conditions and LTA traffic camera images.",
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

      <TuasClient />
    </>
  );
}
