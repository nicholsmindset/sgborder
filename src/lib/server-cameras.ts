import type { CameraFeed } from "@/lib/types";
import { CHECKPOINT_CAMERAS, type CheckpointName } from "@/data/checkpoint-cameras";

interface DataGovCamera {
  camera_id: string;
  image: string;
  timestamp: string;
}

interface DataGovResponse {
  items?: Array<{ cameras?: DataGovCamera[] }>;
}

/** Public LTA snapshots, cached for five minutes and omitted when the source frame is old. */
export async function getCheckpointCameras(checkpoint?: CheckpointName): Promise<CameraFeed[]> {
  try {
    const response = await fetch("https://api.data.gov.sg/v1/transport/traffic-images", {
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];

    const payload = await response.json() as DataGovResponse;
    const cutoff = Date.now() - 15 * 60_000;
    return (payload.items?.[0]?.cameras ?? []).flatMap((camera) => {
      const meta = CHECKPOINT_CAMERAS[camera.camera_id as keyof typeof CHECKPOINT_CAMERAS];
      const observed = Date.parse(camera.timestamp);
      if (!meta || (checkpoint && meta.checkpoint !== checkpoint) || !Number.isFinite(observed) || observed < cutoff) return [];
      return [{
        camera_id: camera.camera_id,
        label: meta.label,
        image_url: camera.image,
        checkpoint: meta.checkpoint,
        timestamp: camera.timestamp,
      }];
    });
  } catch {
    return [];
  }
}
