import type { Metadata } from "next";
import CamerasClient from "@/page-components/CamerasPage";

export const metadata: Metadata = {
  title: "Causeway Traffic Camera Live — Woodlands & Tuas LTA CCTV (2026)",
  description:
    "Live causeway traffic cameras from LTA. View Woodlands, Tuas, BKE, AYE and all Singapore expressway CCTV feeds. Updated every 5 minutes.",
  alternates: { canonical: "https://www.sgborder.live/cameras" },
};

export default function CamerasPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Causeway Traffic Camera Live — LTA CCTV Feeds</h1>
        <p>Live traffic camera images from LTA for Woodlands Checkpoint, Tuas Second Link, and all major Singapore expressways. Check real-time road conditions before heading to JB.</p>
        <h2>Checkpoint Cameras</h2>
        <p>Woodlands Checkpoint cameras cover the BKE approach, Causeway lanes, and Centre Road. Tuas cameras monitor the AYE approach and Second Link.</p>
        <h2>Expressway Cameras</h2>
        <p>BKE (Bukit Timah Expressway), AYE (Ayer Rajah Expressway), PIE (Pan Island Expressway), CTE (Central Expressway), SLE (Seletar Expressway), TPE (Tampines Expressway), ECP (East Coast Parkway), KPE (Kallang-Paya Lebar Expressway).</p>
      </div>
      <CamerasClient />
    </>
  );
}
