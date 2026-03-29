import type { Metadata } from "next";
import { EXPRESSWAYS } from "@/data/expressway-cameras";
import CamerasCheckpointClient from "@/page-components/CamerasCheckpointPage";
import ExpresswayCamerasClient from "@/page-components/ExpresswayCamerasPage";

const checkpoints = ["woodlands", "tuas"];
const expresswayKeys = Object.keys(EXPRESSWAYS);

export function generateStaticParams() {
  return [...checkpoints.map((c) => ({ checkpoint: c })), ...expresswayKeys.map((e) => ({ checkpoint: e }))];
}

export function generateMetadata({ params }: { params: { checkpoint: string } }): Metadata {
  const expressway = EXPRESSWAYS[params.checkpoint];
  if (expressway) {
    return {
      title: expressway.title,
      description: expressway.description,
      alternates: { canonical: `https://www.sgborder.live/cameras/${params.checkpoint}` },
    };
  }

  const name = params.checkpoint === "woodlands" ? "Woodlands" : "Tuas";
  return {
    title: `${name} Checkpoint Live Cameras — LTA CCTV Traffic (2026)`,
    description: `Live LTA traffic cameras at ${name} Checkpoint. View real-time CCTV images updated every 5 minutes.`,
    alternates: { canonical: `https://www.sgborder.live/cameras/${params.checkpoint}` },
  };
}

export default function CheckpointCameraPage({ params }: { params: { checkpoint: string } }) {
  const isExpressway = params.checkpoint in EXPRESSWAYS;

  return (
    <>
      <div className="sr-only">
        <h1>
          {isExpressway
            ? `${EXPRESSWAYS[params.checkpoint].name} Traffic Camera Live`
            : `${params.checkpoint === "woodlands" ? "Woodlands" : "Tuas"} Checkpoint Live Cameras`}
        </h1>
        <p>
          {isExpressway
            ? EXPRESSWAYS[params.checkpoint].description
            : `Real-time LTA CCTV camera images at ${params.checkpoint === "woodlands" ? "Woodlands" : "Tuas"} Checkpoint, updated every 5 minutes.`}
        </p>
      </div>
      {isExpressway ? <ExpresswayCamerasClient /> : <CamerasCheckpointClient />}
    </>
  );
}
