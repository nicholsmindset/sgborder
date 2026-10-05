import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import TuasClient from "@/page-components/TuasPage";
import { getCheckpointCameras } from "@/lib/server-cameras";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Tuas Checkpoint Live CCTV Camera & Traffic Today (2026) — Second Link Status",
  description:
    "Tuas Checkpoint is open 24 hours. Check timestamped LTA camera images, Singapore approach conditions when available, and Second Link bus routes before leaving for JB.",
  alternates: { canonical: "https://www.sgborder.live/tuas" },
  openGraph: {
    title: "Tuas Checkpoint Live Traffic — Second Link Status",
    description: "Recent Tuas Second Link road conditions and LTA traffic camera images.",
    url: "https://www.sgborder.live/tuas",
  },
};

export default async function TuasPage() {
  const initialCameras = await getCheckpointCameras("tuas");
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

      <TuasClient initialCameras={initialCameras} />
    </>
  );
}
