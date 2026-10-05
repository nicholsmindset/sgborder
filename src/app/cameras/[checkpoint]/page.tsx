import type { Metadata } from "next";
import { EXPRESSWAYS } from "@/data/expressway-cameras";
import CamerasCheckpointClient from "@/page-components/CamerasCheckpointPage";
import ExpresswayCamerasClient from "@/page-components/ExpresswayCamerasPage";
import { getCheckpointCameras } from "@/lib/server-cameras";

export const revalidate = 300;

export const dynamicParams = false;

const checkpoints = ["woodlands", "tuas"];
const expresswayKeys = ["bke", "aye"];

export function generateStaticParams() {
  return [...checkpoints.map((c) => ({ checkpoint: c })), ...expresswayKeys.map((e) => ({ checkpoint: e }))];
}

export async function generateMetadata({ params }: { params: Promise<{ checkpoint: string }> }): Promise<Metadata> {
  const { checkpoint } = await params;
  const expressway = EXPRESSWAYS[checkpoint];
  if (expressway) {
    return {
      title: expressway.title,
      description: expressway.description,
      alternates: { canonical: `https://www.sgborder.live/cameras/${checkpoint}` },
    };
  }

  const name = checkpoint === "woodlands" ? "Woodlands" : "Tuas";
  return {
    title: `${name} Checkpoint Live Cameras — LTA CCTV Traffic (2026)`,
    description: `Timestamped LTA camera images for the Singapore road approach to ${name} Checkpoint. See each frame time and camera location.`,
    alternates: { canonical: `https://www.sgborder.live/cameras/${checkpoint}` },
  };
}

export default async function CheckpointCameraPage({ params }: { params: Promise<{ checkpoint: string }> }) {
  const { checkpoint } = await params;
  const isExpressway = checkpoint in EXPRESSWAYS;
  const sourceCheckpoint = checkpoint === "bke" ? "woodlands" : checkpoint === "aye" ? "tuas" : checkpoint as "woodlands" | "tuas";
  const initialCameras = await getCheckpointCameras(sourceCheckpoint);

  return (
    <>

      {isExpressway ? <ExpresswayCamerasClient initialCameras={initialCameras} /> : <CamerasCheckpointClient initialCameras={initialCameras} />}
    </>
  );
}
