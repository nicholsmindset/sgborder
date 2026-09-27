import { MetadataRoute } from "next";
import { BUS_ROUTES } from "@/lib/bus-data";
import { GUIDES } from "@/data/guides";
import { EXPRESSWAYS } from "@/data/expressway-cameras";
import { INDEXABLE_GUIDE_SLUGS } from "@/lib/indexable-guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sgborder.live";
  const reviewedAt = new Date("2026-09-27");

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: reviewedAt, changeFrequency: "always", priority: 1.0 },
    { url: `${baseUrl}/live`, lastModified: reviewedAt, changeFrequency: "always", priority: 0.9 },
    { url: `${baseUrl}/woodlands`, lastModified: reviewedAt, changeFrequency: "always", priority: 0.9 },
    { url: `${baseUrl}/tuas`, lastModified: reviewedAt, changeFrequency: "always", priority: 0.9 },
    { url: `${baseUrl}/cameras`, lastModified: reviewedAt, changeFrequency: "always", priority: 0.8 },
    { url: `${baseUrl}/cameras/woodlands`, lastModified: reviewedAt, changeFrequency: "always", priority: 0.8 },
    { url: `${baseUrl}/cameras/tuas`, lastModified: reviewedAt, changeFrequency: "always", priority: 0.8 },
    { url: `${baseUrl}/bus`, lastModified: reviewedAt, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/rts-link`, lastModified: reviewedAt, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: reviewedAt, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/holidays`, lastModified: reviewedAt, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/calculator`, lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/methodology`, lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.3 },
  ];

  const busPages: MetadataRoute.Sitemap = BUS_ROUTES.map((route) => ({
    url: `${baseUrl}/bus/${route.slug}`,
    lastModified: reviewedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const guidePages: MetadataRoute.Sitemap = GUIDES.filter((guide) => INDEXABLE_GUIDE_SLUGS.has(guide.slug)).map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const expresswayPages: MetadataRoute.Sitemap = Object.keys(EXPRESSWAYS).map((key) => ({
    url: `${baseUrl}/cameras/${key}`,
    lastModified: reviewedAt,
    changeFrequency: "always" as const,
    priority: 0.6,
  }));

  // Calendar pages
  const calendarPages: MetadataRoute.Sitemap = [
    "singapore-public-holidays-2026",
    "malaysia-public-holidays-2026",
  ].map((slug) => ({
    url: `${baseUrl}/holidays/${slug}`,
    lastModified: reviewedAt,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...busPages,
    ...guidePages,
    ...expresswayPages,
    ...calendarPages,
  ];
}
