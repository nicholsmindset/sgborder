import type { Metadata } from "next";
import Link from "next/link";
import { HOLIDAYS_2026 } from "@/data/holidays";
import { CALENDAR_PAGES, SG_PUBLIC_HOLIDAYS_2026, MY_PUBLIC_HOLIDAYS_2026 } from "@/data/public-holidays";
import HolidayDates from "@/components/holidays/HolidayDates";

export const dynamicParams = false;
const INDEXABLE_CALENDARS = new Set(["singapore-public-holidays-2026", "malaysia-public-holidays-2026"]);

export function generateStaticParams() {
  return [...HOLIDAYS_2026.map((h) => ({ slug: h.slug })), ...Object.keys(CALENDAR_PAGES).map((slug) => ({ slug }))];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (INDEXABLE_CALENDARS.has(params.slug)) {
    const country = params.slug.startsWith("singapore") ? "Singapore" : "Johor";
    return {
      title: `${country} Public Holidays 2026 — Dates for Crossing Planning`,
      description: `Verified ${country} public holiday dates for 2026 and links to current land checkpoint advisories.`,
      alternates: { canonical: `https://www.sgborder.live/holidays/${params.slug}` },
    };
  }
  return { title: "Holiday Traffic Guide — Under Review", robots: { index: false, follow: true } };
}

export default function HolidaySlugPage({ params }: { params: { slug: string } }) {
  if (INDEXABLE_CALENDARS.has(params.slug)) {
    const isSingapore = params.slug.startsWith("singapore");
    const country = isSingapore ? "Singapore" : "Johor";
    return (
      <div className="container max-w-3xl py-8 pb-mobile-nav md:py-12">
        <Link href="/holidays" className="text-sm text-accent underline">All crossing dates</Link>
        <h1 className="mt-3 font-heading text-display-sm font-bold text-foreground md:text-display">{country} public holidays 2026</h1>
        <p className="my-5 text-muted-foreground">These are holiday dates, not predicted crossing times. For travel conditions, check <Link href="/cameras" className="text-accent underline">checkpoint cameras</Link> and the latest ICA advisory.</p>
        <HolidayDates holidays={isSingapore ? SG_PUBLIC_HOLIDAYS_2026 : MY_PUBLIC_HOLIDAYS_2026} />
        <p className="mt-3 text-xs text-muted-foreground">Source: <a className="underline" href={isSingapore ? "https://www.mom.gov.sg/employment-practices/public-holidays" : "https://www.johor.gov.my/rakyat/cuti-umum-2"} target="_blank" rel="noopener noreferrer">{isSingapore ? "Singapore Ministry of Manpower" : "Johor state government"}</a>. Reviewed 27 Sep 2026.</p>
      </div>
    );
  }
  return (
    <div className="container max-w-2xl py-12 pb-mobile-nav">
      <h1 className="font-heading text-display-sm font-bold text-foreground">Holiday traffic guide under review</h1>
      <p className="mt-4 text-muted-foreground">We are checking this guide against official dates and current travel advisories. A holiday date alone does not establish a queue length or best crossing hour.</p>
      <Link className="mt-5 inline-block text-accent underline" href="/holidays">View verified holiday dates</Link>
    </div>
  );
}
