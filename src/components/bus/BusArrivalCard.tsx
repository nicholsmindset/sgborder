import { useState } from "react";
import { Bus, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useLiveBusArrivals } from "@/hooks/useLiveData";
import { LiveCountdown } from "./LiveCountdown";
import { BusStopSelector } from "./BusStopSelector";
import { RefreshIndicator } from "./RefreshIndicator";
import { useTranslation } from "@/lib/i18n";

const LOAD_COLORS: Record<string, string> = {
  seats: "bg-status-smooth",
  standing: "bg-status-moderate",
  limited: "bg-status-jammed",
  unknown: "bg-muted-foreground",
};

const LOAD_KEYS: Record<string, "bus_seats" | "bus_standing" | "bus_limited" | null> = {
  seats: "bus_seats",
  standing: "bus_standing",
  limited: "bus_limited",
  unknown: null,
};

interface BusServiceRowProps {
  serviceNo: string;
  times: (string | null)[];
  loads: string[];
}

const BusServiceRow = ({ serviceNo, times, loads }: BusServiceRowProps) => {
  const { t } = useTranslation();
  const loadColor = LOAD_COLORS[loads[0]] || LOAD_COLORS.unknown;
  const loadKey = LOAD_KEYS[loads[0]];
  const loadLabel = loadKey ? t(loadKey) : "";

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border/50 last:border-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
        <Bus className="h-4 w-4 text-accent" />
      </div>
      <div className="flex items-center gap-1.5 min-w-[3.5rem]">
        <span className="font-heading text-sm font-bold text-foreground">{serviceNo}</span>
        <span className={`h-1.5 w-1.5 rounded-full ${loadColor}`} title={loadLabel} />
      </div>
      <div className="flex items-center gap-3 ml-auto">
        {times.map((time, i) => (
          <div key={i} className={`text-right ${i === 0 ? "min-w-[3rem]" : "min-w-[2.5rem] hidden sm:block"}`}>
            <LiveCountdown
              targetTime={time}
              className={`text-sm font-semibold ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface QuickBusWidgetProps {
  stopCode?: string;
  showStopSelector?: boolean;
  maxServices?: number;
}

export const QuickBusWidget = ({
  stopCode: initialStopCode = "45009",
  showStopSelector = true,
  maxServices = 4,
}: QuickBusWidgetProps) => {
  const [stopCode, setStopCode] = useState(initialStopCode);
  const [expanded, setExpanded] = useState(false);
  const { data: liveData, isLoading, dataUpdatedAt } = useLiveBusArrivals(stopCode);
  const { t } = useTranslation();

  const services = liveData?.services || [];
  const displayServices = expanded ? services : services.slice(0, maxServices);

  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
      {showStopSelector && (
        <div className="p-3 border-b border-border/50">
          <BusStopSelector value={stopCode} onChange={setStopCode} />
        </div>
      )}

      <div className="px-3 pt-1 pb-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="ml-2 text-label-sm text-muted-foreground">{t("loading")}</span>
          </div>
        ) : services.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">{t("bus_no_services")}</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between py-2 text-label-sm text-muted-foreground">
              <span>Service</span>
              <div className="flex gap-3">
                <span className="min-w-[3rem] text-right">{t("bus_next")}</span>
                <span className="min-w-[2.5rem] text-right hidden sm:block">2nd</span>
                <span className="min-w-[2.5rem] text-right hidden sm:block">3rd</span>
              </div>
            </div>

            {/* Service rows */}
            {displayServices.map((svc) => (
              <BusServiceRow
                key={svc.service_no}
                serviceNo={svc.service_no}
                times={[svc.next_bus_1, svc.next_bus_2, svc.next_bus_3]}
                loads={[svc.load_1, svc.load_2, svc.load_3]}
              />
            ))}
          </>
        )}
      </div>

      {/* Footer: expand + refresh indicator */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-border/50 bg-muted/30">
        {services.length > maxServices ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-label-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            {expanded ? (
              <>{t("bus_show_less")} <ChevronUp className="h-3.5 w-3.5" /></>
            ) : (
              <>{t("bus_show_all")} {services.length} {t("bus_services")} <ChevronDown className="h-3.5 w-3.5" /></>
            )}
          </button>
        ) : (
          <span />
        )}
        <RefreshIndicator
          intervalMs={30_000}
          lastUpdated={dataUpdatedAt ? new Date(dataUpdatedAt).toISOString() : null}
        />
      </div>
    </div>
  );
};

// Keep backward compat export
export const BusArrivalCard = BusServiceRow;
