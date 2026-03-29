"use client";

/**
 * SEOHead is now a no-op in Next.js.
 * All SEO metadata is handled by Next.js metadata exports in app/ page files.
 * JSON-LD is rendered via the JsonLd server component.
 * This component is kept as a stub so existing page imports don't break.
 */

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  publishedAt?: string;
  modifiedAt?: string;
  breadcrumbs?: { name: string; path: string }[];
}

export const SEOHead = (_props: SEOHeadProps) => {
  return null;
};
