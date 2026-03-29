import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import BusHubClient from "@/page-components/BusHub";
import { BUS_ROUTES } from "@/lib/bus-data";

const busFaqs = [
  { question: "What is the cheapest bus from Singapore to JB?", answer: "The cheapest options are SBS Transit buses 160 and 170 at S$1.19 (adult cash fare with EZ-Link). Causeway Link CW1 costs S$1.50." },
  { question: "How long does the bus to JB take?", answer: "During smooth traffic, the bus ride takes 20-30 minutes. During peak hours it can take 1-3 hours due to immigration queues." },
  { question: "Which bus goes from Singapore to JB via Tuas?", answer: "CW3 and CW4 by Causeway Link go via Tuas Second Link. They're a good alternative when Woodlands is congested." },
  { question: "Do I need to get off the bus at the checkpoint?", answer: "Yes. All passengers must alight at Singapore immigration to clear customs, then board another bus on the other side." },
  { question: "Can I use EZ-Link card on cross-border buses?", answer: "Yes, SBS Transit buses (160, 170, 170X, 950) accept EZ-Link and NETS cards. Causeway Link buses accept their own stored-value card and cash." },
];

export const metadata: Metadata = {
  title: "Bus to JB — Singapore to Johor Bahru Cross-Border Bus Routes & Fares",
  description:
    "All buses from Singapore to JB: CW1, CW2, 170, 170X, 950 routes with live arrivals, fares, schedules. Compare Woodlands & Tuas bus options.",
  alternates: { canonical: "https://www.sgborder.live/bus" },
};

export default function BusPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: busFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <div className="sr-only">
        <h1>Bus to JB — Singapore to Johor Bahru Cross-Border Bus Routes</h1>
        <p>Complete guide to all cross-border bus services from Singapore to Johor Bahru. Live arrival times, fares in SGD and MYR, schedules, and route information.</p>
        <h2>Cross-Border Bus Routes via Woodlands</h2>
        {BUS_ROUTES.filter(r => r.via_checkpoint === "woodlands").map(r => (
          <div key={r.slug}>
            <h3>Bus {r.service_no} — {r.route_name}</h3>
            <p>From {r.sg_departure} to {r.jb_arrival}. Fare: S${r.fare_sgd} / RM{r.fare_myr}. First bus: {r.first_bus}, Last bus: {r.last_bus}. Operator: {r.operator}.</p>
          </div>
        ))}
        <h2>Cross-Border Bus Routes via Tuas</h2>
        {BUS_ROUTES.filter(r => r.via_checkpoint === "tuas").map(r => (
          <div key={r.slug}>
            <h3>Bus {r.service_no} — {r.route_name}</h3>
            <p>From {r.sg_departure} to {r.jb_arrival}. Fare: S${r.fare_sgd} / RM{r.fare_myr}. First bus: {r.first_bus}, Last bus: {r.last_bus}. Operator: {r.operator}.</p>
          </div>
        ))}
        <h2>Frequently Asked Questions</h2>
        {busFaqs.map((faq, i) => (
          <div key={i}><h3>{faq.question}</h3><p>{faq.answer}</p></div>
        ))}
      </div>
      <BusHubClient />
    </>
  );
}
