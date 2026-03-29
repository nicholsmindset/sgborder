import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import IndexClient from "@/page-components/Index";

export const metadata: Metadata = {
  title: "Causeway Traffic Live — Woodlands & Tuas Checkpoint CCTV Camera Status",
  description:
    "Live causeway traffic status for Woodlands & Tuas checkpoints. LTA CCTV cameras, bus arrivals, wait times updated every 5 min. SG to JB traffic — check now before you cross.",
  alternates: { canonical: "https://www.sgborder.live/" },
  openGraph: {
    title: "Causeway Traffic Live — Woodlands & Tuas Checkpoint CCTV Camera Status",
    description: "Live causeway traffic status for Woodlands & Tuas checkpoints. Updated every 5 min.",
    url: "https://www.sgborder.live/",
  },
};

const homeFaqs = [
  {
    question: "How do I check causeway traffic before crossing to JB?",
    answer: "Use the live dashboard above to see real-time traffic status for both Woodlands and Tuas checkpoints. Status updates every 5 minutes with data from LTA and Google Routes, including CCTV camera feeds and estimated wait times.",
  },
  {
    question: "Which checkpoint is faster — Woodlands or Tuas?",
    answer: "It depends on the time and day. Woodlands handles more traffic but has more lanes. Tuas (Second Link) is often less congested on weekdays but can jam on weekends. Compare both checkpoints on our dashboard to decide.",
  },
  {
    question: "What is the best time to cross the causeway?",
    answer: "The best times are typically early morning (before 6 AM) or late evening (after 10 PM) on weekdays. Avoid Friday evenings and Saturday mornings when traffic peaks.",
  },
  {
    question: "How often is the causeway traffic data updated?",
    answer: "Traffic status and camera images are updated every 5 minutes. Bus arrival data refreshes every 60 seconds. All data is sourced from LTA DataMall and Google Routes API.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "SG Border Live",
            url: "https://www.sgborder.live",
            description: "Real-time Singapore-JB causeway traffic dashboard with live cameras, bus tracking, and travel predictions.",
            applicationCategory: "TravelApplication",
            operatingSystem: "Web",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SG Border Live",
            url: "https://www.sgborder.live",
            description: "Real-time Singapore-JB causeway traffic dashboard with live cameras, bus tracking, and commuter intelligence.",
            sameAs: ["https://sgborder.live"],
            areaServed: ["SG", "MY"],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFaqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
        ]}
      />
      {/* Static SEO content visible to crawlers */}
      <div className="sr-only">
        <h1>Singapore to JB Causeway Traffic Live — Real-Time Checkpoint Status</h1>
        <p>Check live causeway traffic conditions at Woodlands and Tuas checkpoints before crossing to Johor Bahru. Real-time LTA CCTV camera feeds, estimated wait times, cross-border bus arrivals, and hourly traffic patterns — all updated every 5 minutes.</p>
        <h2>Live Traffic Status</h2>
        <p>Our dashboard shows real-time congestion levels (Smooth, Moderate, Heavy, Jammed) for both Woodlands Checkpoint and Tuas Second Link, in both directions (SG to JB and JB to SG).</p>
        <h2>Causeway Traffic Cameras</h2>
        <p>View live LTA traffic camera images from Woodlands Causeway, BKE approach, Tuas Second Link, and AYE approach — refreshed every 5 minutes.</p>
        <h2>Cross-Border Bus Arrivals</h2>
        <p>Real-time bus arrival times for CW1, CW2, 170, 170X, 950 and more cross-border services from Singapore to Johor Bahru.</p>
        <h2>Frequently Asked Questions</h2>
        {homeFaqs.map((faq, i) => (
          <div key={i}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
      <IndexClient />
    </>
  );
}
