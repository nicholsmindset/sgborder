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
      <div className="sr-only">
        <h1>Causeway Traffic Guides — Singapore to JB Crossing Tips</h1>
        <p>Practical, data-driven guides for crossing the Singapore-JB causeway. Best times to cross, VEP registration, bus routes, and checkpoint-specific advice.</p>
        <h2>Available Guides</h2>
        <ul>
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <a href={`/guides/${g.slug}`}>{g.title}</a> — {g.description}
            </li>
          ))}
        </ul>
      </div>
      <GuidesIndexClient />
    </>
  );
}
