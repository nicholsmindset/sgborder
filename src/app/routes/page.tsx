import type { Metadata } from "next";
import CrossingHub from "@/components/content/CrossingHub";

export const metadata: Metadata = {
  title: "Singapore to JB Routes: JB Sentral, LEGOLAND & Checkpoints",
  description: "Choose Woodlands or Tuas and compare practical ways to reach JB Sentral and LEGOLAND Malaysia from Singapore.",
  alternates: { canonical: "https://www.sgborder.live/routes" },
};

export default function RoutesPage() { return <CrossingHub group="routes" />; }
