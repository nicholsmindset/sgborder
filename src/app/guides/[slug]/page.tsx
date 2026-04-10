import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import GuideClient from "@/page-components/GuidePage";
import { GUIDES } from "@/data/guides";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = GUIDES.find((g) => g.slug === params.slug);
  if (!guide) return { title: "Guide Not Found" };

  return {
    title: guide.metaTitle || guide.title,
    description: guide.metaDescription || guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      publishedTime: "2026-03-01",
      modifiedTime: guide.lastUpdated,
      url: `/guides/${guide.slug}`,
    },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = GUIDES.find((g) => g.slug === params.slug);

  return (
    <>
      {guide && (
        <>
          <JsonLd
            data={[
              {
                "@context": "https://schema.org",
                "@type": "Article",
                headline: guide.metaTitle || guide.title,
                description: guide.metaDescription || guide.description,
                url: `https://www.sgborder.live/guides/${guide.slug}`,
                datePublished: "2026-03-01",
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
          <div className="sr-only">
            <h2>{guide.title}</h2>
            <p>{guide.description}</p>
            {guide.sections.map((s) => (
              <div key={s.id}>
                <h2>{s.heading}</h2>
                <div dangerouslySetInnerHTML={{ __html: s.content }} />
              </div>
            ))}
            {guide.faqs.length > 0 && (
              <>
                <h2>Frequently Asked Questions</h2>
                {guide.faqs.map((faq, i) => (
                  <div key={i}><h3>{faq.question}</h3><p>{faq.answer}</p></div>
                ))}
              </>
            )}
          </div>
        </>
      )}
      <GuideClient />
    </>
  );
}
