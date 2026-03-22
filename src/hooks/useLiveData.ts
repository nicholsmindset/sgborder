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

/** Fetches live traffic camera images, falls back to DB cache */
export function useLiveCameras(checkpoint?: string) {
  return useQuery({
    queryKey: ["live-cameras", checkpoint],
    queryFn: async (): Promise<CameraFeed[]> => {
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
        console.warn("Live cameras fetch failed, falling back to DB:", e);
      }

      // Fallback: read from DB cache
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

      // Final fallback: return empty (components will show mock data)
      return [];
    },
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    staleTime: 2 * 60 * 1000,
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

/** Fetches latest traffic snapshots from Supabase, falls back to empty */
export function useLiveTraffic(checkpoint?: string, direction?: string) {
  return useQuery({
    queryKey: ["live-traffic", checkpoint, direction],
    queryFn: async (): Promise<TrafficSnapshot[]> => {
      try {
        let query = supabase
          .from("traffic_snapshots")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(8); // fetch enough to cover all combos

        if (checkpoint) query = query.eq("checkpoint", checkpoint);
        if (direction) query = query.eq("direction", direction);

        const { data, error } = await query;
        if (error) throw error;

        if (data && data.length > 0) {
          // Deduplicate: keep only the latest per checkpoint+direction
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
        console.warn("Live traffic fetch failed:", e);
      }
      return []; // Empty = components fall back to mock
    },
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    staleTime: 2 * 60 * 1000,
  });
}

/** Fetches historical hourly averages for today's day of week */
export function useLiveHourlyPattern(checkpoint?: string, direction?: string) {
  return useQuery({
    queryKey: ["hourly-pattern", checkpoint, direction],
    queryFn: async (): Promise<HourlyPattern[]> => {
      try {
        const dow = new Date().getDay(); // 0=Sunday
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
        console.warn("Hourly pattern fetch failed:", e);
      }
      return []; // Empty = components fall back to mock
    },
    staleTime: 60 * 60 * 1000, // 1 hour -- historical data changes slowly
  });
}
