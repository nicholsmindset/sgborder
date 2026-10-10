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
    answer: "Inspect the latest Woodlands and Tuas camera images and their frame times. These Singapore views do not measure immigration queues or conditions on the Malaysia side.",
  },
  {
    question: "Which checkpoint is faster — Woodlands or Tuas?",
    answer: "Compare the camera images before leaving and consider your destination and the drive to each checkpoint. This dashboard cannot measure the full crossing time at either checkpoint.",
  },
  {
    question: "What is the best time to cross the causeway?",
    answer: "No hour guarantees a short crossing. Check ICA advisories, holiday dates and timestamped camera frames shortly before leaving.",
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
            "@type": "WebSite",
            "@id": "https://www.sgborder.live/#website",
            name: "SG Border Live",
            url: "https://www.sgborder.live/",
            publisher: { "@id": "https://www.sgborder.live/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "SG Border Live",
            url: "https://www.sgborder.live",
            description: "Singapore-JB crossing dashboard with timestamped checkpoint cameras and public bus arrivals.",
            applicationCategory: "TravelApplication",
            operatingSystem: "Web",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.sgborder.live/#organization",
            email: "hello@sgborder.live",
            name: "SG Border Live",
            url: "https://www.sgborder.live",
            description: "Independent Singapore-JB crossing information with timestamped checkpoint cameras, public bus arrivals and travel guides.",
            sameAs: ["https://github.com/nicholsmindset/sgborder"],
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
