import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { HOLIDAYS_2026, SEVERITY_CONFIG, type Holiday } from "@/data/holidays";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { CalendarDays, ChevronLeft, ChevronRight, ArrowRight, Calendar } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const holidayFaqs = [
  {
    question: "When is causeway traffic worst during holidays?",
    answer:
      "The worst congestion is typically on the eve of major holidays (especially Friday evenings before long weekends) and on the last day of the holiday period when everyone returns. Chinese New Year, Hari Raya, and Malaysia school holidays see the heaviest traffic.",
  },
  {
    question: "How early should I leave to avoid holiday traffic at Woodlands?",
    answer:
      "For extreme-severity holidays (CNY, Hari Raya), leave before 4 AM or after 10 PM to avoid the worst queues. For heavy-severity holidays, before 6 AM or after 9 PM is usually sufficient. Check our individual holiday predictions for specific timing advice.",
  },
  {
    question: "Is Tuas better than Woodlands during holidays?",
    answer:
      "Tuas (Second Link) is often less congested than Woodlands during holidays, but not always. Check both checkpoints on our live dashboard before deciding. During extreme holidays, both can be heavily congested.",
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const SEVERITY_KEYS = {
  normal: "severity_normal",
  busy: "severity_busy",
  heavy: "severity_heavy",
  extreme: "severity_extreme",
} as const;

const HolidaysPage = () => {
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const year = 2026;

  // Build holiday lookup by date string
  const holidayMap = useMemo(() => {
    const map = new Map<string, Holiday>();
    HOLIDAYS_2026.forEach((h) => {
      const start = new Date(h.date_start);
      const end = new Date(h.date_end);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        map.set(d.toISOString().slice(0, 10), h);
      }
    });
    return map;
  }, []);

  const daysInMonth = getDaysInMonth(year, selectedMonth);
  const firstDay = getFirstDayOfMonth(year, selectedMonth);

  // Holidays in current month
  const monthHolidays = HOLIDAYS_2026.filter((h) => {
    const m = new Date(h.date_start).getMonth();
    return m === selectedMonth;
  });

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="Causeway Traffic Holiday Calendar 2026 — Peak Hours & Predictions"
        description="2026 causeway holiday traffic predictions. See peak hours, best times to cross & severity forecasts for every Singapore & Malaysia holiday."
        path="/holidays"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: holidayFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10">
              <CalendarDays className="h-5 w-5" />
            </div>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {t("holidays_title")}
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {t("holidays_subtitle")}
          </p>
        </div>
      </section>

      {/* Month navigator */}
      <RevealSection>
        <div className="container">
          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3 shadow-card">
            <button
              onClick={() => setSelectedMonth(Math.max(0, selectedMonth - 1))}
              disabled={selectedMonth === 0}
              className="rounded-lg p-2 hover:bg-muted disabled:opacity-30 transition-colors active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-accent" />
              <span className="font-heading text-title font-bold">{MONTHS[selectedMonth]} {year}</span>
            </div>
            <button
              onClick={() => setSelectedMonth(Math.min(11, selectedMonth + 1))}
              disabled={selectedMonth === 11}
              className="rounded-lg p-2 hover:bg-muted disabled:opacity-30 transition-colors active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </RevealSection>

      {/* Calendar grid */}
      <RevealSection>
        <div className="container">
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-border bg-muted/50">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="py-2 text-center text-label-sm font-semibold text-muted-foreground">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7">
              {/* Empty leading cells */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`e-${i}`} className="aspect-square border-b border-r border-border last:border-r-0" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(selectedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const holiday = holidayMap.get(dateStr);
                const isToday =
                  new Date().getFullYear() === year &&
                  new Date().getMonth() === selectedMonth &&
                  new Date().getDate() === day;
                const cellIdx = firstDay + i;

                return (
                  <div
                    key={day}
                    className={`relative aspect-square border-b border-r border-border p-1 ${
                      cellIdx % 7 === 6 ? "border-r-0" : ""
                    } ${holiday ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""}`}
                    onClick={() => {
                      if (holiday) {
                        const el = document.getElementById(`holiday-${holiday.slug}`);
                        el?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }}
                  >
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-label-sm font-medium ${
                        isToday
                          ? "bg-accent text-accent-foreground"
                          : holiday
                          ? "font-bold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {day}
                    </span>
                    {holiday && (
                      <div className={`absolute bottom-1 left-1 right-1 h-1 rounded-full ${SEVERITY_CONFIG[holiday.severity].dot}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap gap-3 text-label-sm">
            {(["normal", "busy", "heavy", "extreme"] as const).map((sev) => (
              <span key={sev} className="inline-flex items-center gap-1.5 text-muted-foreground">
                <span className={`h-2 w-2 rounded-full ${SEVERITY_CONFIG[sev].dot}`} />
                {t(SEVERITY_KEYS[sev])}
              </span>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Holiday cards for current month */}
      {monthHolidays.length > 0 ? (
        <RevealSection>
          <div className="container space-y-3">
            <h2 className="font-heading text-title font-bold">
              {MONTHS[selectedMonth]} {t("holidays_holidays_in")}
            </h2>
            {monthHolidays.map((h) => (
              <HolidayCard key={h.slug} holiday={h} />
            ))}
          </div>
        </RevealSection>
      ) : (
        <RevealSection>
          <div className="container">
            <div className="rounded-xl border border-border bg-card p-6 text-center shadow-card">
              <p className="text-sm text-muted-foreground">{t("holidays_no_holidays")} {MONTHS[selectedMonth]}.</p>
              <p className="mt-1 text-label-sm text-muted-foreground">{t("holidays_standard_patterns")}</p>
            </div>
          </div>
        </RevealSection>
      )}

      {/* All upcoming */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">{t("holidays_all")}</h2>
          <div className="space-y-2">
            {HOLIDAYS_2026.map((h) => (
              <HolidayRow key={h.slug} holiday={h} />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* FAQ */}
      <RevealSection>
        <div className="container">
          <h2 className="font-heading text-title font-bold mb-3">{t("holidays_faq_title")}</h2>
          <FAQAccordion faqs={holidayFaqs} />
        </div>
      </RevealSection>
    </div>
  );
};

const HolidayCard = ({ holiday }: { holiday: Holiday }) => {
  const { t } = useTranslation();
  const sev = SEVERITY_CONFIG[holiday.severity];
  const startDate = new Date(holiday.date_start);
  const endDate = new Date(holiday.date_end);
  const dateLabel =
    holiday.date_start === holiday.date_end
      ? startDate.toLocaleDateString("en-SG", { day: "numeric", month: "short", weekday: "short" })
      : `${startDate.toLocaleDateString("en-SG", { day: "numeric", month: "short" })} – ${endDate.toLocaleDateString("en-SG", { day: "numeric", month: "short" })}`;

  return (
    <div id={`holiday-${holiday.slug}`} className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-heading text-sm font-bold text-foreground">{holiday.name}</h3>
            <span className={`rounded-full px-2 py-0.5 text-label-sm font-semibold ${sev.bg} ${sev.text}`}>
              {t(SEVERITY_KEYS[holiday.severity])}
            </span>
          </div>
          <p className="mt-0.5 text-label-sm text-muted-foreground">{dateLabel}</p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{holiday.description}</p>

          {/* Best times */}
          <div className="mt-3">
            <p className="text-label font-semibold text-foreground mb-1">{t("holidays_best_times")}</p>
            <ul className="space-y-0.5">
              {holiday.best_alternative_times.map((time, i) => (
                <li key={i} className="text-label-sm text-status-smooth font-medium">✓ {time}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Link
        to={`/holidays/${holiday.slug}`}
        className="mt-3 inline-flex items-center gap-1 text-label font-medium text-accent hover:text-accent/80 transition-colors"
      >
        {t("holidays_full_prediction")} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
};

const HolidayRow = ({ holiday }: { holiday: Holiday }) => {
  const { t } = useTranslation();
  const sev = SEVERITY_CONFIG[holiday.severity];
  const d = new Date(holiday.date_start);

  return (
    <Link
      to={`/holidays/${holiday.slug}`}
      className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-card transition-all hover:shadow-card-hover active:scale-[0.98]"
    >
      <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-muted">
        <span className="text-label-sm font-bold text-foreground leading-none">{d.getDate()}</span>
        <span className="text-[10px] uppercase text-muted-foreground leading-none mt-0.5">
          {d.toLocaleDateString("en-SG", { month: "short" })}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground truncate">{holiday.name}</p>
        <span className={`text-label-sm font-medium ${sev.text}`}>{t(SEVERITY_KEYS[holiday.severity])}</span>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </Link>
  );
};

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return <section ref={ref} className="reveal py-4">{children}</section>;
};

export default HolidaysPage;
