import { useParams, Link } from "react-router-dom";
import { BUS_ROUTES } from "@/lib/bus-data";
import { useLiveBusArrivals } from "@/hooks/useLiveData";
import { LiveCountdown } from "@/components/bus/LiveCountdown";
import { ArrowLeft, Clock, DollarSign, MapPin, CreditCard, Bus } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { useTranslation } from "@/lib/i18n";

const BusRoutePage = () => {
  const { t } = useTranslation();
  const { service } = useParams<{ service: string }>();
  const route = BUS_ROUTES.find((r) => r.slug === service);
  const { data: liveData } = useLiveBusArrivals("45009");

  if (!route) {
    return (
      <div className="container py-16 text-center pb-mobile-nav">
        <p className="text-muted-foreground">Route not found.</p>
        <Link to="/bus" className="mt-4 inline-block text-accent hover:underline">Back to buses</Link>
      </div>
    );
  }

  const liveSvc = liveData?.services?.find((s) => s.service_no === route.service_no);

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title={`${route.service_no} Bus to JB — ${route.route_name} Route, Fare & Schedule 2026`}
        description={`Complete ${route.service_no} bus guide: ${route.route_name} with live arrivals, S$${route.fare_sgd}/RM${route.fare_myr} fares, first/last bus timing & tips for crossing via ${route.via_checkpoint === "woodlands" ? "Woodlands" : "Tuas"}.`}
        path={`/bus/${route.slug}`}
        breadcrumbs={[{ name: "Buses", path: "/bus" }, { name: `Bus ${route.service_no}`, path: `/bus/${route.slug}` }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BusTrip",
          name: `Bus ${route.service_no} — ${route.route_name}`,
          departureBusStop: { "@type": "BusStop", name: route.sg_departure },
          arrivalBusStop: { "@type": "BusStop", name: route.jb_arrival },
          provider: { "@type": "Organization", name: route.operator },
          offers: {
            "@type": "Offer",
            price: route.fare_sgd,
            priceCurrency: "SGD",
          },
        }}
      />
      <div className="container pt-6 pb-8">
        {/* Breadcrumb */}
        <Link to="/bus" className="inline-flex items-center gap-1 text-label text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("bus_route_back")}
        </Link>

        {/* Hero */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground font-heading text-xl font-bold">
            {route.service_no}
          </div>
          <div>
            <h1 className="font-heading text-display-sm font-bold text-foreground">{route.route_name}</h1>
            <p className="text-sm text-muted-foreground">
              {route.operator} · via {route.via_checkpoint === "woodlands" ? "Woodlands" : "Tuas"}
            </p>
          </div>
        </div>

        {/* Live arrival */}
        {liveSvc && (
          <div className="mb-6">
            <h2 className="font-heading text-label font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {t("bus_route_next_bus")}
            </h2>
            <div className="rounded-xl border border-border bg-card p-4 shadow-card">
              <div className="flex items-center gap-3">
                <Bus className="h-5 w-5 text-accent" />
                <span className="font-heading text-sm font-bold">{liveSvc.service_no}</span>
              </div>
              <div className="mt-3 flex items-center gap-4">
                {[liveSvc.next_bus_1, liveSvc.next_bus_2, liveSvc.next_bus_3].map((time, i) => (
                  <div key={i} className="text-center">
                    <p className="text-label-sm text-muted-foreground mb-0.5">{i === 0 ? "Next" : `${i + 1}${i === 1 ? "nd" : "rd"}`}</p>
                    <LiveCountdown targetTime={time} className="text-lg font-semibold text-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Details grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard icon={Clock} label={t("bus_route_schedule")} items={[
            `${t("bus_route_first_bus")}: ${route.first_bus}`,
            `${t("bus_route_last_bus")}: ${route.last_bus}`,
            `${t("bus_route_peak")}: every ${route.frequency_peak}`,
            `${t("bus_route_offpeak")}: every ${route.frequency_offpeak}`,
          ]} />
          <InfoCard icon={DollarSign} label={t("bus_route_fares")} items={[
            `S$${route.fare_sgd.toFixed(2)} (SGD)`,
            `RM${route.fare_myr.toFixed(2)} (MYR)`,
          ]} />
          <InfoCard icon={MapPin} label={t("bus_route_route")} items={[
            `${t("bus_route_from")}: ${route.sg_departure}`,
            `${t("bus_route_to")}: ${route.jb_arrival}`,
            `${t("bus_route_duration")}: ~${route.typical_duration_min} min`,
          ]} />
          <InfoCard icon={CreditCard} label={t("bus_route_payment")} items={route.payment_methods} />
        </div>

        {/* Tips */}
        <div className="mt-6 rounded-xl bg-muted/50 border border-border p-4">
          <h2 className="font-heading text-sm font-semibold text-foreground mb-1">{t("bus_route_tips")}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{route.tips}</p>
        </div>

        {/* Alternative routes */}
        <div className="mt-6">
          <h2 className="font-heading text-title font-bold mb-2">{t("bus_route_alternatives")}</h2>
          <div className="flex flex-wrap gap-2">
            {BUS_ROUTES.filter((r) => r.slug !== route.slug && r.via_checkpoint === route.via_checkpoint)
              .slice(0, 3)
              .map((r) => (
                <Link
                  key={r.slug}
                  to={`/bus/${r.slug}`}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-label font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {r.service_no} — {r.route_name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({
  icon: Icon,
  label,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  items: string[];
}) => (
  <div className="rounded-xl border border-border bg-card p-4 shadow-card">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="h-4 w-4 text-accent" />
      <h3 className="font-heading text-label font-semibold text-foreground">{label}</h3>
    </div>
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-muted-foreground">{item}</li>
      ))}
    </ul>
  </div>
);

export default BusRoutePage;
