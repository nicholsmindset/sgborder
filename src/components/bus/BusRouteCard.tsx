import type { BusRoute } from "@/lib/types";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, DollarSign } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export const BusRouteCard = ({ route }: { route: BusRoute }) => {
  const { t } = useTranslation();
  return (
  <Link
    to={`/bus/${route.slug}`}
    className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-card-hover active:scale-[0.98]"
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground font-heading text-sm font-bold">
      {route.service_no}
    </div>
    <div className="min-w-0 flex-1">
      <p className="font-heading text-sm font-semibold text-foreground">{route.route_name}</p>
      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-label-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" />
          ~{route.typical_duration_min} {t("minutes")}
        </span>
        <span className="inline-flex items-center gap-1">
          <DollarSign className="h-3 w-3" />
          S${route.fare_sgd.toFixed(2)}
        </span>
        <span className="capitalize">{route.via_checkpoint}</span>
      </div>
    </div>
    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
  </Link>
  );
};
