"use client";
import { CameraGrid } from "@/components/dashboard/CameraGrid";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { useTranslation } from "@/lib/i18n";
import type { CameraFeed } from "@/lib/types";

const cameraFaqs = [
  {
    question: "How often are the LTA causeway cameras updated?",
    answer:
      "We check the LTA camera feed on a five-minute cycle. Each image shows its source timestamp. If the source or an image is unavailable, we cannot guarantee a new frame every five minutes.",
  },
  {
    question: "Where are the causeway traffic cameras located?",
    answer:
      "The selected LTA cameras show parts of the BKE and Causeway near Woodlands, and the AYE, Tuas Checkpoint and Second Link near Tuas. They do not show the full immigration queues.",
  },
  {
    question: "Can I see live video of the causeway?",
    answer:
      "The feeds are still images, not video streams. Check the timestamp on each frame before relying on it.",
  },
  {
    question: "Which checkpoint cameras should I check before travelling?",
    answer:
      "Check the BKE and Causeway views for Woodlands, or the AYE and Second Link views for Tuas. The images cannot determine which full crossing will be faster.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cameraFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const imageGalleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Causeway Traffic Camera Live Feeds",
  description:
    "Timestamped LTA traffic camera images from the Singapore approaches to Woodlands and Tuas.",
  url: "https://sgborder.live/cameras",
};

const CamerasPage = ({ initialCameras }: { initialCameras: CameraFeed[] }) => {
  const { t } = useTranslation();

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="LTA Traffic Cameras Live — Woodlands & Tuas Checkpoint CCTV Feeds"
        description="Live LTA traffic camera feeds for Woodlands & Tuas checkpoint CCTV. Images updated every 5 minutes. Check causeway road conditions before crossing to JB."
        path="/cameras"
        jsonLd={[imageGalleryJsonLd, faqJsonLd]}
      />

      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8">
          <div className="flex items-center gap-3 mb-3">
            <Camera className="h-5 w-5 text-status-smooth" />
            <span className="text-sm font-bold uppercase tracking-widest text-status-smooth">LTA camera feed</span>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            Causeway Traffic Cameras — Live CCTV Feeds
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            Timestamped still images from Singapore road approaches. Frames do not cover immigration queues in full.
          </p>
        </div>
      </section>

      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">Woodlands and Tuas camera images</h2>
          <CameraGrid cameras={initialCameras} />
        </div>
      </RevealSection>

      {/* Checkpoint links */}
      <RevealSection>
        <div className="container">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/cameras/woodlands"
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-card-hover hover:border-accent/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Camera className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">
                    {t("cameras_woodlands_label")}
                  </p>
                  <p className="text-label-sm text-muted-foreground">
                    {t("cameras_woodlands_sub")}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/cameras/tuas"
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-card-hover hover:border-accent/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Camera className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">
                    {t("cameras_tuas_label")}
                  </p>
                  <p className="text-label-sm text-muted-foreground">
                    {t("cameras_tuas_sub")}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* Checkpoint approach cameras */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">
            BKE and AYE checkpoint approaches
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            LTA has retained selected checkpoint and approach cameras. Other public expressway cameras were discontinued in June 2026.
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { slug: "bke", name: "BKE", full: "Bukit Timah Expressway", tag: "→ Woodlands" },
              { slug: "aye", name: "AYE", full: "Ayer Rajah Expressway", tag: "→ Tuas" },
            ].map((e) => (
              <Link
                key={e.slug}
                href={`/cameras/${e.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 shadow-card transition-all hover:shadow-card-hover active:scale-[0.98]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <span className="text-label-sm font-bold text-foreground">{e.name}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-label font-semibold text-foreground truncate">{e.full}</p>
                  {e.tag && <span className="text-[11px] text-accent font-medium">{e.tag}</span>}
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* FAQs */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-4">
            {t("cameras_faq_title")}
          </h2>
          <FAQAccordion faqs={cameraFaqs} />
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

export default CamerasPage;
