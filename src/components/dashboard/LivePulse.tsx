interface LivePulseProps {
  status?: "smooth" | "moderate" | "heavy" | "jammed";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: { dot: "h-2 w-2", ring1: "h-4 w-4", ring2: "h-6 w-6", glow: "4px" },
  md: { dot: "h-2.5 w-2.5", ring1: "h-5 w-5", ring2: "h-7 w-7", glow: "6px" },
  lg: { dot: "h-3 w-3", ring1: "h-6 w-6", ring2: "h-8 w-8", glow: "8px" },
};

const STATUS_COLOR = {
  smooth: "bg-status-smooth",
  moderate: "bg-status-moderate",
  heavy: "bg-status-heavy",
  jammed: "bg-status-jammed",
};

const STATUS_RING = {
  smooth: "border-status-smooth",
  moderate: "border-status-moderate",
  heavy: "border-status-heavy",
  jammed: "border-status-jammed",
};

export const LivePulse = ({ status = "smooth", size = "sm", className = "" }: LivePulseProps) => {
  const s = SIZE_MAP[size];
  const color = STATUS_COLOR[status];
  const ring = STATUS_RING[status];

  return (
    <span className={`relative inline-flex items-center justify-center ${s.ring2} ${className}`}>
      {/* Outer ring — slow fade */}
      <span className={`absolute inset-0 rounded-full border ${ring} opacity-0 animate-live-ring-outer`} />
      {/* Inner ring — faster fade */}
      <span className={`absolute rounded-full ${s.ring1} border ${ring} opacity-0 animate-live-ring-inner`} style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      {/* Core dot with glow */}
      <span
        className={`relative rounded-full ${s.dot} ${color}`}
        style={{ boxShadow: `0 0 ${s.glow} 1px hsl(var(--status-${status}) / 0.5)` }}
      />
    </span>
  );
};
