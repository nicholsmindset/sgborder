"use client";
import { useParams } from "next/navigation";
import { CameraGrid } from "@/components/dashboard/CameraGrid";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { useTranslation } from "@/lib/i18n";
import { CHECKPOINT_CAMERAS, CHECKPOINT_CAMERA_DETAILS, type CheckpointName } from "@/data/checkpoint-cameras";
import type { CameraFeed } from "@/lib/types";

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
      "Timestamped Woodlands camera images from the BKE approach and Singapore side of the Causeway.",
    lat: 1.44643,
    lng: 103.76932,
    statusPath: "/woodlands",
    cameraHint:
      "Inspect the BKE approach and Causeway road sections near the Singapore checkpoint.",
  },
  tuas: {
    label: "Tuas",
    title: "Tuas Checkpoint Camera Live — Traffic CCTV Today",
    description:
      "Timestamped Tuas camera images from the AYE approach, Tuas Checkpoint and Second Link.",
    lat: 1.34029,
    lng: 103.63649,
    statusPath: "/tuas",
    cameraHint:
      "Inspect the AYE approach, checkpoint and Second Link road sections on the Singapore side.",
  },
};

const CamerasCheckpointPage = ({ initialCameras }: { initialCameras: CameraFeed[] }) => {
  const params = useParams();
  const checkpoint = params?.checkpoint as string | undefined;
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
            href="/cameras"
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
            href="/cameras"
            className="mb-3 inline-flex items-center gap-1.5 text-label font-medium text-primary-foreground/60 hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {t("cameras_all_cameras")}
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <Camera className="h-5 w-5 text-status-smooth" />
            <span className="text-sm font-bold uppercase tracking-widest text-status-smooth">LTA camera feed</span>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {meta.label} Checkpoint Cameras — Live CCTV Traffic
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {meta.cameraHint} Check each image timestamp before travelling.
          </p>
        </div>
      </section>

      {/* Camera grid */}
      <RevealSection>
        <div className="container">
          <CameraGrid checkpoint={checkpoint} cameras={initialCameras} />
        </div>
      </RevealSection>

      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold">What these cameras show</h2>
          <p className="mt-2 text-sm text-muted-foreground">{CHECKPOINT_CAMERA_DETAILS[checkpoint as CheckpointName].explanation}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {Object.entries(CHECKPOINT_CAMERAS).filter(([, camera]) => camera.checkpoint === checkpoint).map(([id, camera]) => (
              <li key={id} className="rounded-lg border border-border bg-card p-3">
                <span className="text-sm font-semibold text-foreground">{camera.label}</span>
                <span className="block text-xs text-muted-foreground">{camera.context}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">Source: <a className="text-accent underline" href="https://api.data.gov.sg/v1/transport/traffic-images" target="_blank" rel="noopener noreferrer">LTA traffic images via data.gov.sg</a>. A clear road frame does not establish a short immigration wait.</p>
        </div>
      </RevealSection>

      {/* Link to live status */}
      <RevealSection>
        <div className="container">
          <Link
            href={meta.statusPath}
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
