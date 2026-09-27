"use client";
import { useEffect, useState } from "react";
import { LiveDataTicker } from "@/components/dashboard/LiveDataTicker";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { CheckpointToggle } from "@/components/dashboard/Toggles";
import { HourlyHeatmap } from "@/components/dashboard/HourlyHeatmap";
import { CameraGrid } from "@/components/dashboard/CameraGrid";
import { QuickBusWidget } from "@/components/bus/BusArrivalCard";
import { useLiveTraffic, useLiveHourlyPattern } from "@/hooks/useLiveData";
import Link from "next/link";
import { ArrowRight, Camera, Loader2, Train, MapPin, Bus } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useTranslation } from "@/lib/i18n";
import { SG_PUBLIC_HOLIDAYS_2026, type PublicHoliday } from "@/data/public-holidays";

const homeFaqs = [
  {
    question: "How do I check causeway traffic before crossing to JB?",
    answer:
      "Compare the Singapore road approaches to Woodlands and Tuas, then inspect the latest checkpoint camera images. Road conditions do not measure immigration queues or the Malaysia side.",
  },
  {
    question: "Which checkpoint is faster — Woodlands or Tuas?",
    answer:
      "Compare both road status cards and cameras before leaving. Your destination and the longer drive to Tuas also matter; this dashboard cannot measure the full border crossing time.",
  },
  {
    question: "What is the best time to cross the causeway?",
    answer:
      "Patterns vary by weekday, school holiday and public holiday. Use the historical road pattern as a guide, and check current cameras before setting off.",
  },
  {
    question: "How often is the causeway traffic data updated?",
    answer:
      "The road feed is checked every 5 minutes. Each card shows when its underlying observation was recorded; missing or old observations are hidden. Camera and bus data can refresh on separate schedules.",
  },
];

const Index = () => {
  const [checkpoint, setCheckpoint] = useState("all");
  const [upcomingHolidays, setUpcomingHolidays] = useState<PublicHoliday[]>([]);
  const { t } = useTranslation();

  const { data: snapshots, isLoading: trafficLoading } = useLiveTraffic();
  const { data: hourlyData, isLoading: hourlyLoading } = useLiveHourlyPattern();

  const filteredSnapshots = (snapshots ?? []).filter(
    (s) =>
      (checkpoint === "all" || s.checkpoint === checkpoint) &&
      s.direction === "sg_to_jb"
  );

  useEffect(() => {
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Singapore", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    setUpcomingHolidays(SG_PUBLIC_HOLIDAYS_2026.filter((h) => h.date >= today && h.type === "gazetted").slice(0, 2));
  }, []);

  const cameraCheckpoint = checkpoint === "all" ? "woodlands" : checkpoint;

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="Causeway Traffic Live — Woodlands & Tuas Checkpoint CCTV Camera Status"
        description="Check the Singapore road approaches to Woodlands and Tuas, LTA checkpoint cameras, and cross-border bus arrivals before travelling to JB. Freshness shown on each feed."
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
            <Camera className="h-4 w-4 text-status-smooth" />
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
            <Link href="/cameras" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary-foreground/30 px-3 text-xs font-semibold text-primary-foreground hover:bg-primary-foreground/10">
              <Camera className="h-4 w-4" /> Check cameras for both directions
            </Link>
          </div>
        </div>
      </section>

      {/* ── Live Data Ticker ── */}
      {filteredSnapshots.length > 0 && <section className="-mt-1 relative">
        <div className="container pt-4 pb-1">
          <LiveDataTicker
            lastUpdated={filteredSnapshots[0]?.updated_at}
            status={filteredSnapshots[0]?.status}
          />
        </div>
      </section>}

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
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-sm font-medium text-foreground">Current road data is unavailable.</p>
              <p className="mt-1 text-xs text-muted-foreground">Check the camera images below before you travel.</p>
            </div>
          )}
        </div>
      </section>

      {/* Cameras */}
        <Section>
          <div className="container">
            <div className="flex items-center gap-2 mb-3">
              <Camera className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-heading text-title font-bold">{t("home_traffic_cameras")}</h2>
            </div>
            <CameraGrid checkpoint={cameraCheckpoint} />
          </div>
        </Section>

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
            <Link href="/bus" className="inline-flex items-center gap-1 text-label font-medium text-accent hover:text-accent/80 transition-colors">
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
            <Link href="/holidays" className="inline-flex items-center gap-1 text-label font-medium text-accent hover:text-accent/80 transition-colors">
              {t("home_calendar")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="text-label-sm text-muted-foreground mb-3">{t("home_upcoming_desc")}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {upcomingHolidays.length > 0 ? upcomingHolidays.map((holiday) => (
              <Link key={`${holiday.date}-${holiday.name}`} href="/holidays" className="rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm font-semibold text-foreground">{holiday.name}</span>
                </div>
                <p className="mt-0.5 text-label-sm text-muted-foreground">{new Date(`${holiday.date}T12:00:00+08:00`).toLocaleDateString("en-SG", { day: "numeric", month: "short", timeZone: "Asia/Singapore" })}</p>
              </Link>
            )) : <p className="text-sm text-muted-foreground">See the full holiday calendar for crossing dates.</p>}
          </div>
        </div>
      </Section>

      {/* Guides */}
      <Section>
        <div className="container">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-title font-bold">{t("home_commuter_guides")}</h2>
            <Link href="/guides" className="inline-flex items-center gap-1 text-label font-medium text-accent hover:text-accent/80 transition-colors">
              {t("home_all_guides")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/guides/best-time-to-cross-causeway" className="rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
              <p className="font-heading text-sm font-semibold text-foreground">{t("guide_best_time")}</p>
              <p className="mt-0.5 text-label-sm text-muted-foreground">{t("guide_best_time_sub")}</p>
            </Link>
            <Link href="/guides/myica-qr-code-guide" className="rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
              <p className="font-heading text-sm font-semibold text-foreground">{t("guide_friday")}</p>
              <p className="mt-0.5 text-label-sm text-muted-foreground">{t("guide_friday_sub")}</p>
            </Link>
            <Link href="/guides/vep-malaysia-guide" className="rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
              <p className="font-heading text-sm font-semibold text-foreground">{t("guide_vep")}</p>
              <p className="mt-0.5 text-label-sm text-muted-foreground">{t("guide_vep_sub")}</p>
            </Link>
            <Link href="/bus/cw1" className="rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
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
            <Link href="/methodology" className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-accent hover:underline">Read the data method <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
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
    href={to}
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
