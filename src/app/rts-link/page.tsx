import type { Metadata } from "next";
import RTSLinkClient from "@/page-components/RTSLinkPage";

export const metadata: Metadata = {
  title: "RTS Link — Johor Bahru–Singapore Rapid Transit System (Opening 2027)",
  description:
    "Everything about the RTS Link rapid transit connecting Woodlands North (Singapore) to Bukit Chagar (JB). Opening 2027. Journey time: 5 minutes. Estimated fare: S$5-7.",
  alternates: { canonical: "/rts-link" },
};

export default function RTSLinkPage() {
  return (
    <>
      <div className="sr-only">
        <h2>RTS Link — Johor Bahru–Singapore Rapid Transit System</h2>
        <p>The RTS Link is a cross-border rapid transit system connecting Woodlands North station (Singapore) to Bukit Chagar station (Johor Bahru). Expected to open in 2027 with a 5-minute journey time and capacity of 10,000 passengers per hour per direction.</p>
        <h2>Key Facts</h2>
        <ul>
          <li>Distance: 4 km</li>
          <li>Journey time: ~5 minutes</li>
          <li>Estimated fare: S$5-7</li>
          <li>Capacity: 10,000 passengers/hour/direction</li>
          <li>Immigration: Co-located CIQ at departure station</li>
        </ul>
      </div>
      <RTSLinkClient />
    </>
  );
}
