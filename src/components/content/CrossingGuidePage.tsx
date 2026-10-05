import Link from "next/link";
import JsonLd from "@/components/shared/JsonLd";
import type { CrossingGuide } from "@/lib/crossing-guides";

export default function CrossingGuidePage({ guide }: { guide: CrossingGuide }) {
  const url = `https://www.sgborder.live/${guide.group}/${guide.slug}`;

  return <div className="pb-mobile-nav">
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      url,
      dateModified: "2026-10-06",
      author: { "@type": "Organization", name: "SG Border Live", url: "https://www.sgborder.live" },
      publisher: { "@type": "Organization", name: "SG Border Live", url: "https://www.sgborder.live" },
      citation: guide.sources.map((source) => source.url),
    }} />
    <header className="bg-primary text-primary-foreground">
      <div className="container max-w-5xl py-7 md:py-10">
        <Link href={`/${guide.group}`} className="text-xs font-semibold uppercase tracking-widest text-status-smooth hover:underline">{guide.group === "rules" ? "Crossing rules" : "Routes and destinations"}</Link>
        <h1 className="mt-3 max-w-4xl font-heading text-display-sm font-bold md:text-display">{guide.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-primary-foreground/80">{guide.description}</p>
      </div>
    </header>
    <div className="container max-w-5xl py-7">
      <article className="max-w-3xl">
        <section className="rounded-2xl border border-accent/30 bg-card p-5 shadow-card" aria-labelledby="quick-answer">
          <h2 id="quick-answer" className="font-heading text-title font-bold">Quick answer</h2>
          <p className="mt-2 text-sm leading-7 text-foreground">{guide.answer}</p>
        </section>
        {guide.sections.map((section) => <section key={section.heading} className="mt-8">
          <h2 className="font-heading text-title font-bold text-foreground">{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-3 text-sm leading-7 text-muted-foreground">{paragraph}</p>)}
          {section.points && <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
            {section.points.map((point) => <li key={point}>{point}</li>)}
          </ul>}
        </section>)}
        <aside className="mt-10 rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-title font-bold">Plan the next step</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {guide.related.map((item) => <li key={item.href}><Link href={item.href} className="text-sm font-medium text-accent underline underline-offset-2">{item.label}</Link></li>)}
          </ul>
        </aside>
        <footer className="mt-9 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
          <h2 className="font-semibold text-foreground">Official sources and review date</h2>
          <p className="mt-2">Reviewed 6 October 2026. Check official operators and agencies for changes before travel.</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-accent underline">{source.label}</a></li>)}
          </ul>
        </footer>
      </article>
    </div>
  </div>;
}
