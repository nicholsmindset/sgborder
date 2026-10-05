import type { Metadata } from "next";
import AboutClient from "@/page-components/AboutPage";

export const metadata: Metadata = {
  title: "About SG Border Live — Real-Time Causeway Traffic & Bus Info",
  description:
    "About SG Border Live: an independent SG–JB crossing guide with timestamped LTA cameras, Singapore bus arrivals and source-backed travel information.",
  alternates: { canonical: "https://www.sgborder.live/about" },
};

export default function AboutPage() {
  return (
    <>

      <AboutClient />
    </>
  );
}
