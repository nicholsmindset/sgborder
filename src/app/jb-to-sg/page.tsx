import type { Metadata } from "next";
import Link from "next/link";
import { CameraGrid } from "@/components/dashboard/CameraGrid";
import { getCheckpointCameras } from "@/lib/server-cameras";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "JB to SG Traffic Today: Return Crossing Cameras and Entry Checklist",
  description: "Plan your JB to Singapore return with timestamped Woodlands and Tuas camera views, ICA advisories and the official SG Arrival Card eligibility rules.",
  alternates: { canonical: "https://www.sgborder.live/jb-to-sg" },
};

export default async function JbToSgPage() {
  const cameras = await getCheckpointCameras();
  return <div className="pb-mobile-nav">
    <header className="bg-primary text-primary-foreground">
      <div className="container py-7 md:py-10">
        <p className="text-xs font-bold uppercase tracking-widest text-status-smooth">Johor Bahru → Singapore</p>
        <h1 className="mt-2 max-w-3xl font-heading text-display-sm font-bold md:text-display">JB to SG return traffic today</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">Use timestamped Singapore road cameras as one check before returning. They do not show Malaysia-side queues or a measured JB→SG wait.</p>
      </div>
    </header>
    <main className="container max-w-5xl py-5">
      <section aria-labelledby="return-cameras">
        <h2 id="return-cameras" className="font-heading text-title font-bold">Woodlands and Tuas camera views</h2>
        <p className="mb-3 mt-1 text-sm text-muted-foreground">These LTA frames are from Singapore. A clear Singapore approach does not rule out a queue at Malaysian exit control.</p>
        <CameraGrid cameras={cameras} />
      </section>
      <section className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Return crossings">
        <Link href="/cameras/woodlands" className="rounded-xl border border-border bg-card p-5 shadow-card hover:border-accent/40"><h2 className="font-heading text-lg font-bold">Woodlands / Causeway</h2><p className="mt-1 text-sm text-muted-foreground">See selected Singapore-side Causeway and BKE sections. The Malaysia exit queue is outside these camera views.</p><span className="mt-2 inline-block text-sm font-semibold text-accent">View Woodlands cameras →</span></Link>
        <Link href="/cameras/tuas" className="rounded-xl border border-border bg-card p-5 shadow-card hover:border-accent/40"><h2 className="font-heading text-lg font-bold">Tuas / Second Link</h2><p className="mt-1 text-sm text-muted-foreground">See selected Singapore-side Second Link, checkpoint and AYE sections. Allow for travel to the western Johor crossing.</p><span className="mt-2 inline-block text-sm font-semibold text-accent">View Tuas cameras →</span></Link>
      </section>
      <section className="mt-9 max-w-3xl">
        <h2 className="font-heading text-title font-bold">Entering Singapore by land</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">ICA says Singapore citizens, permanent residents and long-term pass holders entering through Woodlands or Tuas do not need to submit the SG Arrival Card. Other travellers should check ICA’s <a className="text-accent underline" href="https://www.ica.gov.sg/enter-transit-depart/entering-singapore/sg-arrival-card" target="_blank" rel="noopener noreferrer">current SG Arrival Card guidance</a>. Where required, submission is free through ICA and is made within three days including the arrival day. See our <Link className="text-accent underline" href="/guides/sg-arrival-card-land-checkpoint">land-checkpoint SGAC guide</Link>.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Before departure, check your travel document, the latest <a className="text-accent underline" href="https://www.ica.gov.sg/news-and-publications/newsroom/media-releases" target="_blank" rel="noopener noreferrer">ICA land-checkpoint advisory</a> and the available <Link className="text-accent underline" href="/bus">bus</Link> or <Link className="text-accent underline" href="/guides/ktm-shuttle-tebrau-jb-woodlands">Shuttle Tebrau</Link> alternatives.</p>
      </section>
      <section className="mt-9 max-w-3xl rounded-xl border border-border bg-muted/50 p-5">
        <h2 className="font-heading text-title font-bold">What about Sunday evening queues?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Return traffic can vary with holidays, incidents and current operations. This page does not publish a fixed “best hour” or an unverified wait estimate. Recheck official advisories and camera frame times shortly before you leave. Read <Link className="text-accent underline" href="/methodology">what our data can and cannot show</Link>.</p>
        <p className="mt-3 text-sm"><Link className="font-semibold text-accent underline" href="/sg-to-jb">Travelling SG → JB instead?</Link></p>
      </section>
      <section className="mt-6 max-w-3xl rounded-xl border border-border bg-card p-5">
        <h2 className="font-heading text-title font-bold">Driving a Malaysia-registered vehicle?</h2>
        <p className="mt-2 text-sm text-muted-foreground">From January 2027, Singapore's VEP and ERP rules change for foreign-registered cars and motorcycles. <Link className="font-semibold text-accent underline" href="/calculator/singapore-vep-2027">Estimate your 2027 VEP fee</Link> before travelling.</p>
      </section>
    </main>
  </div>;
}
