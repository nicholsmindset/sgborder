"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CameraFeed, TrafficSnapshot, HourlyPattern } from "@/lib/types";
import type { TrafficStatus } from "@/lib/constants";
import { CHECKPOINT_CAMERAS } from "@/data/checkpoint-cameras";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

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
  "45131": "Opp Kranji Stn",
  "47009": "Woodlands Temp Int",
  "46101": "Woodlands Checkpoint",
  "29009": "Jurong Town Hall Int",
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
const CAMERA_META: Record<string, { label: string; checkpoint: string }> = CHECKPOINT_CAMERAS;
const ALL_CAMERA_IDS = new Set(Object.keys(CHECKPOINT_CAMERAS));

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
  const cutoff = Date.now() - 15 * 60_000;
  return allCameras
    .filter((c) => ALL_CAMERA_IDS.has(c.camera_id))
    .filter((c) => Number.isFinite(Date.parse(c.timestamp)) && Date.parse(c.timestamp) >= cutoff)
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
        timestamp: c.timestamp,
      };
    });
}

/** Fetches current government camera images, then tries the edge and recent cache. */
export function useLiveCameras(checkpoint?: string) {
  return useQuery({
    queryKey: ["live-cameras", checkpoint],
    queryFn: async (): Promise<CameraFeed[]> => {
      // The public feed avoids an extra proxy round trip on the camera-first dashboard.
      try {
        const cameras = await fetchCamerasFromDataGov(checkpoint);
        if (cameras.length > 0) return cameras;
      } catch (e) {
        console.warn("data.gov.sg cameras failed:", e);
      }

      // Fall back to the proxy if the direct feed is unavailable in this browser.
      try {
        const data = await fetchFromEdge<{ cameras: LiveCamera[] }>("cameras");
        const cameras = data.cameras
          .filter((c) => !checkpoint || c.checkpoint === checkpoint)
          .filter((c) => Number.isFinite(Date.parse(c.timestamp || "")) && Date.parse(c.timestamp || "") >= Date.now() - 15 * 60_000)
          .map((c) => ({
            camera_id: c.camera_id,
            label: c.label,
            image_url: c.image_url,
            checkpoint: c.checkpoint,
            timestamp: c.timestamp,
          }));
        if (cameras.length > 0) return cameras;
      } catch (e) {
        console.warn("Edge function cameras failed:", e);
      }

      // Last resort: use only a recently observed database image.
      try {
        let query = supabase.from("camera_feeds").select("*");
        if (checkpoint) query = query.eq("checkpoint", checkpoint);
        const { data } = await query;
        if (data && data.length > 0) {
          return data.filter((c: any) => {
            const observedAt = Date.parse(c.timestamp || c.updated_at || "");
            return Number.isFinite(observedAt) && Date.now() - observedAt < 15 * 60_000;
          }).map((c: any) => ({
            camera_id: c.camera_id,
            label: c.label,
            image_url: c.image_url,
            checkpoint: c.checkpoint,
            timestamp: c.timestamp || c.updated_at,
          }));
        }
      } catch (e) {
        console.warn("DB camera cache failed:", e);
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
        const cutoff = Date.now() - 15 * 60_000;
        return allCameras
          .filter((c) => idSet.has(c.camera_id))
          .filter((c) => Number.isFinite(Date.parse(c.timestamp)) && Date.parse(c.timestamp) >= cutoff)
          .map((c) => ({
            camera_id: c.camera_id,
            label: `Camera ${c.camera_id}`,
            image_url: c.image,
            checkpoint: "expressway",
            timestamp: c.timestamp,
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
export function useLiveBusArrivals(stopCode: string = "45131") {
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

/** Only publish recent observations. An old snapshot must not look live. */
export function useLiveTraffic(checkpoint?: string, direction?: string) {
  return useQuery({
    queryKey: ["live-traffic", checkpoint, direction],
    queryFn: async (): Promise<TrafficSnapshot[]> => {
      // The existing collector has not been validated as a direction-specific
      // border signal. Keep its cards hidden until the source and schedule pass
      // the checks recorded in docs/data-collection-runbook-2026-10.md.
      if (process.env.NEXT_PUBLIC_ROAD_STATUS_VERIFIED !== "true") return [];
      try {
        let query = supabase
          .from("traffic_snapshots")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(8);

        if (checkpoint) query = query.eq("checkpoint", checkpoint);
        query = query.eq("direction", direction || "sg_to_jb");

        const { data, error } = await query;
        if (error) throw error;

        if (data && data.length > 0) {
          const seen = new Map<string, typeof data[0]>();
          for (const row of data) {
            const key = `${row.checkpoint}:${row.direction}`;
            if (!seen.has(key)) seen.set(key, row);
          }
          const cutoff = Date.now() - 15 * 60 * 1000;
          return Array.from(seen.values()).filter((row) =>
            Number.isFinite(Date.parse(row.created_at)) && Date.parse(row.created_at) >= cutoff
          ).map((row) => ({
            id: row.id,
            checkpoint: row.checkpoint,
            direction: row.direction,
            status: row.status as TrafficStatus,
            travel_time_min: row.travel_time_min,
            updated_at: row.created_at,
          }));
        }
      } catch (e) {
        console.warn("Live traffic fetch failed:", e);
      }
      return [];
    },
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
  });
}

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
        query = query.eq("direction", direction || "sg_to_jb");

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
        console.warn("Hourly pattern fetch failed:", e);
      }
      return [];
    },
    staleTime: 60 * 60 * 1000,
  });
}
