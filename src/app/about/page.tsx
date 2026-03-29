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
      <div className="sr-only">
        <h1>About SG Border Live</h1>
        <p>SG Border Live is a free, independent traffic information service for the Singapore–Johor Bahru border crossing. We aggregate live data from official Singapore government APIs to give commuters a clear view of current conditions.</p>
      </div>
      <AboutClient />
    </>
  );
}
