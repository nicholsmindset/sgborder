import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import HolidaysClient from "@/page-components/HolidaysPage";
import { HOLIDAYS_2026 } from "@/data/holidays";

const holidayFaqs = [
  { question: "When is causeway traffic worst during holidays?", answer: "The worst congestion is typically on the eve of major holidays and on the last day of the holiday period. Chinese New Year, Hari Raya, and Malaysia school holidays see the heaviest traffic." },
  { question: "How early should I leave to avoid holiday traffic at Woodlands?", answer: "For extreme-severity holidays (CNY, Hari Raya), leave before 4 AM or after 10 PM. For heavy-severity holidays, before 6 AM or after 9 PM is usually sufficient." },
  { question: "Is Tuas better than Woodlands during holidays?", answer: "Tuas is often less congested during holidays, but not always. Check both checkpoints on our live dashboard before deciding." },
];

export const metadata: Metadata = {
  title: "Causeway Traffic Holiday Calendar 2026 — Peak Hours & Predictions",
  description:
    "2026 causeway holiday traffic predictions. See peak hours, best times to cross & severity forecasts for every Singapore & Malaysia holiday.",
  alternates: { canonical: "/holidays" },
};

export default function HolidaysPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: holidayFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <div className="sr-only">
        <h2>Causeway Traffic Holiday Calendar 2026</h2>
        <p>Plan your border crossing around Singapore and Malaysia public holidays. Traffic predictions, peak hours, and best times to cross for every major holiday in 2026.</p>
        <h2>2026 Holiday Traffic Predictions</h2>
        <ul>
          {HOLIDAYS_2026.map((h) => (
            <li key={h.slug}>
              <a href={`/holidays/${h.slug}`}>{h.name}</a> ({h.date_start}) — Severity: {h.severity}
            </li>
          ))}
        </ul>
      </div>
      <HolidaysClient />
    </>
  );
}
