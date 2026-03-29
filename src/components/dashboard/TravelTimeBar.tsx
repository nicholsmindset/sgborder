"use client";
import type { TrafficStatus } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

const BAR_COLORS: Record<TrafficStatus, string> = {
  smooth: "bg-status-smooth",
  moderate: "bg-status-moderate",
  heavy: "bg-status-heavy",
  jammed: "bg-status-jammed",
};

export const TravelTimeBar = ({
  minutes,
  status,
  maxMin = 120,
}: {
  minutes: number;
  status: TrafficStatus;
  maxMin?: number;
}) => {
  const { t } = useTranslation();
  const pct = Math.min((minutes / maxMin) * 100, 100);

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out ${BAR_COLORS[status]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="tabular-nums text-label-sm font-semibold text-foreground">
        {minutes}<span className="ml-0.5 font-normal text-muted-foreground">{t("minutes")}</span>
      </span>
    </div>
  );
};
