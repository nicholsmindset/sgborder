"use client";
import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { LastUpdated } from "./LastUpdated";
import { CHECKPOINT_INFO } from "@/lib/constants";
import type { TrafficSnapshot } from "@/lib/types";

const BORDER_COLORS = {
  smooth: "border-l-status-smooth",
  moderate: "border-l-status-moderate",
  heavy: "border-l-status-heavy",
  jammed: "border-l-status-jammed",
};

interface StatusCardProps {
  snapshot: TrafficSnapshot;
  onViewCameras?: () => void;
}

export const StatusCard = ({ snapshot, onViewCameras }: StatusCardProps) => {
  const checkpoint = CHECKPOINT_INFO[snapshot.checkpoint as keyof typeof CHECKPOINT_INFO];
  const cameraHref = `/cameras/${snapshot.checkpoint}`;

  return (
    <article className={`rounded-xl border border-l-4 border-border bg-card p-4 shadow-card ${BORDER_COLORS[snapshot.status]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">
            {checkpoint?.name ?? snapshot.checkpoint}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Singapore approach · road conditions</p>
        </div>
        <StatusBadge status={snapshot.status} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Based on nearby Singapore road speeds. Immigration queues and the Malaysia side are not included. <Link href="/methodology" className="font-semibold text-accent underline underline-offset-2">How this works</Link>
      </p>
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
        <LastUpdated timestamp={snapshot.updated_at} />
        {onViewCameras ? (
          <button type="button" onClick={onViewCameras} className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-accent hover:underline">
            <Camera className="h-4 w-4" /> View cameras
          </button>
        ) : (
          <Link href={cameraHref} className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-accent hover:underline">
            <Camera className="h-4 w-4" /> View cameras <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </article>
  );
};
