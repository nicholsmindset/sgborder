export type TrafficStatus = "smooth" | "moderate" | "heavy" | "jammed";

export const CHECKPOINT_INFO = {
  woodlands: {
    name: "Woodlands",
    label: "Woodlands Checkpoint",
    emoji: "🌉",
  },
  tuas: {
    name: "Tuas",
    label: "Tuas Second Link",
    emoji: "🛣️",
  },
} as const;

export const DIRECTION_LABELS = {
  sg_to_jb: "SG → JB",
  jb_to_sg: "JB → SG",
} as const;

export const STATUS_CONFIG: Record<
  TrafficStatus,
  { label: string; color: string; emoji: string; bg: string; text: string }
> = {
  smooth: {
    label: "Smooth",
    color: "hsl(var(--status-smooth))",
    emoji: "🟢",
    bg: "bg-status-smooth-tint",
    text: "text-status-smooth",
  },
  moderate: {
    label: "Moderate",
    color: "hsl(var(--status-moderate))",
    emoji: "🟡",
    bg: "bg-status-moderate-tint",
    text: "text-status-moderate",
  },
  heavy: {
    label: "Heavy",
    color: "hsl(var(--status-heavy))",
    emoji: "🟠",
    bg: "bg-status-heavy-tint",
    text: "text-status-heavy",
  },
  jammed: {
    label: "Jammed",
    color: "hsl(var(--status-jammed))",
    emoji: "🔴",
    bg: "bg-status-jammed-tint",
    text: "text-status-jammed",
  },
};

export const CAMERA_IDS = {
  woodlands: ["2701", "2702", "2703", "2704", "2705", "2706"],
  tuas: ["4703", "4707", "4708", "4709", "4710", "4712"],
} as const;

export const BUS_STOP_CODES = {
  "46211": "Woodlands Temp Int",
  "45139": "Opp Kranji Stn",
  "04111": "Queen Street Terminal",
  "25421": "Tuas Link MRT",
  "22009": "Jurong Town Hall Int",
  "03218": "Newton Circus",
} as const;
