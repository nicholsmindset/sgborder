import { useParams, Link } from "react-router-dom";
import { EXPRESSWAYS, EXPRESSWAY_LIST } from "@/data/expressway-cameras";
import { useExpresswayCameras } from "@/hooks/useLiveData";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { Camera, ArrowRight, ArrowLeft, Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { LivePulse } from "@/components/dashboard/LivePulse";
import { useState } from "react";

const ExpresswayCamerasPage = () => {
  const { checkpoint } = useParams<{ checkpoint: string }>();
  const config = checkpoint ? EXPRESSWAYS[checkpoint] : undefined;

  if (!config) {
    return (
      <div className="container py-16 text-center pb-mobile-nav">
        <p className="text-muted-foreground">Expressway not found.</p>
        <Link to="/cameras" className="mt-4 inline-block text-accent hover:underline">
          ← Back to cameras
        </Link>
      </div>
    );
  }

  return <ExpresswayContent config={config} />;
};

const ExpresswayContent = ({ config }: { config: typeof EXPRESSWAYS[string] }) => {
  const { data: cameras, isLoading } = useExpresswayCameras(config.cameraIds);
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  const cameraList = cameras || [];

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title={config.title}
        description={config.description}
        path={`/cameras/${config.slug}`}
        breadcrumbs={[
          { name: "Cameras", path: "/cameras" },
          { name: `${config.shortName} Cameras`, path: `/cameras/${config.slug}` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: config.title,
          description: config.description,
          url: `https://www.sgborder.live/cameras/${config.slug}`,
          isPartOf: {
            "@type": "WebSite",
            name: "SG Border Live",
            url: "https://www.sgborder.live",
          },
        }}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8">
          <Link
            to="/cameras"
            className="inline-flex items-center gap-1 text-label text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Cameras
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10">
              <Camera className="h-5 w-5" />
            </div>
            <LivePulse />
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {config.shortName} Traffic Cameras
          </h1>
          <p className="mt-1 text-sm font-medium text-primary-foreground/80">
            {config.name}
          </p>
          <p className="mt-2 text-sm text-primary-foreground/60 max-w-xl">
            {config.relevance}
          </p>
        </div>
      </section>

      {/* Camera Grid */}
      <RevealSection>
        <div className="container">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-title font-bold">
              Live CCTV Feeds
            </h2>
            <span className="text-label-sm text-muted-foreground">
              {cameraList.length} camera{cameraList.length !== 1 ? "s" : ""}
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-label-sm text-muted-foreground">Loading cameras...</span>
            </div>
          ) : cameraList.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No camera feeds available right now. Cameras refresh every 5 minutes.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cameraList.map((cam, i) => (
                <button
                  key={cam.camera_id}
                  onClick={() => setModalIdx(i)}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-card-hover active:scale-[0.98]"
                >
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={cam.image_url}
                      alt={`${config.shortName} traffic camera ${cam.camera_id}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <span className="text-label-sm font-medium text-white">
                        {config.shortName} — Camera {cam.camera_id}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </RevealSection>

      {/* Modal */}
      {modalIdx !== null && cameraList[modalIdx] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setModalIdx(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModalIdx(null)}
              className="absolute -top-10 right-0 text-white hover:text-white/80"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={cameraList[modalIdx].image_url}
              alt={`${config.shortName} camera ${cameraList[modalIdx].camera_id}`}
              className="w-full rounded-lg"
            />
            <div className="mt-2 flex items-center justify-between text-white">
              <button
                onClick={() => setModalIdx(Math.max(0, modalIdx - 1))}
                disabled={modalIdx === 0}
                className="p-2 disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-medium">
                {config.shortName} — Camera {cameraList[modalIdx].camera_id} ({modalIdx + 1}/{cameraList.length})
              </span>
              <button
                onClick={() => setModalIdx(Math.min(cameraList.length - 1, modalIdx + 1))}
                disabled={modalIdx === cameraList.length - 1}
                className="p-2 disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Heading to JB CTA */}
      {config.relatedCheckpoint && (
        <RevealSection>
          <div className="container">
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
              <h3 className="font-heading text-sm font-bold text-foreground">
                Heading to JB via {config.relatedCheckpoint === "woodlands" ? "Woodlands" : "Tuas"}?
              </h3>
              <p className="mt-1 text-label-sm text-muted-foreground">
                {config.shortName} leads to{" "}
                {config.relatedCheckpoint === "woodlands"
                  ? "Woodlands Checkpoint (Causeway)"
                  : "Tuas Checkpoint (Second Link)"}
                . Check the live checkpoint status before you cross.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  to={`/${config.relatedCheckpoint}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-accent px-4 py-2 text-label font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  {config.relatedCheckpoint === "woodlands" ? "Woodlands" : "Tuas"} Status{" "}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to={`/cameras/${config.relatedCheckpoint}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-label font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Checkpoint Cameras
                </Link>
              </div>
            </div>
          </div>
        </RevealSection>
      )}

      {/* Other expressways */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">Other Expressway Cameras</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {EXPRESSWAY_LIST.filter((e) => e.slug !== config.slug).map((e) => (
              <Link
                key={e.slug}
                to={`/cameras/${e.slug}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-card transition-all hover:shadow-card-hover active:scale-[0.98]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <span className="text-label-sm font-bold text-foreground">{e.shortName}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-label font-semibold text-foreground truncate">{e.name}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* FAQ */}
      {config.faqs.length > 0 && (
        <RevealSection>
          <div className="container">
            <h2 className="font-heading text-title font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={config.faqs} />
          </div>
        </RevealSection>
      )}
    </div>
  );
};

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return <section ref={ref} className="reveal py-4">{children}</section>;
};

export default ExpresswayCamerasPage;
