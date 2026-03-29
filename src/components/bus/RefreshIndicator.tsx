"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";

interface RefreshIndicatorProps {
  intervalMs: number;
  lastUpdated?: string | null;
}

export const RefreshIndicator = ({ intervalMs, lastUpdated }: RefreshIndicatorProps) => {
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(Math.floor(intervalMs / 1000));
  const { t } = useTranslation();

  useEffect(() => {
    if (!lastUpdated) return;

    const update = () => {
      const elapsed = Date.now() - new Date(lastUpdated).getTime();
      const remaining = Math.max(0, Math.floor((intervalMs - elapsed) / 1000));
      setSecondsUntilRefresh(remaining);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated, intervalMs]);

  return (
    <div className="flex items-center gap-2 text-label-sm text-muted-foreground">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-smooth opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-status-smooth" />
      </span>
      <span className="tabular-nums">
        {t("bus_refresh_in")} {secondsUntilRefresh}s
      </span>
    </div>
  );
};
