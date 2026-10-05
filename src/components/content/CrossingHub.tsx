import Link from "next/link";
import { CROSSING_GUIDES, type CrossingGuide } from "@/lib/crossing-guides";

export default function CrossingHub({ group }: { group: CrossingGuide["group"] }) {
  const guides = CROSSING_GUIDES.filter((guide) => guide.group === group);
  const isRules = group === "rules";
  return <div className="pb-mobile-nav">
    <header className="bg-primary text-primary-foreground">
      <div className="container py-7 md:py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-status-smooth">SG–JB trip planning</p>
        <h1 className="mt-2 font-heading text-display-sm font-bold md:text-display">{isRules ? "Crossing rules and charges" : "Routes and destinations"}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">{isRules ? "Check the official rules that affect a drive between Singapore and Malaysia, from fuel and Road Charge to customs on your return." : "Choose a checkpoint and mode of travel for a real destination. Current cameras and operator schedules help you make the final call."}</p>
      </div>
    </header>
    <div className="container py-7">
      <div className="grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => <article key={guide.slug} className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h2 className="font-heading text-lg font-bold"><Link href={`/${group}/${guide.slug}`} className="hover:text-accent">{guide.title}</Link></h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
          <Link href={`/${group}/${guide.slug}`} className="mt-4 inline-block text-sm font-semibold text-accent underline underline-offset-2">Read guide</Link>
        </article>)}
      </div>
      <aside className="mt-8 max-w-5xl rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
        <h2 className="font-heading text-title font-bold text-foreground">Before you leave</h2>
        <p className="mt-2">Check <Link href="/cameras" className="text-accent underline">current checkpoint cameras</Link>, <Link href="/holidays/2027" className="text-accent underline">2027 Singapore public holidays</Link> and <a href="https://www.ica.gov.sg/news-and-publications/newsroom/media-releases" target="_blank" rel="noopener noreferrer" className="text-accent underline">ICA advisories</a>. Camera images show road conditions, not a measured immigration wait time.</p>
      </aside>
    </div>
  </div>;
}
