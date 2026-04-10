import { MetadataRoute } from "next";
import { BUS_ROUTES } from "@/lib/bus-data";
import { GUIDES } from "@/data/guides";
import { HOLIDAYS_2026 } from "@/data/holidays";
import { EXPRESSWAYS } from "@/data/expressway-cameras";

/**
 * Sitemap with per-section lastmod dates so Google can crawl efficiently.
 * Live/dashboard pages use the current build date (they update constantly).
 * Static content (guides, holidays, bus routes) uses stable content dates.
 * This avoids the "everything changed at once" signal that throttles crawl budget.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sgborder.live";

  // Content published date (stable - only changes when content changes)
  const CONTENT_DATE = new Date("2026-03-22T00:00:00+08:00");
  const BUS_CONTENT_DATE = new Date("2026-03-15T00:00:00+08:00");
  const HOLIDAY_CONTENT_DATE = new Date("2026-03-01T00:00:00+08:00");
  const STATIC_INFO_DATE = new Date("2026-03-24T00:00:00+08:00");

  // Live pages - update frequently, use today's date
  const LIVE_DATE = new Date();

  const liveDashboardPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: LIVE_DATE, changeFrequency: "hourly", priority: 1.0 },
    { url: `${baseUrl}/live`, lastModified: LIVE_DATE, changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/woodlands`, lastModified: LIVE_DATE, changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/tuas`, lastModified: LIVE_DATE, changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/cameras`, lastModified: LIVE_DATE, changeFrequency: "hourly", priority: 0.8 },
    { url: `${baseUrl}/cameras/woodlands`, lastModified: LIVE_DATE, changeFrequency: "hourly", priority: 0.8 },
    { url: `${baseUrl}/cameras/tuas`, lastModified: LIVE_DATE, changeFrequency: "hourly", priority: 0.8 },
    { url: `${baseUrl}/bus`, lastModified: LIVE_DATE, changeFrequency: "daily", priority: 0.8 },
  ];

  const contentHubPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/rts-link`, lastModified: CONTENT_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: CONTENT_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/holidays`, lastModified: HOLIDAY_CONTENT_DATE, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/calculator`, lastModified: CONTENT_DATE, changeFrequency: "monthly", priority: 0.6 },
  ];

  const staticInfoPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/telegram`, lastModified: STATIC_INFO_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: STATIC_INFO_DATE, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: STATIC_INFO_DATE, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Bus routes - stable content, use fixed date
  const busPages: MetadataRoute.Sitemap = BUS_ROUTES.map((route) => ({
    url: `${baseUrl}/bus/${route.slug}`,
    lastModified: BUS_CONTENT_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Guides - use each guide's own lastUpdated date (already different per guide)
  const guidePages: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Holidays - use stable date
  const holidayPages: MetadataRoute.Sitemap = HOLIDAYS_2026.map((holiday) => ({
    url: `${baseUrl}/holidays/${holiday.slug}`,
    lastModified: HOLIDAY_CONTENT_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Expressway cameras - live images, update hourly
  const expresswayPages: MetadataRoute.Sitemap = Object.keys(EXPRESSWAYS).map((key) => ({
    url: `${baseUrl}/cameras/${key}`,
    lastModified: LIVE_DATE,
    changeFrequency: "hourly" as const,
    priority: 0.6,
  }));

  // Holiday calendar pages
  const calendarPages: MetadataRoute.Sitemap = [
    "singapore-public-holidays-2026",
    "malaysia-public-holidays-2026",
    "malaysia-school-holidays-2026",
  ].map((slug) => ({
    url: `${baseUrl}/holidays/${slug}`,
    lastModified: HOLIDAY_CONTENT_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...liveDashboardPages,
    ...contentHubPages,
    ...staticInfoPages,
    ...busPages,
    ...guidePages,
    ...holidayPages,
    ...expresswayPages,
    ...calendarPages,
  ];
}
