import type { Metadata } from "next";
import CamerasClient from "@/page-components/CamerasPage";
import { getCheckpointCameras } from "@/lib/server-cameras";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Causeway Traffic Camera Live — Woodlands & Tuas LTA CCTV (2026)",
  description:
    "Timestamped LTA traffic camera images for Woodlands, Tuas, the BKE and AYE. Check current frames and camera positions before crossing.",
  alternates: { canonical: "https://www.sgborder.live/cameras" },
};

export default async function CamerasPage() {
  const initialCameras = await getCheckpointCameras();
  return (
    <>

      <CamerasClient initialCameras={initialCameras} />
    </>
  );
}
