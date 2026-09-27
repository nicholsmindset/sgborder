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

      <CamerasClient />
    </>
  );
}
