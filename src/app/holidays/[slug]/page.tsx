import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import { HOLIDAYS_2026, SEVERITY_CONFIG } from "@/data/holidays";
import { CALENDAR_PAGES } from "@/data/public-holidays";
import HolidayDetailClient from "@/page-components/HolidayDetailPage";
import HolidayCalendarClient from "@/page-components/HolidayCalendarPage";

export function generateStaticParams() {
  const holidaySlugs = HOLIDAYS_2026.map((h) => ({ slug: h.slug }));
  const calendarSlugs = Object.keys(CALENDAR_PAGES).map((slug) => ({ slug }));
  return [...holidaySlugs, ...calendarSlugs];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (params.slug in CALENDAR_PAGES) {
    const page = CALENDAR_PAGES[params.slug as keyof typeof CALENDAR_PAGES];
    return {
      title: page?.title || `${params.slug} — Holiday Calendar`,
      description: page?.description || "Holiday calendar with causeway traffic impact predictions.",
      alternates: { canonical: `/holidays/${params.slug}` },
    };
  }

  const holiday = HOLIDAYS_2026.find((h) => h.slug === params.slug);
  if (!holiday) return { title: "Holiday Not Found" };

  const sev = SEVERITY_CONFIG[holiday.severity];
  return {
    title: `${holiday.name} 2026 Causeway Traffic — Peak Hours & Best Times`,
    description: `${holiday.name} causeway traffic prediction. ${sev.label} congestion expected. See peak hours, best times to cross, and tips for Woodlands & Tuas.`,
    alternates: { canonical: `/holidays/${holiday.slug}` },
  };
}

export default function HolidaySlugPage({ params }: { params: { slug: string } }) {
  const isCalendar = params.slug in CALENDAR_PAGES;
  const holiday = !isCalendar ? HOLIDAYS_2026.find((h) => h.slug === params.slug) : null;

  return (
    <>
      {holiday && (
        <>
          <JsonLd
            data={{
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
          <div className="sr-only">
            <h2>{holiday.name} 2026 — Causeway Traffic Prediction</h2>
            <p>{holiday.description}</p>
            <h2>Peak Hours</h2>
            <p>Woodlands: {holiday.peak_hours_woodlands}</p>
            <p>Tuas: {holiday.peak_hours_tuas}</p>
            <h2>Best Times to Cross</h2>
            <ul>
              {holiday.best_alternative_times.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        </>
      )}
      {isCalendar ? <HolidayCalendarClient /> : <HolidayDetailClient />}
    </>
  );
}
