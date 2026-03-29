"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useTranslation } from "@/lib/i18n";
import { Train, Clock, MapPin, Users, Zap, ArrowRight, CheckCircle } from "lucide-react";

const TARGET_DATE = new Date("2027-01-01T00:00:00+08:00").getTime();

function useCountdown() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, TARGET_DATE - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

const FAQS = [
  {
    question: "When does the RTS Link open?",
    answer:
      "The RTS Link targets completion by December 2026, with passenger service expected to commence in January 2027. Civil works were 93% complete as of March 2026.",
  },
  {
    question: "How much is the RTS Link ticket?",
    answer:
      "Fares are estimated at S$5\u2013S$7 (approximately RM15.50\u2013RM21.70). Final pricing is yet to be confirmed by the RTS Operations joint venture.",
  },
  {
    question: "How long is the RTS Link journey?",
    answer:
      "The journey from Woodlands North to Bukit Chagar takes approximately 5 minutes station to station, covering a distance of 4 km.",
  },
  {
    question: "Do I need to clear immigration twice?",
    answer:
      "No. The RTS Link uses a co-located CIQ model, meaning you clear both Singapore and Malaysian immigration at your departure station. There is no immigration clearance at the arrival station.",
  },
  {
    question: "How often do RTS trains run?",
    answer:
      "Trains run every 3\u20136 minutes during peak hours and every 6 minutes during off-peak hours. Operating hours are 6:00 AM to 12:00 AM daily.",
  },
  {
    question: "Where is Woodlands North station?",
    answer:
      "Woodlands North station is located next to the existing Thomson-East Coast Line (TEL) Woodlands North station. There will be an underground transfer link between the two.",
  },
  {
    question: "Will there be season passes?",
    answer:
      "Yes, SMRT has confirmed that season passes will be available for regular commuters. Details on pricing and purchase channels will be announced closer to launch.",
  },
  {
    question: "How does RTS compare to taking the bus?",
    answer:
      "The RTS Link journey takes about 5 minutes compared to 45\u2013120 minutes by bus. Immigration uses 7-second AI e-gates instead of manual queues, and trains run every 3\u20136 minutes versus 15\u201330 minutes for buses.",
  },
];

const TIMELINE = [
  { year: "2018", label: "Bilateral agreement signed between Singapore and Malaysia", color: "bg-accent" },
  { year: "2020", label: "Agreement suspended, then reinstated with revised terms", color: "bg-status-moderate" },
  { year: "2024 Nov", label: "Rail systems installation begins", color: "bg-accent" },
  { year: "2025 Jun", label: "First train unveiled by CRRC Zhuzhou", color: "bg-accent" },
  { year: "2026 Feb", label: "Parliament passes co-located CIQ bill", color: "bg-accent" },
  { year: "2026 Mar", label: "93% civil works complete", color: "bg-status-smooth" },
  { year: "2026 Dec", label: "Target completion of all works", color: "bg-status-smooth" },
  { year: "2027 Jan", label: "Target passenger service commencement", color: "bg-status-smooth" },
];

const RTSLinkPage = () => {
  const { t } = useTranslation();
  const countdown = useCountdown();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RTS Link Singapore-JB \u2014 Fare, Schedule, Stations & Opening Date",
    description:
      "Everything about the RTS Link rapid transit from Woodlands North to Bukit Chagar JB. Countdown to opening, fares, immigration process, and live updates.",
    url: "https://sgborder.live/rts-link",
  };

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="RTS Link Singapore-JB \u2014 Fare, Route, Opening Date & Progress 2026"
        description="RTS Link Singapore to JB rapid transit: Woodlands North to Bukit Chagar in 5 min. Fares, opening date countdown, station details & construction progress."
        path="/rts-link"
        jsonLd={[webPageJsonLd, faqJsonLd] as unknown as Record<string, unknown>}
      />
      {/* Dark Hero with Countdown */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 mb-4">
            <Train className="h-7 w-7" />
            </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {t("rts_title")}
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {t("rts_subtitle")}
          </p>

          {/* Countdown */}
          <div className="mt-6 flex items-center justify-center gap-3 sm:gap-5">
            <CountdownUnit value={countdown.days} label={t("rts_countdown_days")} dark />
            <span className="text-xl font-bold text-primary-foreground/20 -mt-4">&middot;</span>
            <CountdownUnit value={countdown.hours} label={t("rts_countdown_hrs")} dark />
            <span className="text-xl font-bold text-primary-foreground/20 -mt-4">&middot;</span>
            <CountdownUnit value={countdown.minutes} label={t("rts_countdown_min")} dark />
            <span className="text-xl font-bold text-primary-foreground/20 -mt-4">&middot;</span>
            <CountdownUnit value={countdown.seconds} label={t("rts_countdown_sec")} dark />
          </div>
          <p className="mt-3 text-label-sm text-primary-foreground/50">
            {t("rts_expected")}
          </p>
        </div>
      </section>

      <div className="container pt-2 pb-12 max-w-2xl">

        {/* Quick Facts */}
        <RevealSection>
          <div>
            <h2 className="font-heading text-title font-bold text-foreground mb-3">{t("rts_quick_facts")}</h2>
            <div className="rounded-xl border border-border bg-card p-4 shadow-card">
              <dl className="space-y-3 text-sm">
                <FactRow icon={<MapPin className="h-4 w-4 text-accent" />} label={t("rts_route")} value="Woodlands North (SG) \u2194 Bukit Chagar (JB)" />
                <FactRow icon={<ArrowRight className="h-4 w-4 text-accent" />} label={t("rts_distance")} value="4 km" />
                <FactRow icon={<Clock className="h-4 w-4 text-accent" />} label={t("rts_journey_time")} value="~5 minutes" />
                <FactRow icon={<Zap className="h-4 w-4 text-accent" />} label={t("rts_fare")} value="S$5\u2013S$7 (RM15.50\u2013RM21.70) \u2014 to be confirmed" />
                <FactRow icon={<Users className="h-4 w-4 text-accent" />} label={t("rts_capacity")} value="10,000 passengers/hour per direction" />
                <FactRow icon={<Clock className="h-4 w-4 text-accent" />} label={t("rts_operating_hours")} value="6:00 AM \u2013 12:00 AM daily" />
                <FactRow icon={<Train className="h-4 w-4 text-accent" />} label={t("rts_frequency")} value="Every 3\u20136 min (peak) / 6 min (off-peak)" />
                <FactRow icon={<CheckCircle className="h-4 w-4 text-accent" />} label={t("rts_operator")} value="RTS Operations (SMRT + Prasarana JV)" />
              </dl>
            </div>
          </div>
        </RevealSection>

        {/* How Immigration Works */}
        <RevealSection>
          <div>
            <h2 className="font-heading text-title font-bold text-foreground mb-3">{t("rts_immigration_title")}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {t("rts_immigration_intro")}
            </p>
            <div className="rounded-xl border border-border bg-card p-4 shadow-card space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-label-sm">1</span>
                <span className="text-muted-foreground">{t("rts_immigration_1")}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-label-sm">2</span>
                <span className="text-muted-foreground">{t("rts_immigration_2")}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-label-sm">3</span>
                <span className="text-muted-foreground">{t("rts_immigration_3")}</span>
              </div>
            </div>
            {/* Visual flow */}
            <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap text-label-sm font-medium text-muted-foreground">
              <span className="rounded-md bg-muted px-2 py-1">{t("rts_flow_tap")}</span>
              <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
              <span className="rounded-md bg-accent/10 text-accent px-2 py-1">{t("rts_flow_ciq")}</span>
              <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
              <span className="rounded-md bg-muted px-2 py-1">{t("rts_flow_board")}</span>
              <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
              <span className="rounded-md bg-muted px-2 py-1">{t("rts_flow_time")}</span>
              <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
              <span className="rounded-md bg-status-smooth/10 text-status-smooth px-2 py-1">{t("rts_flow_arrive")}</span>
            </div>
          </div>
        </RevealSection>

        {/* The Trains */}
        <RevealSection>
          <div>
            <h2 className="font-heading text-title font-bold text-foreground mb-3">{t("rts_trains_title")}</h2>
            <div className="rounded-xl border border-border bg-card p-4 shadow-card">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Train className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>{t("rts_trains_1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>{t("rts_trains_2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>{t("rts_trains_3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>{t("rts_trains_4")}</span>
                </li>
              </ul>
            </div>
          </div>
        </RevealSection>

        {/* Station Connections */}
        <RevealSection>
          <div>
            <h2 className="font-heading text-title font-bold text-foreground mb-3">{t("rts_stations_title")}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <h3 className="font-heading text-label font-semibold">{t("rts_woodlands_north")}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("rts_woodlands_north_desc")}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <h3 className="font-heading text-label font-semibold">{t("rts_bukit_chagar")}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("rts_bukit_chagar_desc")}
                </p>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Comparison Table */}
        <RevealSection>
          <div>
            <h2 className="font-heading text-title font-bold text-foreground mb-3">{t("rts_comparison_title")}</h2>
            <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-2.5 text-left font-heading text-label font-semibold text-muted-foreground" />
                      <th className="px-4 py-2.5 text-left font-heading text-label font-semibold text-accent">RTS Link</th>
                      <th className="px-4 py-2.5 text-left font-heading text-label font-semibold text-muted-foreground">Bus (CW1)</th>
                      <th className="px-4 py-2.5 text-left font-heading text-label font-semibold text-muted-foreground">Drive</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">{t("rts_comparison_time")}</td>
                      <td className="px-4 py-2.5 text-status-smooth font-semibold">~5 min</td>
                      <td className="px-4 py-2.5 text-muted-foreground">45\u2013120 min</td>
                      <td className="px-4 py-2.5 text-muted-foreground">30\u2013180 min</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">{t("rts_comparison_cost")}</td>
                      <td className="px-4 py-2.5 text-status-smooth font-semibold">S$5\u20137</td>
                      <td className="px-4 py-2.5 text-muted-foreground">S$1.50</td>
                      <td className="px-4 py-2.5 text-muted-foreground">S$10+</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">{t("rts_comparison_immigration")}</td>
                      <td className="px-4 py-2.5 text-status-smooth font-semibold">7s e-gate</td>
                      <td className="px-4 py-2.5 text-muted-foreground">Manual queue</td>
                      <td className="px-4 py-2.5 text-muted-foreground">Manual queue</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-foreground">{t("rts_comparison_frequency")}</td>
                      <td className="px-4 py-2.5 text-status-smooth font-semibold">3\u20136 min</td>
                      <td className="px-4 py-2.5 text-muted-foreground">15\u201330 min</td>
                      <td className="px-4 py-2.5 text-muted-foreground">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Construction Timeline */}
        <RevealSection>
          <div>
            <h2 className="font-heading text-title font-bold text-foreground mb-4">{t("rts_timeline_title")}</h2>
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[9px] top-1 bottom-1 w-px bg-border" />
              <div className="space-y-5">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="relative flex items-start gap-3">
                    <span className={`absolute left-[-15px] mt-1.5 h-3 w-3 shrink-0 rounded-full ${item.color} ring-2 ring-background`} />
                    <div>
                      <span className="font-mono text-label-sm font-semibold text-foreground">{item.year}</span>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* FAQ */}
        <RevealSection>
          <div>
            <h2 className="font-heading text-title font-bold text-foreground mb-4">{t("rts_faq_title")}</h2>
            <FAQAccordion faqs={FAQS} />
          </div>
        </RevealSection>

      </div>
    </div>
  );
};

/* ---------- Sub-components ---------- */

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return <div ref={ref} className="reveal mt-6">{children}</div>;
};

const CountdownUnit = ({ value, label, dark }: { value: number; label: string; dark?: boolean }) => (
  <div className="flex flex-col items-center">
    <span className={`font-heading text-2xl sm:text-3xl font-bold tabular-nums ${dark ? "text-primary-foreground" : "text-foreground"}`}>
      {String(value).padStart(label === "days" ? 3 : 2, "0")}
    </span>
    <span className={`text-label-sm ${dark ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{label}</span>
  </div>
);

const FactRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 shrink-0">{icon}</span>
    <div className="flex-1 min-w-0">
      <dt className="text-label-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  </div>
);

export default RTSLinkPage;
