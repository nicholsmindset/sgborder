import { useEffect, useState } from "react";
import { LivePulse } from "./LivePulse";
import { useTranslation } from "@/lib/i18n";
import { Radio } from "lucide-react";

interface LiveDataTickerProps {
  /** ISO timestamp of last data update */
  lastUpdated?: string;
  /** Refetch interval in ms (default 5 min) */
  refetchInterval?: number;
  /** Overall status for pulse color */
  status?: "smooth" | "moderate" | "heavy" | "jammed";
}

export const LiveDataTicker = ({
  lastUpdated,
  refetchInterval = 5 * 60 * 1000,
  status = "smooth",
}: LiveDataTickerProps) => {
  const { t } = useTranslation();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 10_000);
    return () => clearInterval(id);
  }, []);

  const updatedAt = lastUpdated ? new Date(lastUpdated).getTime() : null;
  const diffSec = updatedAt ? Math.max(0, Math.floor((now - updatedAt) / 1000)) : null;

  // Time ago string
  let timeAgo = "";
  if (diffSec === null) {
    timeAgo = "—";
  } else if (diffSec < 60) {
    timeAgo = t("live_ticker_just_now");
  } else if (diffSec < 3600) {
    const mins = Math.floor(diffSec / 60);
    timeAgo = `${mins}m ${t("live_ticker_ago")}`;
  } else {
    const hrs = Math.floor(diffSec / 3600);
    timeAgo = `${hrs}h ${t("live_ticker_ago")}`;
  }

  // Next refresh countdown
  const secSinceUpdate = diffSec ?? 0;
  const secUntilRefresh = Math.max(0, Math.floor(refetchInterval / 1000) - secSinceUpdate);
  const refreshMin = Math.floor(secUntilRefresh / 60);
  const refreshSec = secUntilRefresh % 60;

  // Freshness indicator
  const isFresh = diffSec !== null && diffSec < 600; // < 10 min

  return (
    <div className="rounded-lg border border-border bg-card/80 backdrop-blur-sm px-3 py-2 shadow-sm">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Left: Live badge + last updated */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-full bg-status-smooth/10 pl-1.5 pr-2.5 py-0.5">
            <LivePulse status={status} size="sm" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-status-smooth">
              {t("live_ticker_label")}
            </span>
          </div>
          <div className="h-3.5 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <Radio className={`h-3 w-3 ${isFresh ? "text-status-smooth" : "text-status-moderate"}`} />
            <span className="text-[12px] text-muted-foreground">
              {t("live_ticker_updated")}{" "}
              <span className={`font-semibold tabular-nums ${isFresh ? "text-foreground" : "text-status-moderate"}`}>
                {timeAgo}
              </span>
            </span>
          </div>
        </div>

        {/* Right: Source + countdown */}
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] text-muted-foreground">
            {t("live_ticker_source")}
          </span>
          {secUntilRefresh > 0 && (
            <>
              <div className="h-3.5 w-px bg-border" />
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {t("live_ticker_next_refresh")}{" "}
                <span className="font-medium text-foreground">
                  {refreshMin}:{refreshSec.toString().padStart(2, "0")}
                </span>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
