import { useState } from "react";
import { LivePulse } from "@/components/dashboard/LivePulse";
import { LiveDataTicker } from "@/components/dashboard/LiveDataTicker";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { CheckpointToggle, DirectionToggle } from "@/components/dashboard/Toggles";
import { HourlyHeatmap } from "@/components/dashboard/HourlyHeatmap";
import { CameraGrid } from "@/components/dashboard/CameraGrid";
import { QuickBusWidget } from "@/components/bus/BusArrivalCard";
import { useLiveTraffic, useLiveHourlyPattern } from "@/hooks/useLiveData";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Loader2, Train, MapPin, Bus } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useTranslation } from "@/lib/i18n";

const homeFaqs = [
  {
    question: "How do I check causeway traffic before crossing to JB?",
    answer:
      "Use the live dashboard above to see real-time traffic status for both Woodlands and Tuas checkpoints. Status updates every 5 minutes with data from LTA and Google Routes, including CCTV camera feeds and estimated wait times.",
  },
  {
    question: "Which checkpoint is faster — Woodlands or Tuas?",
    answer:
      "It depends on the time and day. Woodlands handles more traffic but has more lanes. Tuas (Second Link) is often less congested on weekdays but can jam on weekends. Compare both checkpoints on our dashboard to decide.",
  },
  {
    question: "What is the best time to cross the causeway?",
    answer:
      "The best times are typically early morning (before 6 AM) or late evening (after 10 PM) on weekdays. Avoid Friday evenings and Saturday mornings when traffic peaks. Check our Best Time to Cross guide for hour-by-hour data.",
  },
  {
    question: "How often is the causeway traffic data updated?",
    answer:
      "Traffic status and camera images are updated every 5 minutes. Bus arrival data refreshes every 60 seconds. All data is sourced from LTA DataMall and Google Routes API.",
  },
];

const Index = () => {
  const [checkpoint, setCheckpoint] = useState("all");
  const [direction, setDirection] = useState("sg_to_jb");
  const [showCameras, setShowCameras] = useState(false);
  const { t } = useTranslation();

  const { data: snapshots, isLoading: trafficLoading } = useLiveTraffic();
  const { data: hourlyData, isLoading: hourlyLoading } = useLiveHourlyPattern();

  const filteredSnapshots = (snapshots ?? []).filter(
    (s) =>
      (checkpoint === "all" || s.checkpoint === checkpoint) &&
      s.direction === direction
  );

  const cameraCheckpoint = checkpoint === "all" ? "woodlands" : checkpoint;

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="Causeway Traffic Live — Woodlands & Tuas Checkpoint CCTV Camera Status"
        description="Live causeway traffic status for Woodlands & Tuas checkpoints. LTA CCTV cameras, bus arrivals, wait times updated every 5 min. SG to JB traffic — check now before you cross."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "SG Border Live",
            url: "https://www.sgborder.live",
            description: "Real-time Singapore-JB causeway traffic dashboard with live cameras, bus tracking, and travel predictions.",
            applicationCategory: "TravelApplication",
            operatingSystem: "Web",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SG Border Live",
            url: "https://www.sgborder.live",
            description: "Real-time Singapore-JB causeway traffic dashboard with live cameras, bus tracking, and commuter intelligence.",
            sameAs: ["https://sgborder.live"],
            areaServed: ["SG", "MY"],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SG Border Live",
            url: "https://www.sgborder.live",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://sgborder.live/guides?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFaqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
        ]}
      />

      {/* ── Hero Banner with Background Image ── */}
      <section className="relative overflow-hidden text-primary-foreground">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-causeway.avif')" }}
        />
        {/* Dark gradient overlay — heavier on left for text, lighter on right to let image peek through */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        {/* Bottom edge blend into page background */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent" />

        <div className="container relative py-8 md:py-10">
          <div className="flex items-center gap-3 mb-3">
            <LivePulse size="lg" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold uppercase tracking-widest text-status-smooth">{t("home_live")}</span>
              <span className="h-1 w-1 rounded-full bg-primary-foreground/30" />
              <span className="text-label-sm text-primary-foreground/50">{t("home_updates_every_5min")}</span>
            </div>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {t("home_title")}
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60 max-w-lg">
            {t("home_hero_desc")}
          </p>

          {/* Toggles inside the hero */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <CheckpointToggle value={checkpoint} onChange={setCheckpoint} variant="dark" />
            <DirectionToggle value={direction} onChange={setDirection} variant="dark" />
          </div>
        </div>
      </section>

      {/* ── Live Data Ticker ── */}
      <section className="-mt-1 relative">
        <div className="container pt-4 pb-1">
          <LiveDataTicker
            lastUpdated={filteredSnapshots[0]?.updated_at}
            status={filteredSnapshots[0]?.status}
          />
        </div>
      </section>

      {/* ── Status Cards ── */}
      <section className="relative">
        <div className="container pt-3 pb-2">
          {trafficLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-label-sm text-muted-foreground">{t("home_loading")}</span>
            </div>
          ) : filteredSnapshots.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredSnapshots.map((s) => (
                <StatusCard
                  key={s.id}
                  snapshot={s}
                  onViewCameras={() => setShowCameras(!showCameras)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-sm text-muted-foreground">{t("home_no_data")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Cameras */}
      {showCameras && (
        <Section>
          <div className="container">
            <div className="flex items-center gap-2 mb-3">
              <Camera className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-heading text-title font-bold">{t("home_traffic_cameras")}</h2>
            </div>
            <CameraGrid checkpoint={cameraCheckpoint} />
          </div>
        </Section>
      )}

      {/* ── Quick Links Strip ── */}
      <Section>
        <div className="container">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <QuickLink to="/woodlands" icon={MapPin} label={t("checkpoint_woodlands")} sub={t("quick_link_causeway")} />
            <QuickLink to="/tuas" icon={MapPin} label={t("checkpoint_tuas")} sub={t("quick_link_second_link")} />
            <QuickLink to="/cameras" icon={Camera} label={t("nav_cameras")} sub={t("quick_link_live_cctv")} />
            <QuickLink to="/rts-link" icon={Train} label="RTS Link" sub={t("quick_link_opening_2027")} />
          </div>
        </div>
      </Section>

      {/* Hourly Pattern */}
      <Section>
        <div className="container">
          <h2 className="font-heading text-title font-bold">{t("home_todays_pattern")}</h2>
          <p className="mt-0.5 text-label-sm text-muted-foreground">
            {t("home_pattern_desc")} {new Date().toLocaleDateString("en-SG", { weekday: "long" })}
          </p>
          <div className="mt-3">
            {hourlyLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : hourlyData && hourlyData.length > 0 ? (
              <HourlyHeatmap data={hourlyData} />
            ) : (
              <p className="text-label-sm text-muted-foreground py-4">{t("home_pattern_collecting")}</p>
            )}
          </div>
        </div>
      </Section>

      {/* Quick Bus */}
      <Section>
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-accent" />
              <h2 className="font-heading text-title font-bold">{t("home_cross_border_buses")}</h2>
            </div>
            <Link to="/bus" className="inline-flex items-center gap-1 text-label font-medium text-accent hover:text-accent/80 transition-colors">
              {t("home_all_buses")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-3">
            <QuickBusWidget />
          </div>
        </div>
      </Section>

      {/* Holidays */}
      <Section>
        <div className="container">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-title font-bold">{t("home_holiday_traffic")}</h2>
            <Link to="/holidays" className="inline-flex items-center gap-1 text-label font-medium text-accent hover:text-accent/80 transition-colors">
              {t("home_calendar")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="text-label-sm text-muted-foreground mb-3">{t("home_upcoming_desc")}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link to="/holidays/hari-raya-puasa-2026" className="rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm font-semibold text-foreground">Hari Raya Puasa</span>
                <span className="rounded-full bg-status-jammed-tint px-2 py-0.5 text-label-sm font-semibold text-status-jammed">{t("severity_extreme")}</span>
              </div>
              <p className="mt-0.5 text-label-sm text-muted-foreground">Mar 20–21</p>
            </Link>
            <Link to="/holidays/good-friday-2026" className="rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm font-semibold text-foreground">Good Friday</span>
                <span className="rounded-full bg-status-heavy-tint px-2 py-0.5 text-label-sm font-semibold text-status-heavy">{t("severity_heavy")}</span>
              </div>
              <p className="mt-0.5 text-label-sm text-muted-foreground">Apr 3</p>
            </Link>
          </div>
        </div>
      </Section>

      {/* Guides */}
      <Section>
        <div className="container">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-title font-bold">{t("home_commuter_guides")}</h2>
            <Link to="/guides" className="inline-flex items-center gap-1 text-label font-medium text-accent hover:text-accent/80 transition-colors">
              {t("home_all_guides")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link to="/guides/best-time-to-cross-causeway" className="rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
              <p className="font-heading text-sm font-semibold text-foreground">{t("guide_best_time")}</p>
              <p className="mt-0.5 text-label-sm text-muted-foreground">{t("guide_best_time_sub")}</p>
            </Link>
            <Link to="/guides/friday-woodlands-traffic" className="rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
              <p className="font-heading text-sm font-semibold text-foreground">{t("guide_friday")}</p>
              <p className="mt-0.5 text-label-sm text-muted-foreground">{t("guide_friday_sub")}</p>
            </Link>
            <Link to="/guides/vep-malaysia-guide" className="rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
              <p className="font-heading text-sm font-semibold text-foreground">{t("guide_vep")}</p>
              <p className="mt-0.5 text-label-sm text-muted-foreground">{t("guide_vep_sub")}</p>
            </Link>
            <Link to="/guides/cw1-bus-kranji-to-jb" className="rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
              <p className="font-heading text-sm font-semibold text-foreground">{t("guide_cw1")}</p>
              <p className="mt-0.5 text-label-sm text-muted-foreground">{t("guide_cw1_sub")}</p>
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">{t("home_faq_title")}</h2>
          <FAQAccordion faqs={homeFaqs} />
        </div>
      </Section>

      {/* Data source trust signal */}
      <Section>
        <div className="container">
          <div className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-center">
            <p className="text-label-sm text-muted-foreground">
              {t("home_data_source_trust")}
            </p>
          </div>
        </div>
      </Section>

    </div>
  );
};

/* ── Quick Link Card ── */
const QuickLink = ({
  to,
  icon: Icon,
  label,
  sub,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
}) => (
  <Link
    to={to}
    className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]"
  >
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
      <Icon className="h-4.5 w-4.5" />
    </div>
    <div className="min-w-0">
      <p className="font-heading text-sm font-bold text-foreground">{label}</p>
      <p className="text-label-sm text-muted-foreground">{sub}</p>
    </div>
  </Link>
);

const Section = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="reveal py-4">
      {children}
    </section>
  );
};

export default Index;
