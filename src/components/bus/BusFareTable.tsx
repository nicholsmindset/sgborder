import { BUS_ROUTES } from "@/lib/bus-data";
import { useTranslation } from "@/lib/i18n";

export const BusFareTable = () => {
  const { t } = useTranslation();
  const sorted = [...BUS_ROUTES].sort((a, b) => a.fare_sgd - b.fare_sgd);

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left font-heading text-label font-semibold text-foreground">{t("fare_service")}</th>
            <th className="px-4 py-3 text-left font-heading text-label font-semibold text-foreground">{t("fare_route")}</th>
            <th className="px-4 py-3 text-right font-heading text-label font-semibold text-foreground">{t("fare_sgd")}</th>
            <th className="px-4 py-3 text-right font-heading text-label font-semibold text-foreground">{t("fare_myr")}</th>
            <th className="hidden px-4 py-3 text-right font-heading text-label font-semibold text-foreground sm:table-cell">{t("fare_duration")}</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr key={r.service_no} className={`border-b border-border last:border-0 ${i === 0 ? "bg-status-smooth-tint" : ""}`}>
              <td className="px-4 py-3 font-heading font-bold text-foreground">{r.service_no}</td>
              <td className="px-4 py-3 text-muted-foreground truncate max-w-[160px]">{r.route_name}</td>
              <td className="px-4 py-3 text-right tabular-nums font-medium text-foreground">${r.fare_sgd.toFixed(2)}</td>
              <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">RM{r.fare_myr.toFixed(2)}</td>
              <td className="hidden px-4 py-3 text-right tabular-nums text-muted-foreground sm:table-cell">~{r.typical_duration_min} {t("minutes")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
