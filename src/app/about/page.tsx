import type { Metadata } from "next";
import AboutClient from "@/page-components/AboutPage";

export const metadata: Metadata = {
  title: "About SG Border Live — Real-Time Causeway Traffic & Bus Info",
  description:
    "SG Border Live provides real-time Singapore–JB causeway traffic status, LTA camera feeds, cross-border bus arrivals, and commuter guides. Independent, free, updated every 5 minutes.",
  alternates: { canonical: "https://www.sgborder.live/about" },
};

export default function AboutPage() {
  return (
    <>

      <AboutClient />
    </>
  );
}
