"use client";
import { useState } from "react";
import { Bus, Loader2, ChevronDown, ChevronUp, Users, Armchair, AlertTriangle } from "lucide-react";
import { useLiveBusArrivals } from "@/hooks/useLiveData";
import { LiveCountdown } from "./LiveCountdown";
import { BusStopSelector } from "./BusStopSelector";
import { RefreshIndicator } from "./RefreshIndicator";
import { useTranslation } from "@/lib/i18n";

const LOAD_CONFIG: Record<string, { bg: string; text: string; label: string; icon: typeof Armchair }> = {
  seats: { bg: "bg-status-smooth/15", text: "text-status-smooth", label: "Seats", icon: Armchair },
  standing: { bg: "bg-status-moderate/15", text: "text-status-moderate", label: "Standing", icon: Users },
  limited: { bg: "bg-status-jammed/15", text: "text-status-jammed", label: "Full", icon: AlertTriangle },
  unknown: { bg: "bg-muted", text: "text-muted-foreground", label: "", icon: Bus },
};

interface BusServiceRowProps {
  serviceNo: string;
  times: (string | null)[];
  loads: string[];
}

const CrowdBadge = ({ load, compact = false }: { load: string; compact?: boolean }) => {
  const cfg = LOAD_CONFIG[load] || LOAD_CONFIG.unknown;
  if (load === "unknown" || !cfg.label) return null;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 ${cfg.bg} ${cfg.text} text-[10px] font-semibold leading-none`}>
      <Icon className="h-2.5 w-2.5" />
      {!compact && <span>{cfg.label}</span>}
    </span>
  );
};

export const CrowdLegend = () => (
  <div className="flex flex-wrap items-center gap-2 text-[11px]">
    <span className="text-muted-foreground font-medium">Crowd:</span>
    {(["seats", "standing", "limited"] as const).map((key) => {
      const cfg = LOAD_CONFIG[key];
      const Icon = cfg.icon;
      return (
        <span key={key} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${cfg.bg} ${cfg.text} font-semibold`}>
          <Icon className="h-2.5 w-2.5" />
          {cfg.label}
        </span>
      );
    })}
  </div>
);

const BusServiceRow = ({ serviceNo, times, loads }: BusServiceRowProps) => {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border/50 last:border-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
        <Bus className="h-4 w-4 text-accent" />
      </div>
      <span className="font-heading text-sm font-bold text-foreground min-w-[3rem]">{serviceNo}</span>
      <div className="flex items-center gap-3 ml-auto">
        {times.map((time, i) => (
          <div key={i} className={`flex flex-col items-end gap-0.5 ${i === 0 ? "min-w-[4rem]" : "min-w-[3rem] hidden sm:flex"}`}>
            <LiveCountdown
              targetTime={time}
              className={`text-sm font-semibold ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}
            />
            {i === 0 ? (
              <CrowdBadge load={loads[i]} />
            ) : (
              <CrowdBadge load={loads[i]} compact />
            )}
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
            {/* Crowd legend + header */}
            <div className="py-2">
              <CrowdLegend />
            </div>
            <div className="flex items-center justify-between py-2 text-label-sm text-muted-foreground border-b border-border/30">
              <span>Service</span>
              <div className="flex gap-3">
                <span className="min-w-[4rem] text-right">{t("bus_next")}</span>
                <span className="min-w-[3rem] text-right hidden sm:block">2nd</span>
                <span className="min-w-[3rem] text-right hidden sm:block">3rd</span>
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
