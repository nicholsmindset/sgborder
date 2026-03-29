"use client";
import { StatusBadge } from "./StatusBadge";
import { TravelTimeBar } from "./TravelTimeBar";
import { LastUpdated } from "./LastUpdated";
import { LivePulse } from "./LivePulse";
import { CHECKPOINT_INFO, DIRECTION_LABELS } from "@/lib/constants";
import type { TrafficSnapshot } from "@/lib/types";
import { Camera, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";

const BORDER_COLORS = {
  smooth: "border-l-status-smooth",
  moderate: "border-l-status-moderate",
  heavy: "border-l-status-heavy",
  jammed: "border-l-status-jammed",
};

const HOVER_GLOWS = {
  smooth: "hover:shadow-[inset_4px_0_12px_-4px_hsl(152_60%_42%/0.3)]",
  moderate: "hover:shadow-[inset_4px_0_12px_-4px_hsl(38_85%_52%/0.3)]",
  heavy: "hover:shadow-[inset_4px_0_12px_-4px_hsl(24_90%_52%/0.3)]",
  jammed: "hover:shadow-[inset_4px_0_12px_-4px_hsl(0_72%_52%/0.3)]",
};

interface StatusCardProps {
  snapshot: TrafficSnapshot;
  onViewCameras?: () => void;
}

export const StatusCard = ({ snapshot, onViewCameras }: StatusCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const checkpoint = CHECKPOINT_INFO[snapshot.checkpoint as keyof typeof CHECKPOINT_INFO];
  const direction = DIRECTION_LABELS[snapshot.direction as keyof typeof DIRECTION_LABELS];

  return (
    <div
      className={`overflow-hidden rounded-xl border-l-4 bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 ${
        BORDER_COLORS[snapshot.status]
      } ${HOVER_GLOWS[snapshot.status]}`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between p-4 text-left active:scale-[0.99] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-inset"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-sm font-semibold text-foreground truncate">
              {checkpoint?.name ?? snapshot.checkpoint}
            </h3>
            <span className="text-label-sm text-muted-foreground">{direction}</span>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={snapshot.status} />
            <span className="font-heading text-xl font-bold tabular-nums text-foreground">
              {snapshot.travel_time_min}
              <span className="ml-0.5 text-sm font-normal text-muted-foreground">min</span>
            </span>
          </div>

          <div className="mt-3">
            <TravelTimeBar minutes={snapshot.travel_time_min} status={snapshot.status} />
          </div>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <LivePulse status={snapshot.status} size="sm" />
              <LastUpdated timestamp={snapshot.updated_at} />
            </div>
            {onViewCameras && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); onViewCameras(); }}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); e.preventDefault(); onViewCameras(); } }}
                className="inline-flex items-center gap-1 text-label-sm font-medium text-accent transition-colors hover:text-accent/80 cursor-pointer"
              >
                <Camera className="h-3.5 w-3.5" />
                {t("status_card_cameras")}
              </span>
            )}
          </div>
        </div>

        <ChevronDown
          className={`mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Smooth expand/collapse */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-4 pb-4 pt-3">
            <p className="text-label-sm text-muted-foreground">
              {t("status_card_historical_avg")}: ~{Math.round(snapshot.travel_time_min * 0.85)} {t("minutes")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
