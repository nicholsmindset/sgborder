import { useState } from "react";
import { Link } from "react-router-dom";
import { useLiveTraffic } from "@/hooks/useLiveData";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { LivePulse } from "@/components/dashboard/LivePulse";
import { CameraGrid } from "@/components/dashboard/CameraGrid";
import { CheckpointToggle, DirectionToggle } from "@/components/dashboard/Toggles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { Loader2, Camera, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const LivePage = () => {
  const [checkpoint, setCheckpoint] = useState("all");
  const [direction, setDirection] = useState("sg_to_jb");
  const [showCameras, setShowCameras] = useState(false);
  const { t } = useTranslation();

  const { data: snapshots, isLoading: trafficLoading } = useLiveTraffic();

  const filteredSnapshots = (snapshots ?? []).filter(
    (s) =>
      (checkpoint === "all" || s.checkpoint === checkpoint) &&
      s.direction === direction
  );

  const cameraCheckpoint = checkpoint === "all" ? "woodlands" : checkpoint;

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="JB Traffic Now — Live LTA CCTV Camera & Causeway Checkpoint Status"
        description="Is there a JB jam now? Live causeway traffic status for Woodlands & Tuas checkpoints with LTA CCTV cameras and wait times. Updated every 5 min."
        path="/live"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Causeway Traffic Now — Live JB Checkpoint Status",
          url: "https://www.sgborder.live/live",
          description:
            "Real-time causeway traffic status for Woodlands and Tuas checkpoints. Live cameras, wait times, and congestion levels updated every 5 minutes.",
          isPartOf: {
            "@type": "WebSite",
            name: "SG Border Live",
            url: "https://www.sgborder.live",
          },
          about: {
            "@type": "Thing",
            name: "Singapore-JB Causeway Traffic",
          },
        }}
      />

      {/* Dark Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8">
          <div className="flex items-center gap-3 mb-3">
            <LivePulse size="lg" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold uppercase tracking-widest text-status-smooth">{t("home_live")}</span>
              <span className="h-1 w-1 rounded-full bg-primary-foreground/30" />
              <span className="text-label-sm text-primary-foreground/50">{t("live_real_time")}</span>
            </div>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {t("live_title")}
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {t("live_subtitle")}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <CheckpointToggle value={checkpoint} onChange={setCheckpoint} variant="dark" />
            <DirectionToggle value={direction} onChange={setDirection} variant="dark" />
          </div>
        </div>
      </section>

      {/* Status Cards */}
      <section className="-mt-1 relative">
        <div className="container pt-5 pb-2">
          {trafficLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-label-sm text-muted-foreground">{t("live_loading")}</span>
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
              <p className="text-sm text-muted-foreground">{t("live_no_data")}</p>
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
              <h2 className="font-heading text-title font-bold">{t("live_cameras_title")}</h2>
            </div>
            <CameraGrid checkpoint={cameraCheckpoint} />
          </div>
        </Section>
      )}

      {/* Checkpoint & Bus Links */}
      <Section>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">{t("live_explore_checkpoints")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/woodlands" className="rounded-xl border border-border bg-card p-4 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
              <p className="font-heading text-sm font-bold text-foreground">{t("checkpoint_woodlands")}</p>
              <p className="mt-0.5 text-label-sm text-muted-foreground">{t("quick_link_causeway")} &middot; S$0.80 {t("checkpoint_toll").toLowerCase()}</p>
            </Link>
            <Link to="/tuas" className="rounded-xl border border-border bg-card p-4 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
              <p className="font-heading text-sm font-bold text-foreground">{t("checkpoint_tuas")}</p>
              <p className="mt-0.5 text-label-sm text-muted-foreground">{t("quick_link_second_link")} &middot; S$2.10 {t("checkpoint_toll").toLowerCase()}</p>
            </Link>
          </div>
          <div className="mt-3">
            <Link to="/bus" className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98]">
              <div>
                <p className="font-heading text-sm font-bold text-foreground">{t("live_cross_border_buses")}</p>
                <p className="mt-0.5 text-label-sm text-muted-foreground">{t("live_bus_routes_desc")}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </Section>

      {/* SEO Content */}
      <Section>
        <div className="container">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-heading text-title font-bold text-foreground">
              {t("live_seo_title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("live_seo_content_1")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("live_seo_content_2_prefix")}{" "}
              <Link to="/guides/best-time-to-cross-causeway" className="font-medium text-accent hover:text-accent/80 transition-colors">
                {t("live_seo_content_2_guide")}
              </Link>{" "}
              {t("live_seo_content_2_mid")}{" "}
              <Link to="/calculator" className="font-medium text-accent hover:text-accent/80 transition-colors">
                {t("live_seo_content_2_calc")}
              </Link>{" "}
              {t("live_seo_content_2_suffix")}
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};

const Section = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="reveal py-4">
      {children}
    </section>
  );
};

export default LivePage;
