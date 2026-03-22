import { BUS_ROUTES } from "@/lib/bus-data";
import { BusRouteCard } from "@/components/bus/BusRouteCard";
import { BusFareTable } from "@/components/bus/BusFareTable";
import { QuickBusWidget, CrowdLegend } from "@/components/bus/BusArrivalCard";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { LivePulse } from "@/components/dashboard/LivePulse";
import { useTranslation } from "@/lib/i18n";
import { Bus } from "lucide-react";

const busFaqs = [
  {
    question: "What is the cheapest bus from Singapore to JB?",
    answer:
      "The cheapest options are SBS Transit buses 160 and 170 at S$1.19 (adult cash fare with EZ-Link). Causeway Link CW1 costs S$1.50. All buses via Woodlands are cheaper than Tuas routes.",
  },
  {
    question: "How long does the bus to JB take?",
    answer:
      "During smooth traffic, the bus ride takes 20–30 minutes. During peak hours (Friday evenings, weekends, holidays), it can take 1–3 hours due to immigration queues and checkpoint congestion.",
  },
  {
    question: "Which bus goes from Singapore to JB via Tuas?",
    answer:
      "CW3 and CW4 by Causeway Link go via Tuas Second Link. CW3 runs from Jurong East and CW4 from Boon Lay. They're a good alternative when Woodlands is congested.",
  },
  {
    question: "Do I need to get off the bus at the checkpoint?",
    answer:
      "Yes. All passengers must alight at Singapore immigration (Woodlands or Tuas checkpoint) to clear customs, then board another bus on the other side. You'll also clear Malaysian immigration at JB CIQ.",
  },
  {
    question: "Can I use EZ-Link card on cross-border buses?",
    answer:
      "Yes, SBS Transit buses (160, 170, 170X, 950) accept EZ-Link and NETS cards. Causeway Link buses (CW1, CW2, etc.) accept their own stored-value card and cash in SGD or MYR.",
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
        description="All buses from Singapore to JB: CW1, CW2, 170, 170X, 950 routes with live arrivals, fares, schedules. Compare Woodlands & Tuas bus options."
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
            <LivePulse size="lg" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold uppercase tracking-widest text-status-smooth">{t("home_live")}</span>
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

      {/* Fare comparison */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">{t("bus_fare_comparison")}</h2>
          <BusFareTable />
          <p className="mt-2 text-label-sm text-muted-foreground">
            During peak hours at Woodlands, buses 160/170/170X/950 share a single queue. Budget extra waiting time.
          </p>
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
