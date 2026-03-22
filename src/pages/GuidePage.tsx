import { useParams, Link } from "react-router-dom";
import { GUIDES } from "@/data/guides";
import { getCategoryColor } from "@/data/guides";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { GuideCard } from "@/components/content/GuideCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const GuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = GUIDES.find((g) => g.slug === slug);

  // Track active section for TOC
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!guide) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    guide.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [guide]);

  if (!guide) {
    return (
      <div className="container py-16 text-center pb-mobile-nav">
        <p className="text-muted-foreground">Guide not found.</p>
        <Link to="/guides" className="mt-4 inline-block text-accent hover:underline">← Back to guides</Link>
      </div>
    );
  }

  const related = guide.relatedSlugs
    .map((s) => GUIDES.find((g) => g.slug === s))
    .filter(Boolean) as typeof GUIDES;

  const jsonLdItems: Record<string, unknown>[] = [];

  // Article schema
  jsonLdItems.push({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.metaTitle || guide.title,
    description: guide.metaDescription || guide.description,
    url: `https://sgborder.live/guides/${guide.slug}`,
    datePublished: "2026-03-01",
    dateModified: "2026-03-22",
    author: { "@type": "Organization", name: "SG Border Live", url: "https://sgborder.live" },
    publisher: { "@type": "Organization", name: "SG Border Live", url: "https://sgborder.live" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://sgborder.live/guides/${guide.slug}` },
  });

  // FAQ schema
  if (guide.faqs.length > 0) {
    jsonLdItems.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title={guide.metaTitle || guide.title}
        description={guide.metaDescription || guide.description}
        path={`/guides/${guide.slug}`}
        type="article"
        publishedAt="2026-03-01"
        modifiedAt="2026-03-22"
        jsonLd={jsonLdItems}
        breadcrumbs={[{ name: "Guides", path: "/guides" }, { name: guide.title, path: `/guides/${guide.slug}` }]}
      />
      <div className="container pt-6 pb-12">
        {/* Breadcrumb */}
        <Link to="/guides" className="inline-flex items-center gap-1 text-label text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-3.5 w-3.5" />
          All guides
        </Link>

        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-8">
          {/* Main content */}
          <article>
            {/* Hero */}
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-label-sm font-semibold capitalize ${getCategoryColor(guide.category)}`}>
              {guide.category.replace("-", " ")}
            </span>
            <h1 className="mt-3 font-heading text-display-sm font-bold text-foreground md:text-display">
              {guide.title}
            </h1>
            <p className="mt-2 text-muted-foreground">{guide.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-label-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {guide.readTime} min read
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Updated {new Date(guide.lastUpdated).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </div>

            {/* Sections */}
            <div className="mt-8 space-y-8">
              {guide.sections.map((section) => (
                <RevealSection key={section.id}>
                  <div id={section.id}>
                    <h2 className="font-heading text-title font-bold text-foreground">{section.heading}</h2>
                    <div
                      className="mt-3 prose-content text-sm text-muted-foreground leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_strong]:text-foreground [&_strong]:font-semibold [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_p]:mb-3 [&_table]:w-full [&_table]:text-left [&_td]:py-1.5 [&_td]:pr-4 [&_td:last-child]:font-medium [&_td:last-child]:text-foreground"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                </RevealSection>
              ))}
            </div>

            {/* FAQs */}
            {guide.faqs.length > 0 && (
              <RevealSection>
                <div className="mt-10">
                  <h2 className="font-heading text-title font-bold text-foreground mb-4">
                    Frequently Asked Questions
                  </h2>
                  <FAQAccordion faqs={guide.faqs} />
                </div>
              </RevealSection>
            )}

          </article>

          {/* Sidebar TOC — desktop only */}
          <aside className="hidden lg:block">
            <nav className="sticky top-20">
              <p className="text-label font-semibold text-foreground mb-2">On this page</p>
              <ul className="space-y-1 border-l border-border">
                {guide.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`block border-l-2 pl-3 py-1 text-label-sm transition-colors ${
                        activeSection === s.id
                          ? "border-accent text-accent font-medium"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>

        {/* Related guides */}
        {related.length > 0 && (
          <RevealSection>
            <div className="mt-12">
              <h2 className="font-heading text-title font-bold text-foreground mb-4">Related Guides</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((g) => (
                  <GuideCard key={g.slug} guide={g} />
                ))}
              </div>
            </div>
          </RevealSection>
        )}
      </div>
    </div>
  );
};

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return <div ref={ref} className="reveal">{children}</div>;
};

export default GuidePage;
