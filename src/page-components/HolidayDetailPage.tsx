"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HOLIDAYS_2026, SEVERITY_CONFIG } from "@/data/holidays";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, MapPin } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const HolidayDetailPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const holiday = HOLIDAYS_2026.find((h) => h.slug === slug);

  if (!holiday) {
    return (
      <div className="container py-16 text-center pb-mobile-nav">
        <p className="text-muted-foreground">Holiday not found.</p>
        <Link href="/holidays" className="mt-4 inline-block text-accent hover:underline">← Back to calendar</Link>
      </div>
    );
  }

  const sev = SEVERITY_CONFIG[holiday.severity];
  const startDate = new Date(holiday.date_start);
  const endDate = new Date(holiday.date_end);
  const dateLabel =
    holiday.date_start === holiday.date_end
      ? startDate.toLocaleDateString("en-SG", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
      : `${startDate.toLocaleDateString("en-SG", { day: "numeric", month: "long" })} – ${endDate.toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" })}`;

  // Find adjacent holidays for navigation
  const idx = HOLIDAYS_2026.findIndex((h) => h.slug === slug);
  const prev = idx > 0 ? HOLIDAYS_2026[idx - 1] : null;
  const next = idx < HOLIDAYS_2026.length - 1 ? HOLIDAYS_2026[idx + 1] : null;

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title={`${holiday.name} 2026 Causeway Traffic — Peak Hours & Best Times`}
        description={`${holiday.name} causeway traffic prediction. ${sev.label} congestion expected. See peak hours, best times to cross, and tips for Woodlands & Tuas.`}
        path={`/holidays/${holiday.slug}`}
        breadcrumbs={[{ name: "Holidays", path: "/holidays" }, { name: holiday.name, path: `/holidays/${holiday.slug}` }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: `${holiday.name} — Causeway Traffic`,
          startDate: holiday.date_start,
          endDate: holiday.date_end,
          location: {
            "@type": "Place",
            name: "Singapore-Johor Bahru Causeway",
            address: "Woodlands & Tuas Checkpoints, Singapore",
          },
        }}
      />
      <div className="container pt-6 pb-12 max-w-2xl">
        {/* Breadcrumb */}
        <Link href="/holidays" className="inline-flex items-center gap-1 text-label text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("holiday_back")}
        </Link>

        {/* Hero */}
        <RevealSection>
          <div className={`rounded-2xl border-l-4 p-5 ${sev.bg}`} style={{ borderColor: `hsl(var(--status-${holiday.severity === "extreme" ? "jammed" : holiday.severity === "heavy" ? "heavy" : holiday.severity === "busy" ? "moderate" : "smooth"}))` }}>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-heading text-display-sm font-bold text-foreground">{holiday.name}</h1>
              <span className={`rounded-full px-2.5 py-1 text-label font-bold ${sev.bg} ${sev.text}`}>
                {sev.label}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{dateLabel}</p>
            {holiday.country !== "sg" && (
              <span className="mt-2 inline-flex items-center gap-1 text-label-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {holiday.country === "both" ? t("holiday_sg_my_holiday") : t("holiday_my_holiday")}
              </span>
            )}
          </div>
        </RevealSection>

        {/* Description */}
        <RevealSection>
          <div>
            <h2 className="font-heading text-title font-bold text-foreground">{t("holiday_what_to_expect")}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{holiday.description}</p>
          </div>
        </RevealSection>

        {/* Peak hours comparison */}
        <RevealSection>
          <div>
            <h2 className="font-heading text-title font-bold text-foreground mb-3">{t("holiday_peak_hours")}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <h3 className="font-heading text-label font-semibold">Woodlands</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{holiday.peak_hours_woodlands}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <h3 className="font-heading text-label font-semibold">Tuas</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{holiday.peak_hours_tuas}</p>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Best times */}
        <RevealSection>
          <div>
            <h2 className="font-heading text-title font-bold text-foreground mb-3">
              <CheckCircle className="inline h-5 w-5 text-status-smooth mr-1" />
              {t("holiday_best_times")}
            </h2>
            <div className="rounded-xl border border-border bg-status-smooth-tint p-4">
              <ul className="space-y-2">
                {holiday.best_alternative_times.map((time, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-status-smooth" />
                    <span className="text-foreground font-medium">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealSection>

        {/* Avoidance tips */}
        <RevealSection>
          <div>
            <h2 className="font-heading text-title font-bold text-foreground mb-3">
              <AlertTriangle className="inline h-5 w-5 text-status-heavy mr-1" />
              {t("holiday_tips")}
            </h2>
            <div className="rounded-xl border border-border bg-card p-4 shadow-card">
              <ul className="space-y-2">
                {holiday.avoidance_tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 text-foreground font-bold text-label-sm">{i + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealSection>

        {/* FAQs */}
        {holiday.faqs.length > 0 && (
          <RevealSection>
            <div>
              <h2 className="font-heading text-title font-bold text-foreground mb-4">{t("holiday_faq")}</h2>
              <FAQAccordion faqs={holiday.faqs} />
            </div>
          </RevealSection>
        )}


        {/* Nav between holidays */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {prev ? (
            <Link href={`/holidays/${prev.slug}`} className="text-label text-muted-foreground hover:text-foreground transition-colors">
              ← {prev.name}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/holidays/${next.slug}`} className="text-label text-muted-foreground hover:text-foreground transition-colors">
              {next.name} →
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
};

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return <div ref={ref} className="reveal mt-6">{children}</div>;
};

export default HolidayDetailPage;
