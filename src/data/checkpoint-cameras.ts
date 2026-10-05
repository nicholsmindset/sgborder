export const CHECKPOINT_CAMERAS = {
  "2701": { label: "Woodlands Causeway (Singapore side)", checkpoint: "woodlands", context: "Causeway lanes near the Singapore checkpoint" },
  "2702": { label: "BKE at Woodlands Flyover", checkpoint: "woodlands", context: "BKE approach before Woodlands Checkpoint" },
  "2704": { label: "BKE slip road at Woodlands", checkpoint: "woodlands", context: "Slip road feeding the Woodlands approach" },
  "4703": { label: "Second Link at Tuas", checkpoint: "tuas", context: "Second Link roadway near the Singapore side" },
  "4707": { label: "AYE at Tuas West Extension", checkpoint: "tuas", context: "AYE approach toward Tuas Checkpoint" },
  "4708": { label: "Tuas Checkpoint", checkpoint: "tuas", context: "Road at Tuas Checkpoint" },
} as const;

export type CheckpointName = "woodlands" | "tuas";

export const CHECKPOINT_CAMERA_DETAILS: Record<CheckpointName, {
  name: string;
  approach: string;
  explanation: string;
}> = {
  woodlands: {
    name: "Woodlands",
    approach: "BKE and the Causeway",
    explanation: "The BKE cameras help you inspect the Singapore road approach. The Causeway camera shows part of the bridge near Woodlands. None of these images measures the immigration queue inside either checkpoint.",
  },
  tuas: {
    name: "Tuas",
    approach: "AYE and the Second Link",
    explanation: "The AYE camera shows the Singapore approach to Tuas. The checkpoint and Second Link views show sections of the crossing road. They do not measure Malaysia-side clearance or an end-to-end wait.",
  },
};
