import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RTS Link Singapore–JB: Route, Opening Target & Fare Status",
  description: "Officially confirmed RTS Link route and journey time, co-located immigration, and the current status of opening and fare announcements.",
  alternates: { canonical: "https://www.sgborder.live/rts-link" },
};

const facts = [
  ["Route", "Woodlands North ↔ Bukit Chagar"],
  ["Train journey", "About 5 minutes between stations"],
  ["Capacity", "Up to 10,000 passengers per hour per direction"],
  ["Immigration", "Singapore and Malaysia clearance at the departure station"],
  ["Fare", "Not officially announced"],
  ["Service timetable", "Not officially announced"],
];

export default function RTSLinkPage() {
  return (
    <div className="container max-w-3xl py-8 pb-mobile-nav md:py-12">
      <p className="text-sm font-semibold text-accent">Rail crossing guide · Reviewed 27 Sep 2026</p>
      <h1 className="mt-2 font-heading text-display-sm font-bold text-foreground md:text-display">RTS Link: Singapore to Johor Bahru</h1>
      <p className="mt-3 text-muted-foreground leading-relaxed">The planned two-station rail link connects Woodlands North in Singapore with Bukit Chagar in JB. Singapore’s Ministry of Transport has targeted passenger service by December 2026. An exact opening day has not been announced, so treat that date as a target.</p>

      <section className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-card" aria-labelledby="rts-facts">
        <h2 id="rts-facts" className="font-heading text-title font-bold">What is confirmed</h2>
        <dl className="mt-4 divide-y divide-border/60">
          {facts.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr]">
              <dt className="font-medium text-foreground">{label}</dt>
              <dd className="text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="font-heading text-title font-bold">How the crossing will work</h2>
        <p className="text-muted-foreground leading-relaxed">Passengers will clear both countries’ immigration and customs at the station where they depart, before boarding. The five-minute figure describes the train ride; it does not include station access, security, immigration or waiting for a train.</p>
        <p className="text-muted-foreground leading-relaxed">Fares, ticket options, first and last trains, and exact service intervals should be checked with the operator when published. Avoid relying on quoted ticket prices or a launch countdown before an official announcement.</p>
      </section>

      <section className="mt-8 rounded-2xl bg-muted/60 p-5">
        <h2 className="font-heading text-title font-bold">Sources and current alternatives</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li><a className="text-accent underline" href="https://www.mot.gov.sg/news-resources/newsroom/singapore-and-malaysia-commemorate-the-unveiling-of-the--first-johor-bahru---singapore-rts-link-train/" target="_blank" rel="noopener noreferrer">Singapore Ministry of Transport project update</a></li>
          <li><a className="text-accent underline" href="https://www.mot.gov.sg/news-resources/newsroom/joint-statement-by-singapore-and-malaysia-on-resumption-of-the-johor-bahru---singapore-rapid-transit-system-link-project/" target="_blank" rel="noopener noreferrer">Singapore–Malaysia joint statement on fare setting and immigration</a></li>
          <li><Link className="text-accent underline" href="/bus">Current cross-border buses</Link> and <Link className="text-accent underline" href="/cameras">checkpoint cameras</Link></li>
        </ul>
      </section>
    </div>
  );
}
