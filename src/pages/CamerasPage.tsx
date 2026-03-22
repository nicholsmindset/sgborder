import { CameraGrid } from "@/components/dashboard/CameraGrid";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { Camera, ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { LivePulse } from "@/components/dashboard/LivePulse";
import { useTranslation } from "@/lib/i18n";

const cameraFaqs = [
  {
    question: "How often are the causeway cameras updated?",
    answer:
      "The traffic cameras are refreshed every 5 minutes with live images sourced from LTA (Land Transport Authority). The timestamps shown reflect the most recent update.",
  },
  {
    question: "Where are the causeway traffic cameras located?",
    answer:
      "Cameras cover key approaches and lanes at both Woodlands and Tuas checkpoints. Woodlands cameras monitor the BKE approach, Causeway lanes, and Centre Road. Tuas cameras cover the AYE approach, Second Link, and Tuas West Road.",
  },
  {
    question: "Can I see live video of the causeway?",
    answer:
      "The feeds are still images (snapshots) refreshed every 5 minutes, not live video streams. They give you an accurate, near-real-time view of current traffic conditions at each camera location.",
  },
  {
    question: "Which checkpoint cameras should I check before travelling?",
    answer:
      "Check the cameras for the checkpoint you plan to use. For Woodlands, look at the BKE approach and Causeway cameras. For Tuas, check the AYE approach and Second Link cameras. Compare both to decide which crossing is less congested.",
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
    "Live CCTV traffic camera images from Woodlands and Tuas checkpoints updated every 5 minutes.",
  url: "https://sgborder.live/cameras",
};

const CamerasPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="Causeway Camera Live — Woodlands & Tuas Checkpoint CCTV Feeds"
        description="Live causeway traffic camera feeds from LTA. View Woodlands & Tuas checkpoint CCTV images updated every 5 minutes. Check road conditions before crossing to JB."
        path="/cameras"
        jsonLd={[imageGalleryJsonLd, faqJsonLd]}
      />

      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8">
          <div className="flex items-center gap-3 mb-3">
            <LivePulse size="lg" />
            <span className="text-sm font-bold uppercase tracking-widest text-status-smooth">{t("home_live")}</span>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            Causeway Traffic Cameras — Live CCTV Feeds
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {t("cameras_subtitle")}
          </p>
        </div>
      </section>

      {/* Checkpoint links */}
      <RevealSection>
        <div className="container">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/cameras/woodlands"
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
              to="/cameras/tuas"
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

      {/* All cameras */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">
            {t("cameras_all_checkpoint")}
          </h2>
          <CameraGrid />
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
