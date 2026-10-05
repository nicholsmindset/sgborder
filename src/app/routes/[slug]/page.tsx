import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CrossingGuidePage from "@/components/content/CrossingGuidePage";
import { CROSSING_GUIDES, findCrossingGuide } from "@/lib/crossing-guides";

export const dynamicParams = false;
export function generateStaticParams() { return CROSSING_GUIDES.filter((guide) => guide.group === "routes").map((guide) => ({ slug: guide.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = findCrossingGuide("routes", slug);
  if (!guide) return { title: "Guide not found" };
  return { title: guide.title, description: guide.description, alternates: { canonical: `https://www.sgborder.live/routes/${slug}` }, openGraph: { title: guide.title, description: guide.description, url: `https://www.sgborder.live/routes/${slug}`, type: "article" } };
}
export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = findCrossingGuide("routes", slug);
  if (!guide) notFound();
  return <CrossingGuidePage guide={guide} />;
}
