import { StatusCard } from "@/components/dashboard/StatusCard";
import { CameraGrid } from "@/components/dashboard/CameraGrid";
import { HourlyHeatmap } from "@/components/dashboard/HourlyHeatmap";
import { BusRouteCard } from "@/components/bus/BusRouteCard";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BUS_ROUTES } from "@/lib/bus-data";
import { useLiveTraffic, useLiveHourlyPattern } from "@/hooks/useLiveData";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, DollarSign, Clock, Loader2 } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { LivePulse } from "@/components/dashboard/LivePulse";
import { LiveDataTicker } from "@/components/dashboard/LiveDataTicker";
import { useTranslation } from "@/lib/i18n";

const TuasPage = () => {
  const { data: snapshots, isLoading: trafficLoading } = useLiveTraffic("tuas");
  const { data: hourlyData, isLoading: hourlyLoading } = useLiveHourlyPattern("tuas");
  const busRoutes = BUS_ROUTES.filter((r) => r.via_checkpoint === "tuas");
  const { t } = useTranslation();

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="Tuas Checkpoint Live CCTV Camera & Traffic Today (2026) — Second Link Status"
        description="Tuas Checkpoint traffic today with live LTA CCTV cameras, Second Link wait times & bus info. Less crowded than Woodlands — check Tuas status before you cross to JB."
        path="/tuas"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Place",
          name: "Tuas Checkpoint (Second Link)",
          description: "Singapore's Tuas Checkpoint connecting to Johor Bahru via the Malaysia-Singapore Second Link.",
          geo: { "@type": "GeoCoordinates", latitude: 1.34029, longitude: 103.63649 },
          address: { "@type": "PostalAddress", addressCountry: "SG", addressLocality: "Tuas" },
        }}
      />
      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8">
          <div className="flex items-center gap-3 mb-3">
            <LivePulse size="lg" />
            <span className="text-sm font-bold uppercase tracking-widest text-status-smooth">{t("home_live")}</span>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {t("tuas_h1")}
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {t("tuas_hero_sub")}
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <RevealSection>
        <div className="container">
          <div className="flex flex-wrap gap-4 rounded-xl border border-border bg-card p-4 shadow-card text-sm">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <DollarSign className="h-4 w-4 text-accent" /> {t("checkpoint_toll")}: S$2.10
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4 text-accent" /> {t("checkpoint_typical")}: 15-30 {t("minutes")}
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" /> Tuas Checkpoint
            </span>
          </div>
        </div>
      </RevealSection>

      {/* Live data ticker */}
      <RevealSection>
        <div className="container">
          <LiveDataTicker
            lastUpdated={snapshots?.[0]?.updated_at}
            status={snapshots?.[0]?.status}
          />
        </div>
      </RevealSection>

      {/* Live status */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">{t("checkpoint_live_status")}</h2>
          {trafficLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-label-sm text-muted-foreground">{t("loading")}</span>
            </div>
          ) : snapshots && snapshots.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {snapshots.map((s) => (
                <StatusCard key={s.id} snapshot={s} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-sm text-muted-foreground">{t("checkpoint_no_data")}</p>
            </div>
          )}
        </div>
      </RevealSection>

      {/* Cameras */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">{t("checkpoint_traffic_cameras")}</h2>
          <CameraGrid checkpoint="tuas" />
        </div>
      </RevealSection>

      {/* Heatmap */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-1">{t("checkpoint_todays_pattern")}</h2>
          <p className="text-label-sm text-muted-foreground mb-3">
            {t("checkpoint_historical_avg")} {new Date().toLocaleDateString("en-SG", { weekday: "long" })}
          </p>
          {hourlyLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : hourlyData && hourlyData.length > 0 ? (
            <HourlyHeatmap data={hourlyData} />
          ) : (
            <p className="text-label-sm text-muted-foreground py-4">{t("checkpoint_pattern_collecting")}</p>
          )}
        </div>
      </RevealSection>

      {/* Buses */}
      <RevealSection>
        <div className="container">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-title font-bold">{t("checkpoint_buses_via")} {t("checkpoint_tuas")}</h2>
            <Link to="/bus" className="inline-flex items-center gap-1 text-label font-medium text-accent hover:text-accent/80 transition-colors">
              {t("checkpoint_all_buses")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {busRoutes.map((r) => (
              <BusRouteCard key={r.service_no} route={r} />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Why Tuas */}
      <RevealSection>
        <div className="container">
          <div className="rounded-xl bg-muted/50 border border-border p-4">
            <h2 className="font-heading text-sm font-semibold text-foreground mb-2">{t("tuas_why_choose")}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>{t("tuas_why_1")}</li>
              <li>{t("tuas_why_2")}</li>
              <li>{t("tuas_why_3")}</li>
              <li>{t("tuas_why_4")}</li>
            </ul>
          </div>
        </div>
      </RevealSection>

      {/* FAQs */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-4">{t("tuas_faq_title")}</h2>
          <FAQAccordion faqs={[
            { question: "How long does it take to cross at Tuas?", answer: "Off-peak: 10-20 minutes. Moderate: 25-40 minutes. Peak: 45-75 minutes. Tuas rarely hits the extreme waits seen at Woodlands." },
            { question: "What is the toll at Tuas?", answer: "S$2.10 for cars — higher than Woodlands (S$0.80) due to the longer bridge. The time saved during peak hours usually makes it worthwhile." },
            { question: "When should I choose Tuas over Woodlands?", answer: "During Friday evening (4-10 PM), Saturday morning (7 AM-12 PM), public holidays, and any time Woodlands shows Heavy or Jammed on our dashboard." },
            { question: "What buses go through Tuas?", answer: "CW3 (Jurong Town Hall), CW7 (Tuas Link MRT), 160 (Jurong Town Hall to JB Sentral), CW4 (Jurong to Gelang Patah), and CW6 (Boon Lay to Perling Mall)." },
            { question: "Where does Tuas Second Link lead to in JB?", answer: "Tuas Second Link connects to the western side of Johor. It's closest to Gelang Patah, Nusajaya (Iskandar Puteri), and Legoland. For JB city centre, you'll need to drive east (~30 min)." },
          ]} />
        </div>
      </RevealSection>
    </div>
  );
};

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return <section ref={ref} className="reveal py-4">{children}</section>;
};

export default TuasPage;
