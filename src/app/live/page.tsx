import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import LiveClient from "@/page-components/LivePage";

export const metadata: Metadata = {
  title: "JB Traffic Now — Live LTA CCTV Camera & Causeway Checkpoint Status",
  description:
    "Is there a JB jam now? Live causeway traffic status for Woodlands & Tuas checkpoints with LTA CCTV cameras and wait times. Updated every 5 min.",
  alternates: { canonical: "https://www.sgborder.live/live" },
};

export default function LivePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Causeway Traffic Now — Live JB Checkpoint Status",
          url: "https://www.sgborder.live/live",
          description: "Real-time causeway traffic status for Woodlands and Tuas checkpoints. Live cameras, wait times, and congestion levels updated every 5 minutes.",
        }}
      />
      <div className="sr-only">
        <h1>JB Traffic Now — Live Causeway Checkpoint Status</h1>
        <p>Real-time Singapore-JB causeway traffic status. Check if there is a jam at Woodlands or Tuas checkpoints right now. Live LTA CCTV cameras and estimated wait times updated every 5 minutes.</p>
      </div>
      <LiveClient />
    </>
  );
}
