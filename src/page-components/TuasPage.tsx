"use client";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { CameraGrid } from "@/components/dashboard/CameraGrid";
import { BusRouteCard } from "@/components/bus/BusRouteCard";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BUS_ROUTES } from "@/lib/bus-data";
import { useLiveTraffic } from "@/hooks/useLiveData";
import Link from "next/link";
import { ArrowRight, MapPin, Loader2 } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { LiveDataTicker } from "@/components/dashboard/LiveDataTicker";
import { useTranslation } from "@/lib/i18n";
import type { CameraFeed } from "@/lib/types";

const TuasPage = ({ initialCameras }: { initialCameras: CameraFeed[] }) => {
  const { data: snapshots, isLoading: trafficLoading } = useLiveTraffic("tuas");
  const busRoutes = BUS_ROUTES.filter((r) => r.via_checkpoint === "tuas");
  const { t } = useTranslation();

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="Tuas Checkpoint Live CCTV Camera & Traffic Today (2026) — Second Link Status"
        description="Tuas Second Link traffic today: inspect LTA camera images, recent Singapore road conditions and bus routes before leaving for JB."
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
            <MapPin className="h-4 w-4 text-status-smooth" />
            <span className="text-sm font-bold uppercase tracking-widest text-status-smooth">{t("home_live")}</span>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {t("tuas_h1")}
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {t("tuas_hero_sub")}
          </p>
          <Link href="/cameras/tuas" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-foreground px-4 text-sm font-semibold text-primary hover:bg-primary-foreground/90">View Tuas cameras <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">Tuas Second Link cameras</h2>
          <CameraGrid checkpoint="tuas" cameras={initialCameras} />
        </div>
      </RevealSection>

      {/* Quick facts */}
      <RevealSection>
        <div className="container">
          <div className="flex flex-wrap gap-4 rounded-xl border border-border bg-card p-4 shadow-card text-sm">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              Road feed does not include immigration queues
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" /> Tuas Checkpoint
            </span>
          </div>
        </div>
      </RevealSection>

      {/* Live data ticker */}
      {snapshots && snapshots.length > 0 && <RevealSection>
        <div className="container">
          <LiveDataTicker
            lastUpdated={snapshots?.[0]?.updated_at}
            status={snapshots?.[0]?.status}
          />
        </div>
      </RevealSection>}

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
              <p className="text-sm text-muted-foreground">Road status is under validation. Use the camera frames above before travelling.</p>
            </div>
          )}
        </div>
      </RevealSection>

      {/* Buses */}
      <RevealSection>
        <div className="container">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-title font-bold">{t("checkpoint_buses_via")} {t("checkpoint_tuas")}</h2>
            <Link href="/bus" className="inline-flex items-center gap-1 text-label font-medium text-accent hover:text-accent/80 transition-colors">
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
            <h2 className="font-heading text-sm font-semibold text-foreground mb-2">When to consider Tuas</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Tuas connects to western Johor via the Second Link.</li>
              <li>It may suit journeys starting in western Singapore or ending around Iskandar Puteri.</li>
              <li>Compare current camera frames and the full driving distance before choosing a route.</li>
            </ul>
          </div>
        </div>
      </RevealSection>

      {/* FAQs */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-4">{t("tuas_faq_title")}</h2>
          <FAQAccordion faqs={[
            { question: "How long does it take to cross at Tuas?", answer: "We do not have a verified end-to-end wait estimate. Singapore camera images and road speed bands cannot measure both immigration clearances." },
            { question: "What is the toll at Tuas?", answer: "Toll and road-charge amounts may change. Check the current published rates from Singapore LTA and the Malaysian authorities before travelling." },
            { question: "When should I choose Tuas over Woodlands?", answer: "Tuas may suit a western Singapore origin or western Johor destination. Compare current camera frames and total driving distance; no route is always faster." },
            { question: "What buses go through Tuas?", answer: "See the route cards on this page for services using the Tuas crossing, and verify the latest timetable with the operator." },
            { question: "Where does Tuas Second Link lead?", answer: "The Second Link reaches western Johor near Iskandar Puteri. Travellers heading into JB city centre should account for the onward drive." },
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
