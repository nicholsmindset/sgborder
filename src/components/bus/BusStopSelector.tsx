import { MapPin, ChevronDown } from "lucide-react";

export const BUS_STOP_OPTIONS = [
  { code: "45009", name: "Kranji MRT", checkpoint: "woodlands" },
  { code: "46009", name: "Woodlands Int", checkpoint: "woodlands" },
  { code: "01029", name: "Queen Street", checkpoint: "woodlands" },
  { code: "22009", name: "Jurong Town Hall", checkpoint: "tuas" },
  { code: "25009", name: "Tuas Link MRT", checkpoint: "tuas" },
] as const;

interface BusStopSelectorProps {
  value: string;
  onChange: (stopCode: string) => void;
}

export const BusStopSelector = ({ value, onChange }: BusStopSelectorProps) => {
  const selected = BUS_STOP_OPTIONS.find((s) => s.code === value);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MapPin className="h-4 w-4 text-accent" />
      </div>
      <select
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
