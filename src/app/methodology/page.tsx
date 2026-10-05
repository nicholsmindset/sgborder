import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "How SG Border Live Measures Road Conditions",
  description: "Our traffic data method: LTA road speed bands, observation freshness, camera sources and the limits of a road status signal at the Singapore–JB border.",
  alternates: { canonical: "https://www.sgborder.live/methodology" },
};

export default function MethodologyPage() {
  return (
    <div className="container max-w-3xl pb-12 pt-7 pb-mobile-nav">
      <p className="text-xs font-bold uppercase tracking-widest text-accent">Data transparency</p>
      <h1 className="mt-2 font-heading text-display-sm font-bold text-foreground md:text-display">How the road status works</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        The dashboard compares recent conditions on Singapore roads approaching Woodlands and Tuas. It helps you decide which checkpoint cameras to inspect before leaving.
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <h2 className="font-heading text-base font-bold">Road signal</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">The road model uses LTA DataMall speed bands as an indicative Singapore approach signal. It is paused while segment choice, direction mapping and collection reliability are checked.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <h2 className="font-heading text-base font-bold">Freshness rule</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Road status cards are paused while the collection source and direction mapping are validated. When enabled, samples older than 15 minutes will be hidden.</p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="font-heading text-title font-bold">What it cannot tell you</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Road speed is not an observed immigration or customs queue time.</li>
          <li>Singapore road data does not cover the Malaysia side of either crossing.</li>
          <li>Woodlands and Tuas have different driving distances, tolls and destinations. A smoother approach does not guarantee a shorter whole trip.</li>
          <li>Historical patterns are shown only when recorded data exists; they are not a promise for the next crossing.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-title font-bold">Camera images and sources</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Camera images come from Singapore government traffic feeds. They show the view available at each camera, with their own refresh timing. Check the image itself and the feed timestamp when judging a queue.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="https://datamall.lta.gov.sg/content/datamall/en/dynamic-data.html" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-semibold text-accent hover:bg-muted">LTA DataMall <ExternalLink className="h-4 w-4" /></a>
          <a href="https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/traffic_information/traffic-cameras.html" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-semibold text-accent hover:bg-muted">LTA traffic cameras <ExternalLink className="h-4 w-4" /></a>
        </div>
      </section>

      <p className="mt-8 text-xs text-muted-foreground">Method reviewed 5 October 2026.</p>
      <Link href="/cameras" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent hover:underline">View checkpoint cameras <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );
}
