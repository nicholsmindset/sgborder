import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import CalculatorClient from "@/page-components/Calculator";

const vepFaqs = [
  { question: "What is the VEP (Vehicle Entry Permit) for Malaysia?", answer: "The VEP is a mandatory permit for all Singapore-registered vehicles entering Malaysia. It uses an RFID tag attached to your windscreen. The current daily fee is S$35 for cars (increasing to S$50 in 2027)." },
  { question: "How much does it cost to drive across the causeway?", answer: "Total cost depends on your vehicle and checkpoint. For a car via Woodlands: S$0.80 toll each way + S$35 VEP daily fee + RM20 Malaysia road charge. Via Tuas: S$2.10 toll each way." },
  { question: "Is Woodlands or Tuas toll cheaper?", answer: "Woodlands is significantly cheaper at S$0.80 per crossing vs S$2.10 at Tuas for cars. However, Tuas may save time during peak hours." },
  { question: "When do VEP fees increase to S$50?", answer: "The VEP daily fee for cars increases from S$35 to S$50 on 1 January 2027. Motorcycle fees increase from S$4 to S$7." },
];

export const metadata: Metadata = {
  title: "VEP Malaysia Calculator — Toll, Fees & Crossing Cost 2026",
  description:
    "Calculate your VEP Malaysia cost, causeway toll & total crossing fees. Includes Woodlands/Tuas tolls, VEP registration fees, and Malaysia road charges for 2026.",
  alternates: { canonical: "/calculator" },
};

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: vepFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <div className="sr-only">
        <h2>VEP Malaysia Calculator — Causeway Toll & Crossing Cost</h2>
        <p>Calculate total costs for driving from Singapore to JB. Includes Singapore tolls (Woodlands S$0.80, Tuas S$2.10), VEP daily fee (S$35 cars, S$4 motorcycles), and Malaysia road charge (RM20).</p>
        <h2>Frequently Asked Questions</h2>
        {vepFaqs.map((faq, i) => (
          <div key={i}><h3>{faq.question}</h3><p>{faq.answer}</p></div>
        ))}
      </div>
      <CalculatorClient />
    </>
  );
}
