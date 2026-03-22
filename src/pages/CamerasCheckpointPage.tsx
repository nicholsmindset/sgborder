import { useParams } from "react-router-dom";
import { CameraGrid } from "@/components/dashboard/CameraGrid";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { LivePulse } from "@/components/dashboard/LivePulse";
import { useTranslation } from "@/lib/i18n";

const CHECKPOINT_META: Record<
  string,
  {
    label: string;
    title: string;
    description: string;
    lat: number;
    lng: number;
    statusPath: string;
    cameraHint: string;
  }
> = {
  woodlands: {
    label: "Woodlands",
    title: "Woodlands Checkpoint Camera Live — Traffic CCTV Today",
    description:
      "Live Woodlands checkpoint camera feeds. BKE approach, Causeway lanes & Centre Road CCTV updated every 5 min. See real-time traffic before you cross.",
    lat: 1.44643,
    lng: 103.76932,
    statusPath: "/woodlands",
    cameraHint:
      "Cameras cover the BKE approach, Causeway lanes, and Woodlands Centre Road.",
  },
  tuas: {
    label: "Tuas",
    title: "Tuas Checkpoint Camera Live — Traffic CCTV Today",
    description:
      "Live Tuas checkpoint camera feeds. AYE approach, Second Link & Tuas West Road CCTV updated every 5 min. Check traffic before crossing.",
    lat: 1.34029,
    lng: 103.63649,
    statusPath: "/tuas",
    cameraHint:
      "Cameras cover the AYE approach, Second Link, and Tuas West Road.",
  },
};

const CamerasCheckpointPage = () => {
  const { checkpoint } = useParams<{ checkpoint: string }>();
  const { t } = useTranslation();

  const meta = checkpoint ? CHECKPOINT_META[checkpoint] : undefined;

  if (!meta) {
    return (
      <div className="pb-mobile-nav">
        <div className="container pt-12 text-center">
          <h1 className="font-heading text-display-sm font-bold text-foreground">
            Checkpoint Not Found
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We only have camera feeds for Woodlands and Tuas checkpoints.
          </p>
          <Link
            to="/cameras"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {t("cameras_all_cameras")}
          </Link>
        </div>
      </div>
    );
  }

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${meta.label} Checkpoint`,
    description: `Traffic cameras at Singapore's ${meta.label} Checkpoint.`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: meta.lat,
      longitude: meta.lng,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "SG",
      addressLocality: meta.label,
    },
  };

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title={meta.title}
        description={meta.description}
        path={`/cameras/${checkpoint}`}
        breadcrumbs={[{ name: "Cameras", path: "/cameras" }, { name: `${meta.label} Cameras`, path: `/cameras/${checkpoint}` }]}
        jsonLd={placeJsonLd}
      />

      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8">
          <Link
            to="/cameras"
            className="mb-3 inline-flex items-center gap-1.5 text-label font-medium text-primary-foreground/60 hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {t("cameras_all_cameras")}
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <LivePulse size="lg" />
            <span className="text-sm font-bold uppercase tracking-widest text-status-smooth">{t("home_live")}</span>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {meta.label} Checkpoint Cameras — Live CCTV Traffic
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {meta.cameraHint} Updated every 5 minutes.
          </p>
        </div>
      </section>

      {/* Camera grid */}
      <RevealSection>
        <div className="container">
          <CameraGrid checkpoint={checkpoint} />
        </div>
      </RevealSection>

      {/* Link to live status */}
      <RevealSection>
        <div className="container">
          <Link
            to={meta.statusPath}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-card-hover hover:border-accent/30"
          >
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">
                {meta.label} Live Traffic Status
              </p>
              <p className="text-label-sm text-muted-foreground">
                {t("cameras_view_status_desc")}
              </p>
            </div>
            <span className="shrink-0 rounded-lg bg-accent/10 px-3 py-1.5 text-label-sm font-medium text-accent">
              {t("cameras_view_status")}
            </span>
          </Link>
        </div>
      </RevealSection>
    </div>
  );
};

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="reveal py-4">
      {children}
    </section>
  );
};

export default CamerasCheckpointPage;
