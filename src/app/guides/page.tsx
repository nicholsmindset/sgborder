import type { Metadata } from "next";
import GuidesIndexClient from "@/page-components/GuidesIndex";
import { GUIDES } from "@/data/guides";

export const metadata: Metadata = {
  title: "Causeway Traffic Guide — Best Time to Cross, VEP, Bus & Tips",
  description:
    "Practical guides for crossing to JB: best time to cross the causeway, VEP Malaysia guide, bus routes, checkpoint tips, and travel costs.",
  alternates: { canonical: "https://www.sgborder.live/guides" },
};

export default function GuidesPage() {
  return (
    <>

      <GuidesIndexClient />
    </>
  );
}
