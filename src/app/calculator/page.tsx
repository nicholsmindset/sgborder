import type { Metadata } from "next";
import CalculatorClient from "@/page-components/Calculator";

export const metadata: Metadata = {
  title: "SG to JB Driving Cost Calculator — Woodlands & Tuas Tolls",
  description:
    "Calculate published Singapore checkpoint tolls and Malaysia road charge for a Singapore registered car or motorcycle crossing to JB via Woodlands or Tuas.",
  alternates: { canonical: "https://www.sgborder.live/calculator" },
};

export default function CalculatorPage() {
  return (
    <CalculatorClient />
  );
}
