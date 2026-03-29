"use client";
import type { HourlyPattern } from "@/lib/types";
import type { TrafficStatus } from "@/lib/constants";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";

const STATUS_BG: Record<TrafficStatus, string> = {
  smooth: "bg-status-smooth",
  moderate: "bg-status-moderate",
  heavy: "bg-status-heavy",
  jammed: "bg-status-jammed",
};

const OPACITY_MAP: Record<TrafficStatus, string> = {
  smooth: "opacity-30",
  moderate: "opacity-50",
  heavy: "opacity-75",
  jammed: "opacity-100",
};

const formatHour = (h: number) => {
  if (h === 0) return "12AM";
  if (h === 12) return "12PM";
  return h < 12 ? `${h}AM` : `${h - 12}PM`;
};

const STATUS_KEYS: Record<TrafficStatus, "status_smooth" | "status_moderate" | "status_heavy" | "status_jammed"> = {
  smooth: "status_smooth",
  moderate: "status_moderate",
  heavy: "status_heavy",
  jammed: "status_jammed",
};

export const HourlyHeatmap = ({ data }: { data: HourlyPattern[] }) => {
  const [tooltip, setTooltip] = useState<HourlyPattern | null>(null);
  const currentHour = new Date().getHours();
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex gap-px">
        {data.map((d) => (
          <button
            key={d.hour}
            onMouseEnter={() => setTooltip(d)}
            onMouseLeave={() => setTooltip(null)}
            onFocus={() => setTooltip(d)}
            onBlur={() => setTooltip(null)}
            className={`relative flex-1 rounded-sm transition-all duration-150 hover:scale-y-110 ${
              STATUS_BG[d.avg_status]
            } ${OPACITY_MAP[d.avg_status]} ${
              d.hour === currentHour ? "ring-2 ring-foreground ring-offset-1" : ""
            }`}
            style={{ height: "32px" }}
            aria-label={`${formatHour(d.hour)}: ${d.avg_status}, ~${d.avg_travel_time} min`}
          />
        ))}
      </div>

      {/* Hour labels */}
      <div className="mt-1 flex justify-between text-label-sm text-muted-foreground">
        <span>12AM</span>
        <span>6AM</span>
        <span>12PM</span>
        <span>6PM</span>
        <span>12AM</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="mt-2 rounded-lg bg-primary px-3 py-2 text-label-sm text-primary-foreground">
          <span className="font-medium">{formatHour(tooltip.hour)}</span>
          {" · "}
          <span>{t(STATUS_KEYS[tooltip.avg_status])}</span>
          {" · ~"}
          <span className="tabular-nums font-medium">{tooltip.avg_travel_time} {t("heatmap_min")}</span>
        </div>
      )}
    </div>
  );
};
