"use client";
import { BUS_ROUTES } from "@/lib/bus-data";
import { BusRouteCard } from "@/components/bus/BusRouteCard";
import { QuickBusWidget, CrowdLegend } from "@/components/bus/BusArrivalCard";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { useTranslation } from "@/lib/i18n";
import { Bus } from "lucide-react";

const busFaqs = [
  {
    question: "Where can I check current bus fares?",
    answer:
      "Check SBS Transit, SMRT or Causeway Link before travelling. Fares can differ by distance, payment method and direction, and may change.",
  },
  {
    question: "How long does the bus to JB take?",
    answer:
      "Journey time depends on both road traffic and clearance at the Singapore and Malaysia checkpoints. Check cameras before leaving and allow extra time on holidays and weekends.",
  },
  {
    question: "Which bus goes from Singapore to JB via Tuas?",
    answer:
      "Causeway Link services CW3 and CW7 use the Tuas Second Link. Check the operator's current stops and operating hours before leaving.",
  },
  {
    question: "Do I need to get off the bus at the checkpoint?",
    answer:
      "Yes. All passengers must alight at Singapore immigration (Woodlands or Tuas checkpoint) to clear customs, then board another bus on the other side. You'll also clear Malaysian immigration at JB CIQ.",
  },
  {
    question: "Can I use EZ-Link card on cross-border buses?",
    answer:
      "Payment methods differ by operator and route. Check the operator's current payment options before boarding.",
  },
];

const BusHub = () => {
  const { t } = useTranslation();
  const woodlandsRoutes = BUS_ROUTES.filter((r) => r.via_checkpoint === "woodlands");
  const tuasRoutes = BUS_ROUTES.filter((r) => r.via_checkpoint === "tuas");

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="Bus to JB — Singapore to Johor Bahru Cross-Border Bus Routes & Fares"
        description="Compare cross-border bus routes by checkpoint and check available public bus arrivals. Verify current fares and schedules with each operator."
        path="/bus"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: busFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <section className="relative overflow-hidden text-primary-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bus.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent" />

        <div className="container relative py-8 md:py-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold uppercase tracking-widest text-status-smooth">Cross-border buses</span>
              <span className="h-1 w-1 rounded-full bg-primary-foreground/30" />
              <span className="text-label-sm text-primary-foreground/50">{t("bus_next_arrivals")}</span>
            </div>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {t("bus_hub_title")}
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {t("bus_hub_subtitle")}
          </p>
        </div>
      </section>

      {/* Live arrivals */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">{t("bus_next_arrivals")}</h2>
          <QuickBusWidget />
        </div>
      </RevealSection>

      {/* Crowd info */}
      <RevealSection>
        <div className="container">
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
            <h3 className="font-heading text-sm font-bold text-foreground mb-2">Live Bus Crowd Levels</h3>
            <p className="text-label-sm text-muted-foreground mb-3">
              Real-time crowd data from LTA, updated every 30 seconds. Plan your boarding — pick buses with seats available to travel comfortably.
            </p>
            <CrowdLegend />
          </div>
        </div>
      </RevealSection>

      {/* Woodlands routes */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">{t("bus_via_woodlands")}</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {woodlandsRoutes.map((r) => (
              <BusRouteCard key={r.service_no} route={r} />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Tuas routes */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">{t("bus_via_tuas")}</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {tuasRoutes.map((r) => (
              <BusRouteCard key={r.service_no} route={r} />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Published route information */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">Check fares and schedules with the operator</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">Route pages help you choose a checkpoint. Operators publish the current fares, payment options and first/last bus times.</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold text-accent">
            <a className="rounded-lg border border-border bg-card px-3 py-2 hover:bg-muted" href="https://www.sbstransit.com.sg/Service/BusService" target="_blank" rel="noopener noreferrer">SBS Transit</a>
            <a className="rounded-lg border border-border bg-card px-3 py-2 hover:bg-muted" href="https://www.causewaylink.com.my/routes-schedules/singapore-cross-border-bus/" target="_blank" rel="noopener noreferrer">Causeway Link</a>
            <a className="rounded-lg border border-border bg-card px-3 py-2 hover:bg-muted" href="https://www.smrt.com.sg/Journey-with-Us/Buses/Bus-Services" target="_blank" rel="noopener noreferrer">SMRT</a>
          </div>
        </div>
      </RevealSection>

      {/* FAQ */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">Bus to JB — FAQ</h2>
          <FAQAccordion faqs={busFaqs} />
        </div>
      </RevealSection>
    </div>
  );
};

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return <section ref={ref} className="reveal py-4">{children}</section>;
};

export default BusHub;
