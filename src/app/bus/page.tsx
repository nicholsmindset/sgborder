import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import BusHubClient from "@/page-components/BusHub";

const busFaqs = [
  { question: "Where can I check current bus fares?", answer: "Check the operator before travelling. Fares vary by distance, payment method and direction, and may change." },
  { question: "How long does the bus to JB take?", answer: "Journey time depends on road traffic and clearance at both countries' checkpoints. Check cameras before leaving and allow extra time on holidays." },
  { question: "Which bus goes from Singapore to JB via Tuas?", answer: "Causeway Link services CW3 and CW7 use the Tuas Second Link. Check the operator's current stops and hours." },
  { question: "Do I need to get off the bus at the checkpoint?", answer: "Yes. All passengers must alight at Singapore immigration to clear customs, then board another bus on the other side." },
  { question: "Can I use EZ-Link card on cross-border buses?", answer: "Payment methods differ by operator and route. Check the operator's current payment options before boarding." },
];

export const metadata: Metadata = {
  title: "Bus to JB — Cross-Border Routes via Woodlands & Tuas",
  description:
    "Compare Singapore to JB bus routes by checkpoint: CW1, CW2, 160, 170, 170X, 950, CW3 and CW7. Check current fares and schedules with the operators.",
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

      <BusHubClient />
    </>
  );
}
