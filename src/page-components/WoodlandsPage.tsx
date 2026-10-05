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

const WoodlandsPage = ({ initialCameras }: { initialCameras: CameraFeed[] }) => {
  const { data: snapshots, isLoading: trafficLoading } = useLiveTraffic("woodlands");
  const busRoutes = BUS_ROUTES.filter((r) => r.via_checkpoint === "woodlands");
  const { t } = useTranslation();

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="Woodlands Checkpoint Live Camera & Traffic Today (2026) — CCTV & Road Status"
        description="Woodlands Checkpoint traffic today: inspect LTA camera images, recent Singapore road conditions and cross-border bus information before leaving for JB."
        path="/woodlands"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Place",
          name: "Woodlands Checkpoint",
          description: "Singapore's Woodlands Checkpoint connecting to Johor Bahru via the Causeway.",
          geo: { "@type": "GeoCoordinates", latitude: 1.44643, longitude: 103.76932 },
          address: { "@type": "PostalAddress", addressCountry: "SG", addressLocality: "Woodlands" },
        }}
      />
      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="h-4 w-4 text-status-smooth" />
            <span className="text-sm font-bold uppercase tracking-widest text-status-smooth">{t("home_live")}</span>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {t("woodlands_h1")}
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {t("woodlands_hero_sub")}
          </p>
          <Link href="/cameras/woodlands" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-foreground px-4 text-sm font-semibold text-primary hover:bg-primary-foreground/90">View Woodlands cameras <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">Woodlands Causeway cameras</h2>
          <CameraGrid checkpoint="woodlands" cameras={initialCameras} />
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
              <MapPin className="h-4 w-4 text-accent" /> 21 Woodlands Crossing
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
            <h2 className="font-heading text-title font-bold">{t("checkpoint_buses_via")} {t("checkpoint_woodlands")}</h2>
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

      {/* Related guides */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">{t("checkpoint_related_guides")}</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/guides/best-time-to-cross-causeway" className="rounded-lg border border-border bg-card px-3 py-2 text-label font-medium text-foreground hover:bg-muted transition-colors">
              {t("guide_best_time")}
            </Link>
            <Link href="/guides/myica-qr-code-guide" className="rounded-lg border border-border bg-card px-3 py-2 text-label font-medium text-foreground hover:bg-muted transition-colors">
              MyICA QR Code
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* FAQs */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-4">{t("woodlands_faq_title")}</h2>
          <FAQAccordion faqs={[
            { question: "How long does it take to cross at Woodlands?", answer: "We do not have a verified end-to-end wait estimate. The camera frames show sections of the road, and Singapore road status does not include immigration or Malaysia-side queues." },
            { question: "Is Woodlands or Tuas faster?", answer: "There is no consistently faster checkpoint. Compare current camera frames, consider your destination and include the drive to each checkpoint." },
            { question: "What buses go through Woodlands?", answer: "See the route cards on this page for services using the Woodlands crossing. Confirm the latest service details with each operator." },
            { question: "Can I use MyICA QR at Woodlands?", answer: "Eligibility and supported clearance lanes depend on your document and vehicle. Check the current ICA guidance before using a QR code." },
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

export default WoodlandsPage;
