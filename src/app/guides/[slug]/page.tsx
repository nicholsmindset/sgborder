import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import GuideClient from "@/page-components/GuidePage";
import { GUIDES } from "@/data/guides";
import { INDEXABLE_GUIDE_SLUGS } from "@/lib/indexable-guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide Not Found" };
  if (!INDEXABLE_GUIDE_SLUGS.has(guide.slug)) {
    return {
      title: `${guide.title} — Under Review`,
      description: "This SG Border Live guide is being checked against current official sources.",
      robots: { index: false, follow: true },
    };
  }

  return {
    title: guide.metaTitle || guide.title,
    description: guide.metaDescription || guide.description,
    alternates: { canonical: `https://www.sgborder.live/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle || guide.title,
      description: guide.metaDescription || guide.description,
      url: `https://www.sgborder.live/guides/${guide.slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  return (
    <>
      {guide && INDEXABLE_GUIDE_SLUGS.has(guide.slug) && (
        <>
          <JsonLd
            data={[
              {
                "@context": "https://schema.org",
                "@type": "Article",
                headline: guide.metaTitle || guide.title,
                description: guide.metaDescription || guide.description,
                url: `https://www.sgborder.live/guides/${guide.slug}`,
                dateModified: guide.lastUpdated,
                author: { "@type": "Organization", name: "SG Border Live", url: "https://www.sgborder.live" },
                publisher: { "@type": "Organization", name: "SG Border Live", url: "https://www.sgborder.live" },
              },
              ...(guide.faqs.length > 0
                ? [
                    {
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      mainEntity: guide.faqs.map((faq) => ({
                        "@type": "Question",
                        name: faq.question,
                        acceptedAnswer: { "@type": "Answer", text: faq.answer },
                      })),
                    },
                  ]
                : []),
            ]}
          />

        </>
      )}
      {guide && !INDEXABLE_GUIDE_SLUGS.has(guide.slug) ? (
        <div className="container max-w-2xl py-12 pb-mobile-nav">
          <h1 className="font-heading text-display-sm font-bold text-foreground">{guide.title}</h1>
          <p className="mt-4 text-muted-foreground">This guide is being checked against current official sources. Historical queue forecasts and exact crossing times are unavailable while our data collection is being repaired.</p>
          <a className="mt-5 inline-block text-accent underline" href="/cameras">Check current checkpoint cameras</a>
        </div>
      ) : <GuideClient />}
    </>
  );
}
