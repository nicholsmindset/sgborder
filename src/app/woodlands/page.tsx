import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import WoodlandsClient from "@/page-components/WoodlandsPage";
import { getCheckpointCameras } from "@/lib/server-cameras";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Woodlands Checkpoint Live Camera & Traffic Today (2026) — CCTV & Road Status",
  description:
    "Woodlands Checkpoint is open 24 hours. Check timestamped LTA camera images, Singapore approach conditions when available, and cross-border bus routes before leaving for JB.",
  alternates: { canonical: "https://www.sgborder.live/woodlands" },
  openGraph: {
    title: "Woodlands Checkpoint Live Traffic & Cameras",
    description: "Recent Woodlands road conditions and LTA traffic camera images.",
    url: "https://www.sgborder.live/woodlands",
  },
};

export default async function WoodlandsPage() {
  const initialCameras = await getCheckpointCameras("woodlands");
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

      <WoodlandsClient initialCameras={initialCameras} />
    </>
  );
}
