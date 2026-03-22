import { Helmet } from "react-helmet-async";
import { useTranslation } from "@/lib/i18n";

const SITE_URL = "https://sgborder.live";
const SITE_NAME = "SG Border Live";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  publishedAt?: string;
  modifiedAt?: string;
  breadcrumbs?: { name: string; path: string }[];
}

/** Generate BreadcrumbList schema from path segments */
function buildBreadcrumbJsonLd(
  path: string,
  breadcrumbs?: { name: string; path: string }[]
) {
  if (breadcrumbs && breadcrumbs.length > 0) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        ...breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: b.name,
          item: `${SITE_URL}${b.path}`,
        })),
      ],
    };
  }

  // Auto-generate from path
  if (!path || path === "/") return null;

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
  ];

  const NAME_MAP: Record<string, string> = {
    woodlands: "Woodlands",
    tuas: "Tuas",
    cameras: "Cameras",
    bus: "Buses",
    guides: "Guides",
    holidays: "Holidays",
    calculator: "Calculator",
    "rts-link": "RTS Link",
    telegram: "Telegram",
    live: "Live Traffic",
  };

  let accumulated = "";
  segments.forEach((seg, i) => {
    accumulated += `/${seg}`;
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name: NAME_MAP[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      item: `${SITE_URL}${accumulated}`,
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export const SEOHead = ({
  title,
  description,
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  jsonLd,
  publishedAt,
  modifiedAt,
  breadcrumbs,
}: SEOHeadProps) => {
  const { lang } = useTranslation();
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  const OG_LOCALE_MAP: Record<string, string> = {
    en: "en_SG",
    zh: "zh_SG",
    ms: "ms_MY",
  };

  // Build all JSON-LD scripts
  const jsonLdItems: Record<string, unknown>[] = [];

  if (jsonLd) {
    if (Array.isArray(jsonLd)) {
      jsonLdItems.push(...jsonLd);
    } else {
      jsonLdItems.push(jsonLd);
    }
  }

  const breadcrumbLd = buildBreadcrumbJsonLd(path, breadcrumbs);
  if (breadcrumbLd) {
    jsonLdItems.push(breadcrumbLd);
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Geo targeting — Singapore / Malaysia market */}
      <meta name="geo.region" content="SG" />
      <meta name="geo.placename" content="Singapore" />
      <meta name="geo.position" content="1.3521;103.8198" />
      <meta name="ICBM" content="1.3521, 103.8198" />

      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

      {/* Author */}
      <meta name="author" content={SITE_NAME} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={OG_LOCALE_MAP[lang] ?? "en_SG"} />

      {/* Article dates for guides / content pages */}
      {type === "article" && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === "article" && modifiedAt && (
        <meta property="article:modified_time" content={modifiedAt} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Hreflang — target SG and MY markets in en, zh, ms */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="zh" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ms" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* JSON-LD structured data */}
      {jsonLdItems.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};
