import type { Metadata } from "next";
import Link from "next/link";
import { CameraGrid } from "@/components/dashboard/CameraGrid";
import { getCheckpointCameras } from "@/lib/server-cameras";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "SG to JB Traffic Today: Cameras, Checkpoints and Crossing Checklist",
  description: "Check timestamped Woodlands and Tuas cameras before leaving Singapore for JB. Compare the crossing routes and prepare MDAC, VEP or public transport plans.",
  alternates: { canonical: "https://www.sgborder.live/sg-to-jb" },
};

export default async function SgToJbPage() {
  const cameras = await getCheckpointCameras();
  return <div className="pb-mobile-nav">
    <header className="bg-primary text-primary-foreground">
      <div className="container py-7 md:py-10">
        <p className="text-xs font-bold uppercase tracking-widest text-status-smooth">Singapore → Johor Bahru</p>
        <h1 className="mt-2 max-w-3xl font-heading text-display-sm font-bold md:text-display">SG to JB traffic today</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">Inspect recent Singapore approach cameras for Woodlands and Tuas before travelling. These views cannot measure the full queue through both countries’ checkpoints.</p>
      </div>
    </header>
    <main className="container max-w-5xl py-5">
      <section aria-labelledby="outbound-cameras">
        <h2 id="outbound-cameras" className="font-heading text-title font-bold">Current checkpoint camera frames</h2>
        <p className="mb-3 mt-1 text-sm text-muted-foreground">Source times appear on each LTA still image. An unavailable frame is not a clear-road signal.</p>
        <CameraGrid cameras={cameras} />
      </section>
      <section className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Choose a checkpoint">
        <Link href="/woodlands" className="rounded-xl border border-border bg-card p-5 shadow-card hover:border-accent/40"><h2 className="font-heading text-lg font-bold">Woodlands Causeway</h2><p className="mt-1 text-sm text-muted-foreground">BKE and Causeway views near the Singapore checkpoint. Consider this route for JB city centre and JB Sentral.</p><span className="mt-2 inline-block text-sm font-semibold text-accent">View Woodlands →</span></Link>
        <Link href="/tuas" className="rounded-xl border border-border bg-card p-5 shadow-card hover:border-accent/40"><h2 className="font-heading text-lg font-bold">Tuas Second Link</h2><p className="mt-1 text-sm text-muted-foreground">AYE, checkpoint and Second Link views. Consider the onward drive for western Johor destinations.</p><span className="mt-2 inline-block text-sm font-semibold text-accent">View Tuas →</span></Link>
      </section>
      <section className="mt-9 max-w-3xl">
        <h2 className="font-heading text-title font-bold">Before leaving Singapore</h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Check the camera frame timestamps and the latest <a className="text-accent underline" href="https://www.ica.gov.sg/news-and-publications/newsroom/media-releases" target="_blank" rel="noopener noreferrer">ICA checkpoint advisory</a>. Road images show only part of the crossing.</li>
          <li>If driving a Singapore-registered vehicle, check the current <Link className="text-accent underline" href="/guides/vep-malaysia-guide">Malaysia VEP requirements</Link> before departure.</li>
          <li>If you are a foreign visitor entering Malaysia, check the <Link className="text-accent underline" href="/guides/malaysia-digital-arrival-card-mdac">official MDAC portal and eligibility guidance</Link> for your passport and pass status.</li>
          <li>Compare <Link className="text-accent underline" href="/bus">cross-border bus services</Link> and <Link className="text-accent underline" href="/guides/ktm-shuttle-tebrau-jb-woodlands">KTM Shuttle Tebrau</Link> if you do not need to drive.</li>
        </ol>
      </section>
      <section className="mt-9 max-w-3xl rounded-xl border border-border bg-muted/50 p-5">
        <h2 className="font-heading text-title font-bold">Can this page tell me the current wait?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">No verified end-to-end car wait is available here. LTA images cover selected Singapore road sections; they do not include Malaysia immigration, customs or the time spent inside both checkpoints. See our <Link className="text-accent underline" href="/methodology">data method</Link>.</p>
        <p className="mt-3 text-sm"><Link className="font-semibold text-accent underline" href="/jb-to-sg">Planning the JB → SG return instead?</Link></p>
      </section>
    </main>
  </div>;
}
