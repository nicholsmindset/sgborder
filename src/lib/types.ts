import type { TrafficStatus } from "./constants";

export interface TrafficSnapshot {
  id: string;
  checkpoint: string;
  direction: string;
  status: TrafficStatus;
  travel_time_min: number;
  updated_at: string;
}

export interface BusArrival {
  service_no: string;
  operator: string;
  next_arrivals: number[]; // minutes from now
  load: "seats" | "standing" | "limited";
  route_name: string;
}

export interface CameraFeed {
  camera_id: string;
  label: string;
  image_url: string;
  checkpoint: string;
}

export interface HourlyPattern {
  hour: number;
  avg_travel_time: number;
  avg_status: TrafficStatus;
}

export interface BusRoute {
  service_no: string;
  operator: string;
  route_name: string;
  sg_departure: string;
  jb_arrival: string;
  via_checkpoint: "woodlands" | "tuas";
  fare_sgd: number;
  fare_myr: number;
  first_bus: string;
  last_bus: string;
  frequency_peak: string;
  frequency_offpeak: string;
  payment_methods: string[];
  typical_duration_min: number;
  tips: string;
  slug: string;
}
