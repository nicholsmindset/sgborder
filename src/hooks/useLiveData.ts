import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CameraFeed, TrafficSnapshot, HourlyPattern } from "@/lib/types";
import type { TrafficStatus } from "@/lib/constants";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface LiveCamera {
  camera_id: string;
  label: string;
  image_url: string;
  checkpoint: string;
  latitude?: number;
  longitude?: number;
  timestamp?: string;
}

interface LiveBusService {
  service_no: string;
  operator: string;
  next_bus_1: string | null;
  next_bus_2: string | null;
  next_bus_3: string | null;
  load_1: string;
  load_2: string;
  load_3: string;
}

interface BusResponse {
  bus_stop_code: string;
  stop_name: string;
  services: LiveBusService[];
  timestamp: string;
}

// ArriveLah API types
interface ArriveLahBus {
  time: string;
  load: string;
  feature: string;
  type: string;
}

interface ArriveLahService {
  no: string;
  operator: string;
  next: ArriveLahBus;
  next2: ArriveLahBus;
  next3: ArriveLahBus;
}

interface ArriveLahResponse {
  services: ArriveLahService[];
}

const BUS_STOP_NAMES: Record<string, string> = {
  "45009": "Kranji MRT",
  "01029": "Queen Street",
  "46009": "Woodlands Int",
  "22009": "Jurong Town Hall",
  "25009": "Tuas Link MRT",
};

async function fetchFromEdge<T>(action: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${SUPABASE_URL}/functions/v1/lta-proxy`);
  url.searchParams.set("action", action);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Edge function error: ${res.status}`);
  }

  return res.json();
}

/** Camera metadata: ID → label + checkpoint */
const CAMERA_META: Record<string, { label: string; checkpoint: string }> = {
  "2701": { label: "Woodlands Causeway (SG Side)", checkpoint: "woodlands" },
  "2702": { label: "BKE (Woodlands Flyover)", checkpoint: "woodlands" },
  "2704": { label: "BKE Slip Road (Woodlands)", checkpoint: "woodlands" },
  "4703": { label: "Second Link at Tuas", checkpoint: "tuas" },
  "4707": { label: "AYE (Tuas West Extension)", checkpoint: "tuas" },
  "4708": { label: "Tuas Checkpoint", checkpoint: "tuas" },
};

const ALL_CAMERA_IDS = new Set(Object.keys(CAMERA_META));

interface DataGovCamera {
  camera_id: string;
  image: string;
  image_metadata: { width: number; height: number };
  location: { latitude: number; longitude: number };
  timestamp: string;
}

interface DataGovResponse {
  items: Array<{ cameras: DataGovCamera[] }>;
}

/** Fetches cameras directly from data.gov.sg (free, no key, CORS-friendly) */
async function fetchCamerasFromDataGov(checkpoint?: string): Promise<CameraFeed[]> {
  const res = await fetch("https://api.data.gov.sg/v1/transport/traffic-images");
  if (!res.ok) throw new Error(`data.gov.sg error: ${res.status}`);
  const data: DataGovResponse = await res.json();

  const allCameras = data.items?.[0]?.cameras || [];
  return allCameras
    .filter((c) => ALL_CAMERA_IDS.has(c.camera_id))
    .filter((c) => {
      const meta = CAMERA_META[c.camera_id];
      return !checkpoint || meta?.checkpoint === checkpoint;
    })
    .map((c) => {
      const meta = CAMERA_META[c.camera_id];
      return {
        camera_id: c.camera_id,
        label: meta?.label || `Camera ${c.camera_id}`,
        image_url: c.image,
        checkpoint: meta?.checkpoint || "unknown",
      };
    });
}

/** Fetches live traffic camera images, falls back to DB cache, then direct API */
export function useLiveCameras(checkpoint?: string) {
  return useQuery({
    queryKey: ["live-cameras", checkpoint],
    queryFn: async (): Promise<CameraFeed[]> => {
      // Try edge function first
      try {
        const data = await fetchFromEdge<{ cameras: LiveCamera[] }>("cameras");
        const cameras = data.cameras
          .filter((c) => !checkpoint || c.checkpoint === checkpoint)
          .map((c) => ({
            camera_id: c.camera_id,
            label: c.label,
            image_url: c.image_url,
            checkpoint: c.checkpoint,
          }));
        if (cameras.length > 0) return cameras;
      } catch (e) {
        console.warn("Edge function cameras failed:", e);
      }

      // Fallback 1: DB cache
      try {
        let query = supabase.from("camera_feeds").select("*");
        if (checkpoint) query = query.eq("checkpoint", checkpoint);
        const { data } = await query;
        if (data && data.length > 0) {
          return data.map((c: any) => ({
            camera_id: c.camera_id,
            label: c.label,
            image_url: c.image_url,
            checkpoint: c.checkpoint,
          }));
        }
      } catch (e) {
        console.warn("DB camera cache failed:", e);
      }

      // Fallback 2: Direct data.gov.sg API (free, no key needed)
      try {
        const cameras = await fetchCamerasFromDataGov(checkpoint);
        if (cameras.length > 0) return cameras;
      } catch (e) {
        console.warn("data.gov.sg cameras failed:", e);
      }

      return [];
    },
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    staleTime: 2 * 60 * 1000,
  });
}

/** Fetches expressway cameras directly from data.gov.sg filtered by camera IDs */
export function useExpresswayCameras(cameraIds: string[]) {
  return useQuery({
    queryKey: ["expressway-cameras", cameraIds.join(",")],
    queryFn: async (): Promise<CameraFeed[]> => {
      const idSet = new Set(cameraIds);
      try {
        const res = await fetch("https://api.data.gov.sg/v1/transport/traffic-images");
        if (!res.ok) throw new Error(`data.gov.sg error: ${res.status}`);
        const data: DataGovResponse = await res.json();
        const allCameras = data.items?.[0]?.cameras || [];
        return allCameras
          .filter((c) => idSet.has(c.camera_id))
          .map((c) => ({
            camera_id: c.camera_id,
            label: `Camera ${c.camera_id}`,
            image_url: c.image,
            checkpoint: "expressway",
          }));
      } catch (e) {
        console.warn("Expressway cameras fetch failed:", e);
        return [];
      }
    },
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
    enabled: cameraIds.length > 0,
  });
}

/** Fetches live bus arrivals from ArriveLah (free, no API key, 15s cache) */
export function useLiveBusArrivals(stopCode: string = "45009") {
  return useQuery({
    queryKey: ["live-bus", stopCode],
    queryFn: async (): Promise<BusResponse | null> => {
      try {
        const res = await fetch(`https://arrivelah2.busrouter.sg/?id=${stopCode}`);
        if (!res.ok) throw new Error(`ArriveLah error: ${res.status}`);
        const data: ArriveLahResponse = await res.json();

        const services: LiveBusService[] = (data.services || []).map((svc) => ({
          service_no: svc.no,
          operator: svc.operator || "",
          next_bus_1: svc.next?.time || null,
          next_bus_2: svc.next2?.time || null,
          next_bus_3: svc.next3?.time || null,
          load_1: mapArriveLahLoad(svc.next?.load),
          load_2: mapArriveLahLoad(svc.next2?.load),
          load_3: mapArriveLahLoad(svc.next3?.load),
        }));

        return {
          bus_stop_code: stopCode,
          stop_name: BUS_STOP_NAMES[stopCode] || stopCode,
          services,
          timestamp: new Date().toISOString(),
        };
      } catch (e) {
        console.warn("ArriveLah fetch failed, trying edge function:", e);
        try {
          return await fetchFromEdge<BusResponse>("bus", { stop: stopCode });
        } catch {
          return null;
        }
      }
    },
    refetchInterval: 30 * 1000,
    staleTime: 10 * 1000,
    refetchOnWindowFocus: true,
  });
}

function mapArriveLahLoad(load: string | undefined): string {
  switch (load) {
    case "SEA": return "seats";
    case "SDA": return "standing";
    case "LSD": return "limited";
    default: return "unknown";
  }
}

/** Converts ISO arrival time to minutes from now */
export function arrivalToMinutes(isoTime: string | null): number | null {
  if (!isoTime) return null;
  const diff = (new Date(isoTime).getTime() - Date.now()) / 60000;
  return Math.max(0, Math.round(diff));
}

/** Demo traffic data shown when no pipeline data exists yet */
const DEMO_SNAPSHOTS: TrafficSnapshot[] = [
  { id: 1, checkpoint: "woodlands", direction: "sg_to_jb", status: "smooth", travel_time_min: 22, updated_at: new Date().toISOString() },
  { id: 2, checkpoint: "woodlands", direction: "jb_to_sg", status: "moderate", travel_time_min: 38, updated_at: new Date().toISOString() },
  { id: 3, checkpoint: "tuas", direction: "sg_to_jb", status: "smooth", travel_time_min: 18, updated_at: new Date().toISOString() },
  { id: 4, checkpoint: "tuas", direction: "jb_to_sg", status: "smooth", travel_time_min: 15, updated_at: new Date().toISOString() },
];

/** Fetches latest traffic snapshots from Supabase, falls back to demo data */
export function useLiveTraffic(checkpoint?: string, direction?: string) {
  return useQuery({
    queryKey: ["live-traffic", checkpoint, direction],
    queryFn: async (): Promise<TrafficSnapshot[]> => {
      try {
        let query = supabase
          .from("traffic_snapshots")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(8);

        if (checkpoint) query = query.eq("checkpoint", checkpoint);
        if (direction) query = query.eq("direction", direction);

        const { data, error } = await query;
        if (error) throw error;

        if (data && data.length > 0) {
          const seen = new Map<string, typeof data[0]>();
          for (const row of data) {
            const key = `${row.checkpoint}:${row.direction}`;
            if (!seen.has(key)) seen.set(key, row);
          }
          return Array.from(seen.values()).map((row) => ({
            id: row.id,
            checkpoint: row.checkpoint,
            direction: row.direction,
            status: row.status as TrafficStatus,
            travel_time_min: row.travel_time_min,
            updated_at: row.created_at,
          }));
        }
      } catch (e) {
        console.warn("Live traffic fetch failed, using demo data:", e);
      }
      // Return demo data so the dashboard always shows something
      return DEMO_SNAPSHOTS;
    },
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
  });
}

/** Typical causeway hourly pattern for demo display */
const DEMO_HOURLY: HourlyPattern[] = Array.from({ length: 24 }, (_, h) => {
  const patterns: Record<number, { time: number; status: TrafficStatus }> = {
    0: { time: 15, status: "smooth" }, 1: { time: 14, status: "smooth" }, 2: { time: 13, status: "smooth" },
    3: { time: 13, status: "smooth" }, 4: { time: 14, status: "smooth" }, 5: { time: 18, status: "smooth" },
    6: { time: 25, status: "moderate" }, 7: { time: 40, status: "heavy" }, 8: { time: 55, status: "heavy" },
    9: { time: 45, status: "heavy" }, 10: { time: 35, status: "moderate" }, 11: { time: 28, status: "moderate" },
    12: { time: 25, status: "moderate" }, 13: { time: 22, status: "smooth" }, 14: { time: 20, status: "smooth" },
    15: { time: 22, status: "smooth" }, 16: { time: 28, status: "moderate" }, 17: { time: 45, status: "heavy" },
    18: { time: 55, status: "heavy" }, 19: { time: 50, status: "heavy" }, 20: { time: 38, status: "moderate" },
    21: { time: 28, status: "moderate" }, 22: { time: 20, status: "smooth" }, 23: { time: 16, status: "smooth" },
  };
  const p = patterns[h];
  return { hour: h, avg_travel_time: p.time, avg_status: p.status };
});

/** Fetches historical hourly averages for today's day of week */
export function useLiveHourlyPattern(checkpoint?: string, direction?: string) {
  return useQuery({
    queryKey: ["hourly-pattern", checkpoint, direction],
    queryFn: async (): Promise<HourlyPattern[]> => {
      try {
        const dow = new Date().getDay();
        let query = supabase
          .from("historical_averages")
          .select("*")
          .eq("day_of_week", dow)
          .order("hour");

        if (checkpoint) query = query.eq("checkpoint", checkpoint);
        if (direction) query = query.eq("direction", direction);

        const { data, error } = await query;
        if (error) throw error;

        if (data && data.length > 0) {
          return data.map((row) => ({
            hour: row.hour,
            avg_travel_time: row.avg_travel_time,
            avg_status: row.avg_status as TrafficStatus,
          }));
        }
      } catch (e) {
        console.warn("Hourly pattern fetch failed, using demo data:", e);
      }
      return DEMO_HOURLY;
    },
    staleTime: 60 * 60 * 1000,
  });
}
