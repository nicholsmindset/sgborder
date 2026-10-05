import { MetadataRoute } from "next";
import { BUS_ROUTES } from "@/lib/bus-data";
import { GUIDES } from "@/data/guides";
import { INDEXABLE_GUIDE_SLUGS } from "@/lib/indexable-guides";
import { CROSSING_GUIDES } from "@/lib/crossing-guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sgborder.live";
  const reviewedAt = new Date("2026-09-27");
  const cameraReviewedAt = new Date("2026-10-05");
  const checkpointReviewedAt = new Date("2026-10-06");

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: cameraReviewedAt, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/live`, lastModified: cameraReviewedAt, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/sg-to-jb`, lastModified: cameraReviewedAt, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/jb-to-sg`, lastModified: cameraReviewedAt, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/woodlands`, lastModified: checkpointReviewedAt, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/tuas`, lastModified: checkpointReviewedAt, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/cameras`, lastModified: cameraReviewedAt, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/cameras/woodlands`, lastModified: cameraReviewedAt, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/cameras/tuas`, lastModified: cameraReviewedAt, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/bus`, lastModified: reviewedAt, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/rts-link`, lastModified: reviewedAt, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: reviewedAt, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/rules`, lastModified: checkpointReviewedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/routes`, lastModified: checkpointReviewedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/holidays`, lastModified: reviewedAt, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/holidays/2027`, lastModified: checkpointReviewedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/calculator`, lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/calculator/singapore-vep-2027`, lastModified: new Date("2026-10-06"), changeFrequency: "monthly", priority: 0.8 },
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

  const expresswayPages: MetadataRoute.Sitemap = ["bke", "aye"].map((key) => ({
    url: `${baseUrl}/cameras/${key}`,
    lastModified: cameraReviewedAt,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  const crossingGuidePages: MetadataRoute.Sitemap = CROSSING_GUIDES.map((guide) => ({
    url: `${baseUrl}/${guide.group}/${guide.slug}`,
    lastModified: checkpointReviewedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
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
    ...crossingGuidePages,
    ...expresswayPages,
    ...calendarPages,
  ];
}
