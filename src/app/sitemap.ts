import { MetadataRoute } from "next";
import { BUS_ROUTES } from "@/lib/bus-data";
import { GUIDES } from "@/data/guides";
import { HOLIDAYS_2026 } from "@/data/holidays";
import { EXPRESSWAYS } from "@/data/expressway-cameras";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sgborder.live";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "always", priority: 1.0 },
    { url: `${baseUrl}/live`, lastModified: new Date(), changeFrequency: "always", priority: 0.9 },
    { url: `${baseUrl}/woodlands`, lastModified: new Date(), changeFrequency: "always", priority: 0.9 },
    { url: `${baseUrl}/tuas`, lastModified: new Date(), changeFrequency: "always", priority: 0.9 },
    { url: `${baseUrl}/cameras`, lastModified: new Date(), changeFrequency: "always", priority: 0.8 },
    { url: `${baseUrl}/cameras/woodlands`, lastModified: new Date(), changeFrequency: "always", priority: 0.8 },
    { url: `${baseUrl}/cameras/tuas`, lastModified: new Date(), changeFrequency: "always", priority: 0.8 },
    { url: `${baseUrl}/bus`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/rts-link`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/holidays`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/telegram`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  const busPages: MetadataRoute.Sitemap = BUS_ROUTES.map((route) => ({
    url: `${baseUrl}/bus/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const holidayPages: MetadataRoute.Sitemap = HOLIDAYS_2026.map((holiday) => ({
    url: `${baseUrl}/holidays/${holiday.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const expresswayPages: MetadataRoute.Sitemap = Object.keys(EXPRESSWAYS).map((key) => ({
    url: `${baseUrl}/cameras/${key}`,
    lastModified: new Date(),
    changeFrequency: "always" as const,
    priority: 0.6,
  }));

  // Calendar pages
  const calendarPages: MetadataRoute.Sitemap = [
    "singapore-public-holidays-2026",
    "malaysia-public-holidays-2026",
    "malaysia-school-holidays-2026",
  ].map((slug) => ({
    url: `${baseUrl}/holidays/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...busPages,
    ...guidePages,
    ...holidayPages,
    ...expresswayPages,
    ...calendarPages,
  ];
}
