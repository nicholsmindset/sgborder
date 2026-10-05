import type { Metadata } from "next";
import CrossingHub from "@/components/content/CrossingHub";

export const metadata: Metadata = {
  title: "SG–JB Crossing Rules: Fuel, Malaysia Road Charge & Customs",
  description: "Official-source guides to Singapore's three-quarter tank rule, Malaysia's Road Charge and customs when returning from JB.",
  alternates: { canonical: "https://www.sgborder.live/rules" },
};

export default function RulesPage() { return <CrossingHub group="rules" />; }
