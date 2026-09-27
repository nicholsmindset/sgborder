"use client";
import { MapPin, ChevronDown } from "lucide-react";

export const BUS_STOP_OPTIONS = [
  { code: "45131", name: "Opp Kranji Stn · toward JB", checkpoint: "woodlands" },
  { code: "47009", name: "Woodlands Temp Int · 950", checkpoint: "woodlands" },
  { code: "46101", name: "Woodlands Checkpoint · toward JB", checkpoint: "woodlands" },
  { code: "29009", name: "Jurong Town Hall Int · 160 via Woodlands", checkpoint: "woodlands" },
] as const;

interface BusStopSelectorProps {
  value: string;
  onChange: (stopCode: string) => void;
}

export const BusStopSelector = ({ value, onChange }: BusStopSelectorProps) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MapPin className="h-4 w-4 text-accent" />
      </div>
      <select
        aria-label="Cross-border public bus stop"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-border bg-card py-2.5 pl-9 pr-9 text-sm font-semibold text-foreground shadow-card transition-colors hover:border-accent/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
      >
        {BUS_STOP_OPTIONS.map((stop) => (
          <option key={stop.code} value={stop.code}>
            {stop.name} ({stop.code})
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};
