import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Camera IDs relevant to causeway checkpoints
const CHECKPOINT_CAMERAS: Record<string, { id: string; label: string }[]> = {
  woodlands: [
    { id: "2701", label: "Woodlands Causeway (SG)" },
    { id: "2702", label: "BKE (Woodlands)" },
    { id: "2704", label: "BKE Slip Road" },
  ],
  tuas: [
    { id: "4703", label: "Tuas Second Link" },
    { id: "4707", label: "AYE (Tuas)" },
    { id: "4708", label: "Tuas Checkpoint" },
  ],
};

const ALL_CAMERA_IDS = new Set(
  Object.values(CHECKPOINT_CAMERAS)
    .flat()
    .map((c) => c.id)
);

const CAMERA_META = new Map(
  Object.entries(CHECKPOINT_CAMERAS).flatMap(([checkpoint, cams]) =>
    cams.map((c) => [c.id, { label: c.label, checkpoint }])
  )
);

// Bus stop codes for cross-border services
const BUS_STOPS: Record<string, string> = {
  "45009": "Kranji MRT",
  "01029": "Queen Street",
  "46009": "Woodlands Int",
  "22009": "Jurong Town Hall",
  "25009": "Tuas Link MRT",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (action === "cameras") {
      return await fetchCameras();
    } else if (action === "bus") {
      const stopCode = url.searchParams.get("stop") || "45009";
      return await fetchBusArrivals(stopCode);
    } else if (action === "traffic") {
      return await fetchTraffic();
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action. Use ?action=cameras, ?action=bus&stop=45009, or ?action=traffic" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function fetchCameras() {
  // data.gov.sg traffic images API — FREE, no key required
  const res = await fetch("https://api.data.gov.sg/v1/transport/traffic-images");
  if (!res.ok) {
    throw new Error(`data.gov.sg API failed [${res.status}]`);
  }

  const data = await res.json();
  const cameras = data.items?.[0]?.cameras || [];

  // Filter to only causeway-relevant cameras
  const filtered = cameras
    .filter((cam: any) => ALL_CAMERA_IDS.has(String(cam.camera_id)))
    .map((cam: any) => {
      const meta = CAMERA_META.get(String(cam.camera_id));
      return {
        camera_id: String(cam.camera_id),
        label: meta?.label || `Camera ${cam.camera_id}`,
        image_url: cam.image,
        checkpoint: meta?.checkpoint || "unknown",
        latitude: cam.location?.latitude,
        longitude: cam.location?.longitude,
        timestamp: cam.timestamp,
      };
    });

  // Also upsert to database for caching
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    for (const cam of filtered) {
      await supabase.from("camera_feeds").upsert(
        {
          camera_id: cam.camera_id,
          label: cam.label,
          image_url: cam.image_url,
          checkpoint: cam.checkpoint,
          latitude: cam.latitude,
          longitude: cam.longitude,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "camera_id" }
      );
    }
  } catch (e) {
    console.error("DB upsert error:", e);
  }

  return new Response(JSON.stringify({ cameras: filtered, timestamp: data.items?.[0]?.timestamp }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function fetchBusArrivals(stopCode: string) {
  const ltaKey = Deno.env.get("LTA_API_KEY");
  if (!ltaKey) {
    throw new Error("LTA_API_KEY is not configured");
  }

  const res = await fetch(
    `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${stopCode}`,
    {
      headers: {
        AccountKey: ltaKey,
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`LTA BusArrival API failed [${res.status}]`);
  }

  const data = await res.json();
  const services = (data.Services || []).map((svc: any) => ({
    service_no: svc.ServiceNo,
    operator: svc.Operator,
    next_bus_1: svc.NextBus?.EstimatedArrival || null,
    next_bus_2: svc.NextBus2?.EstimatedArrival || null,
    next_bus_3: svc.NextBus3?.EstimatedArrival || null,
    load_1: mapLoad(svc.NextBus?.Load),
    load_2: mapLoad(svc.NextBus2?.Load),
    load_3: mapLoad(svc.NextBus3?.Load),
  }));

  // Upsert to DB
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    for (const svc of services) {
      await supabase.from("bus_arrivals").upsert(
        {
          service_no: svc.service_no,
          bus_stop_code: stopCode,
          next_arrival_1: svc.next_bus_1,
          next_arrival_2: svc.next_bus_2,
          next_arrival_3: svc.next_bus_3,
          load_1: svc.load_1,
          load_2: svc.load_2,
          load_3: svc.load_3,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "service_no,bus_stop_code" }
      );
    }
  } catch (e) {
    console.error("DB upsert error:", e);
  }

  return new Response(
    JSON.stringify({
      bus_stop_code: stopCode,
      stop_name: BUS_STOPS[stopCode] || stopCode,
      services,
      timestamp: new Date().toISOString(),
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

function mapLoad(load: string | undefined): string {
  switch (load) {
    case "SEA": return "seats";
    case "SDA": return "standing";
    case "LSD": return "limited";
    default: return "unknown";
  }
}

// --- Traffic scoring pipeline ---

// Road segments to filter from LTA SpeedBands
// BKE = Bukit Timah Expressway (leads to Woodlands)
// AYE = Ayer Rajah Expressway (leads to Tuas)
const ROAD_FILTERS: Record<string, string[]> = {
  woodlands: ["BKE", "WOODLANDS"],
  tuas: ["AYE", "TUAS"],
};

type TrafficStatus = "smooth" | "moderate" | "heavy" | "jammed";

interface ScoredTraffic {
  checkpoint: string;
  direction: string;
  status: TrafficStatus;
  travel_time_min: number;
  score: number;
}

function scoreFromSpeed(avgSpeedKmh: number, estTravelMin?: number): { status: TrafficStatus; score: number; travelMin: number } {
  const speedScore = Math.max(0, Math.min(100, ((80 - avgSpeedKmh) / 75) * 100));

  let finalScore: number;
  let travelMin: number;

  if (estTravelMin != null && estTravelMin > 0) {
    const travelScore = Math.max(0, Math.min(100, ((estTravelMin - 15) / 165) * 100));
    finalScore = speedScore * 0.5 + travelScore * 0.5;
    travelMin = Math.round(estTravelMin);
  } else {
    finalScore = speedScore;
    const safeSpeed = Math.max(avgSpeedKmh, 3);
    travelMin = Math.round((2.5 / safeSpeed) * 60 + 10);
  }

  const score = Math.round(Math.max(0, Math.min(100, finalScore)));
  let status: TrafficStatus;
  if (score < 20) status = "smooth";
  else if (score < 45) status = "moderate";
  else if (score < 70) status = "heavy";
  else status = "jammed";

  return { status, score, travelMin };
}

async function fetchTraffic() {
  const ltaKey = Deno.env.get("LTA_API_KEY");
  if (!ltaKey) {
    throw new Error("LTA_API_KEY is not configured");
  }

  const headers = { AccountKey: ltaKey, accept: "application/json" };

  // Fetch LTA Traffic Speed Bands
  const speedRes = await fetch(
    "https://datamall2.mytransport.sg/ltaodataservice/v3/TrafficSpeedBands",
    { headers }
  );
  if (!speedRes.ok) {
    throw new Error(`LTA TrafficSpeedBands API failed [${speedRes.status}]`);
  }
  const speedData = await speedRes.json();
  const speedBands = speedData.value || [];

  // Fetch LTA Est Travel Times (optional — may not have all routes)
  let estTravelTimes: any[] = [];
  try {
    const travelRes = await fetch(
      "https://datamall2.mytransport.sg/ltaodataservice/EstTravelTimes",
      { headers }
    );
    if (travelRes.ok) {
      const travelData = await travelRes.json();
      estTravelTimes = travelData.value || [];
    }
  } catch (e) {
    console.warn("EstTravelTimes fetch failed, continuing with speed bands only:", e);
  }

  // Compute average speeds per checkpoint
  const checkpointSpeeds: Record<string, number[]> = {
    woodlands: [],
    tuas: [],
  };

  for (const band of speedBands) {
    const roadName = (band.RoadName || "").toUpperCase();
    for (const [checkpoint, keywords] of Object.entries(ROAD_FILTERS)) {
      if (keywords.some((kw) => roadName.includes(kw))) {
        const speed = band.MinimumSpeed != null ? Number(band.MinimumSpeed) : null;
        if (speed != null && speed >= 0) {
          checkpointSpeeds[checkpoint].push(speed);
        }
      }
    }
  }

  // Sum estimated travel times for relevant expressways (each entry is one segment)
  const estTravel: Record<string, number> = { woodlands: 0, tuas: 0 };
  for (const tt of estTravelTimes) {
    const name = (tt.Name || "").toUpperCase();
    const time = Number(tt.EstTime) || 0;
    if (name.includes("BKE")) {
      estTravel["woodlands"] += time;
    }
    if (name.includes("AYE")) {
      estTravel["tuas"] += time;
    }
  }

  // Score each checkpoint+direction combo
  const results: ScoredTraffic[] = [];
  const directions = ["sg_to_jb", "jb_to_sg"];

  for (const checkpoint of ["woodlands", "tuas"]) {
    const speeds = checkpointSpeeds[checkpoint];
    const avgSpeed = speeds.length > 0
      ? speeds.reduce((a, b) => a + b, 0) / speeds.length
      : 60; // default to moderate if no data

    for (const direction of directions) {
      // Use est travel time if available; slightly increase for jb_to_sg (return direction often slower at customs)
      const baseEst = estTravel[checkpoint] > 0 ? estTravel[checkpoint] : undefined;
      const directionMultiplier = direction === "jb_to_sg" ? 1.1 : 1.0;
      const adjustedEst = baseEst != null ? baseEst * directionMultiplier : undefined;

      const { status, score, travelMin } = scoreFromSpeed(avgSpeed, adjustedEst);
      results.push({
        checkpoint,
        direction,
        status,
        travel_time_min: travelMin,
        score,
      });
    }
  }

  // Insert into traffic_snapshots
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  for (const r of results) {
    const { error } = await supabase.from("traffic_snapshots").insert({
      checkpoint: r.checkpoint,
      direction: r.direction,
      status: r.status,
      travel_time_min: r.travel_time_min,
    });
    if (error) {
      console.error(`Insert error for ${r.checkpoint}/${r.direction}:`, error);
    }
  }

  return new Response(
    JSON.stringify({ snapshots: results, timestamp: new Date().toISOString() }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}
