import type { TrafficStatus } from "./constants";

export interface TrafficInput {
  ltaSpeedKmh: number;
  ltaEstTravelMin?: number;
}

export interface TrafficResult {
  status: TrafficStatus;
  score: number;
  estimatedTravelMin: number;
  color: string;
  emoji: string;
  label: string;
}

const FREE_FLOW_KMH = 80;
const STANDSTILL_KMH = 5;
const BASE_TRAVEL_MIN = 15;
const MAX_TRAVEL_MIN = 180;

// Approximate distances (km) for travel time estimation from speed
const CHECKPOINT_DISTANCE_KM: Record<string, number> = {
  woodlands: 2.5,
  tuas: 4.0,
};

function clamp(min: number, max: number, value: number): number {
  return Math.max(min, Math.min(max, value));
}

export function calculateTrafficStatus(input: TrafficInput): TrafficResult {
  const { ltaSpeedKmh, ltaEstTravelMin } = input;

  // Speed-based score: 80 km/h = 0 (free flow), 5 km/h = 100 (standstill)
  const speedScore = clamp(0, 100, ((FREE_FLOW_KMH - ltaSpeedKmh) / (FREE_FLOW_KMH - STANDSTILL_KMH)) * 100);

  let finalScore: number;
  let estimatedTravelMin: number;

  if (ltaEstTravelMin != null && ltaEstTravelMin > 0) {
    // Travel time score: 15 min = 0 (smooth), 180 min = 100 (jammed)
    const travelScore = clamp(0, 100, ((ltaEstTravelMin - BASE_TRAVEL_MIN) / (MAX_TRAVEL_MIN - BASE_TRAVEL_MIN)) * 100);
    finalScore = speedScore * 0.5 + travelScore * 0.5;
    estimatedTravelMin = Math.round(ltaEstTravelMin);
  } else {
    finalScore = speedScore;
    // Estimate travel time from speed (rough: distance / speed * 60 + base wait)
    const speedForCalc = Math.max(ltaSpeedKmh, 3);
    estimatedTravelMin = Math.round((2.5 / speedForCalc) * 60 + 10);
  }

  const score = Math.round(clamp(0, 100, finalScore));

  if (score < 20) return { status: "smooth", score, estimatedTravelMin, color: "#22C55E", emoji: "\uD83D\uDFE2", label: "Smooth" };
  if (score < 45) return { status: "moderate", score, estimatedTravelMin, color: "#F59E0B", emoji: "\uD83D\uDFE1", label: "Moderate" };
  if (score < 70) return { status: "heavy", score, estimatedTravelMin, color: "#F97316", emoji: "\uD83D\uDFE0", label: "Heavy" };
  return { status: "jammed", score, estimatedTravelMin, color: "#EF4444", emoji: "\uD83D\uDD34", label: "Jammed" };
}

export function getStatusMeta(status: TrafficStatus) {
  const map: Record<TrafficStatus, { color: string; emoji: string; label: string }> = {
    smooth: { color: "#22C55E", emoji: "\uD83D\uDFE2", label: "Smooth" },
    moderate: { color: "#F59E0B", emoji: "\uD83D\uDFE1", label: "Moderate" },
    heavy: { color: "#F97316", emoji: "\uD83D\uDFE0", label: "Heavy" },
    jammed: { color: "#EF4444", emoji: "\uD83D\uDD34", label: "Jammed" },
  };
  return map[status];
}
