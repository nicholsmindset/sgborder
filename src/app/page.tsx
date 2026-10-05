import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import IndexClient from "@/page-components/Index";
import { getCheckpointCameras } from "@/lib/server-cameras";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Causeway Traffic Live — Woodlands & Tuas Checkpoint CCTV Camera Status",
  description:
    "Check the Singapore road approaches to Woodlands and Tuas, LTA checkpoint cameras, and cross-border bus arrivals before travelling to JB. Freshness shown on each feed.",
  alternates: { canonical: "https://www.sgborder.live/" },
  openGraph: {
    title: "Causeway Traffic Live — Woodlands & Tuas Checkpoint CCTV Camera Status",
    description: "Checkpoint cameras, Singapore road approach conditions and public bus arrivals for Woodlands and Tuas.",
    url: "https://www.sgborder.live/",
  },
};

const homeFaqs = [
  {
    question: "How do I check causeway traffic before crossing to JB?",
    answer: "Compare recent road conditions near Woodlands and Tuas, then inspect checkpoint cameras. Road status does not include immigration queues or Malaysia-side travel.",
  },
  {
    question: "Which checkpoint is faster — Woodlands or Tuas?",
    answer: "Compare current road conditions and cameras, then consider your destination and the drive to each checkpoint. Conditions can change before you arrive.",
  },
  {
    question: "What is the best time to cross the causeway?",
    answer: "Patterns vary by weekday and holiday. Check recent camera images before travelling and treat historical patterns as a guide.",
  },
  {
    question: "How often is the causeway traffic data updated?",
    answer: "We check LTA camera images on a five-minute cycle and show each source time. Road status is paused while its data source is validated. Camera images do not measure the full immigration queue.",
  },
];

export default async function HomePage() {
  const initialCameras = await getCheckpointCameras();
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "SG Border Live",
            url: "https://www.sgborder.live",
            description: "Singapore-JB crossing dashboard with checkpoint cameras, road approach status and bus arrivals.",
            applicationCategory: "TravelApplication",
            operatingSystem: "Web",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SG Border Live",
            url: "https://www.sgborder.live",
            description: "Singapore-JB crossing information with checkpoint cameras, road approach status and travel guides.",
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

      <IndexClient initialCameras={initialCameras} />
    </>
  );
}
