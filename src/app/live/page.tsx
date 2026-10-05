import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import LiveClient from "@/page-components/LivePage";
import { getCheckpointCameras } from "@/lib/server-cameras";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "JB Traffic Now — Live LTA CCTV Camera & Causeway Checkpoint Status",
  description:
    "Check recent road conditions near Woodlands and Tuas with LTA camera images. See feed timestamps before choosing your JB crossing.",
  alternates: { canonical: "https://www.sgborder.live/live" },
};

export default async function LivePage() {
  const initialCameras = await getCheckpointCameras();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Causeway Traffic Now — Live JB Checkpoint Status",
          url: "https://www.sgborder.live/live",
          description: "Recent road conditions near Woodlands and Tuas with LTA camera images and observation timestamps.",
        }}
      />

      <LiveClient initialCameras={initialCameras} />
    </>
  );
}
