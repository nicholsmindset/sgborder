"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CALENDAR_PAGES, type PublicHoliday, type SchoolHolidayPeriod } from "@/data/public-holidays";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { CalendarDays, ArrowRight, ArrowLeft, GraduationCap, AlertTriangle } from "lucide-react";

const IMPACT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  none: { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-muted-foreground" },
  low: { bg: "bg-status-smooth-tint", text: "text-status-smooth", dot: "bg-status-smooth" },
  moderate: { bg: "bg-status-moderate-tint", text: "text-status-moderate", dot: "bg-status-moderate" },
  heavy: { bg: "bg-status-heavy-tint", text: "text-status-heavy", dot: "bg-status-heavy" },
  extreme: { bg: "bg-status-jammed-tint", text: "text-status-jammed", dot: "bg-status-jammed" },
};

const IMPACT_LABEL: Record<string, string> = {
  none: "No Impact",
  low: "Low",
  moderate: "Moderate",
  heavy: "Heavy",
  extreme: "Extreme",
};

const HolidayCalendarPage = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const config = slug ? CALENDAR_PAGES[slug] : undefined;

  if (!config) {
    return (
      <div className="container py-16 text-center pb-mobile-nav">
        <p className="text-muted-foreground">Calendar not found.</p>
        <Link href="/holidays" className="mt-4 inline-block text-accent hover:underline">
          ← Back to holidays
        </Link>
      </div>
    );
  }

  const isSchoolPage = config.type === "school";

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title={config.title}
        description={config.description}
        path={`/holidays/${config.slug}`}
        breadcrumbs={[
          { name: "Holidays", path: "/holidays" },
          { name: config.h1, path: `/holidays/${config.slug}` },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: config.faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: config.h1,
            description: config.description,
            datePublished: "2026-01-01",
            dateModified: "2026-03-22",
            author: {
              "@type": "Organization",
              name: "SG Border Live",
              url: "https://www.sgborder.live",
            },
          },
        ]}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8">
          <Link
            href="/holidays"
            className="inline-flex items-center gap-1 text-label text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Holiday Calendar
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10">
              {isSchoolPage ? (
                <GraduationCap className="h-5 w-5" />
              ) : (
                <CalendarDays className="h-5 w-5" />
              )}
            </div>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {config.h1}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/70 leading-relaxed max-w-2xl">
            {config.introText}
          </p>
        </div>
      </section>

      {/* School Holiday Periods (for school page) */}
      {isSchoolPage && config.schoolHolidays && (
        <RevealSection>
          <div className="container">
            <h2 className="font-heading text-title font-bold mb-3">
              School Holiday Periods
            </h2>
            <div className="space-y-3">
              {config.schoolHolidays.map((period, i) => (
                <SchoolHolidayCard key={i} period={period} />
              ))}
            </div>
          </div>
        </RevealSection>
      )}

      {/* Holiday Table */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">
            {isSchoolPage
              ? "Public Holidays During School Terms"
              : `All ${config.country === "sg" ? "Singapore" : "Malaysia"} Public Holidays 2026`}
          </h2>
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Day</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Holiday</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Causeway Impact</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Traffic Prediction</th>
                  </tr>
                </thead>
                <tbody>
                  {config.holidays.map((h, i) => (
                    <HolidayTableRow key={i} holiday={h} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-border">
              {config.holidays.map((h, i) => (
                <HolidayMobileCard key={i} holiday={h} />
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Impact Legend */}
      <RevealSection>
        <div className="container">
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <h3 className="font-heading text-label font-semibold mb-2">Causeway Traffic Impact Legend</h3>
            <div className="flex flex-wrap gap-3 text-label-sm">
              {(["low", "moderate", "heavy", "extreme"] as const).map((level) => (
                <span key={level} className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <span className={`h-2 w-2 rounded-full ${IMPACT_COLORS[level].dot}`} />
                  <span className="font-medium">{IMPACT_LABEL[level]}</span>
                </span>
              ))}
            </div>
            <p className="mt-2 text-label-sm text-muted-foreground">
              Extreme = 3-5 hour waits. Heavy = 1-3 hours. Moderate = 30-60 min extra. Low = normal traffic.
            </p>
          </div>
        </div>
      </RevealSection>

      {/* CTA to live dashboard */}
      <RevealSection>
        <div className="container">
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 text-center">
            <AlertTriangle className="h-5 w-5 text-accent mx-auto mb-2" />
            <h3 className="font-heading text-sm font-bold text-foreground">
              Crossing the causeway during a holiday?
            </h3>
            <p className="mt-1 text-label-sm text-muted-foreground">
              Check live traffic status before you leave. Updated every 5 minutes.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1 rounded-lg bg-accent px-4 py-2 text-label font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Live Dashboard <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/holidays"
                className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-label font-semibold text-foreground transition-colors hover:bg-muted"
              >
                All Holiday Predictions
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Cross-link to other calendar pages */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">Related Calendars</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(CALENDAR_PAGES)
              .filter((p) => p.slug !== config.slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/holidays/${p.slug}`}
                  className="rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-card-hover active:scale-[0.98]"
                >
                  <p className="font-heading text-sm font-bold text-foreground">{p.h1}</p>
                  <p className="mt-1 text-label-sm text-muted-foreground line-clamp-2">
                    {p.description}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-label font-medium text-accent">
                    View <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </RevealSection>

      {/* FAQ */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={config.faqs} />
        </div>
      </RevealSection>
    </div>
  );
};

const HolidayTableRow = ({ holiday }: { holiday: PublicHoliday }) => {
  const impact = IMPACT_COLORS[holiday.causewayImpact];
  const d = new Date(holiday.date);
  const formatted = d.toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <tr className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3 font-mono text-label-sm whitespace-nowrap">{formatted}</td>
      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{holiday.day}</td>
      <td className="px-4 py-3">
        <span className="font-medium text-foreground">{holiday.name}</span>
        {holiday.type === "observed" && (
          <span className="ml-1.5 text-label-sm text-muted-foreground">(replacement)</span>
        )}
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-label-sm font-semibold ${impact.bg} ${impact.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${impact.dot}`} />
          {IMPACT_LABEL[holiday.causewayImpact]}
        </span>
      </td>
      <td className="px-4 py-3">
        {holiday.causewaySeveritySlug ? (
          <Link
            href={`/holidays/${holiday.causewaySeveritySlug}`}
            className="inline-flex items-center gap-1 text-label font-medium text-accent hover:text-accent/80 transition-colors"
          >
            View prediction <ArrowRight className="h-3 w-3" />
          </Link>
        ) : (
          <span className="text-label-sm text-muted-foreground">
            {holiday.notes || "—"}
          </span>
        )}
      </td>
    </tr>
  );
};

const HolidayMobileCard = ({ holiday }: { holiday: PublicHoliday }) => {
  const impact = IMPACT_COLORS[holiday.causewayImpact];
  const d = new Date(holiday.date);
  const formatted = d.toLocaleDateString("en-SG", { day: "numeric", month: "short" });

  return (
    <div className="p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-muted">
          <span className="text-label-sm font-bold text-foreground leading-none">{d.getDate()}</span>
          <span className="text-[10px] uppercase text-muted-foreground leading-none mt-0.5">
            {d.toLocaleDateString("en-SG", { month: "short" })}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-foreground">{holiday.name}</p>
            <span className={`rounded-full px-2 py-0.5 text-label-sm font-semibold ${impact.bg} ${impact.text}`}>
              {IMPACT_LABEL[holiday.causewayImpact]}
            </span>
          </div>
          <p className="text-label-sm text-muted-foreground">{holiday.day} · {formatted}</p>
          {holiday.notes && (
            <p className="mt-1 text-label-sm text-muted-foreground">{holiday.notes}</p>
          )}
          {holiday.causewaySeveritySlug && (
            <Link
              href={`/holidays/${holiday.causewaySeveritySlug}`}
              className="mt-1 inline-flex items-center gap-1 text-label font-medium text-accent"
            >
              Traffic prediction <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const SchoolHolidayCard = ({ period }: { period: SchoolHolidayPeriod }) => {
  const impact = IMPACT_COLORS[period.causewayImpact];
  const start = new Date(period.date_start);
  const end = new Date(period.date_end);
  const startLabel = start.toLocaleDateString("en-SG", { day: "numeric", month: "short" });
  const endLabel = end.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" });

  // Calculate duration
  const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const weeks = Math.round(days / 7);

  return (
    <div className={`rounded-xl border-l-4 border border-border bg-card p-4 shadow-card`} style={{ borderLeftColor: `var(--status-${period.causewayImpact === "heavy" ? "heavy" : "moderate"})` }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-sm font-bold text-foreground">{period.name}</h3>
          <p className="text-label-sm text-muted-foreground mt-0.5">
            {startLabel} — {endLabel} ({weeks > 1 ? `~${weeks} weeks` : `${days} days`})
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-label-sm font-semibold ${impact.bg} ${impact.text}`}>
          {IMPACT_LABEL[period.causewayImpact]} Traffic
        </span>
      </div>
      {period.notes && (
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{period.notes}</p>
      )}
    </div>
  );
};

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return <section ref={ref} className="reveal py-4">{children}</section>;
};

export default HolidayCalendarPage;
