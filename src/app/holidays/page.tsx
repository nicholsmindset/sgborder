import type { Metadata } from "next";
import Link from "next/link";
import HolidayDates from "@/components/holidays/HolidayDates";
import { SG_PUBLIC_HOLIDAYS_2026, MY_PUBLIC_HOLIDAYS_2026 } from "@/data/public-holidays";

export const metadata: Metadata = {
  title: "Singapore & Johor Public Holidays 2026 — Crossing Calendar",
  description: "Verified Singapore and Johor public holiday dates for planning a Woodlands or Tuas crossing. Check official advisories and cameras before travel.",
  alternates: { canonical: "https://www.sgborder.live/holidays" },
};

export default function HolidaysPage() {
  return (
    <div className="container max-w-4xl py-8 pb-mobile-nav md:py-12">
      <h1 className="font-heading text-display-sm font-bold text-foreground md:text-display">2026 Singapore & Johor crossing calendar</h1>
      <p className="mt-2 text-sm"><Link className="font-semibold text-accent underline" href="/holidays/2027">Looking ahead? See Singapore public holidays for 2027 →</Link></p>
      <p className="mt-3 text-muted-foreground leading-relaxed">Public holidays can change travel demand, but these dates are not a queue forecast. Check the latest <a className="text-accent underline" href="https://www.ica.gov.sg/news-and-publications/newsroom/media-releases" target="_blank" rel="noopener noreferrer">ICA land checkpoint advisories</a> and <Link className="text-accent underline" href="/cameras">camera images</Link> before you travel.</p>
      <section className="mt-8"><h2 className="mb-3 font-heading text-title font-bold">Singapore public holidays</h2><HolidayDates holidays={SG_PUBLIC_HOLIDAYS_2026} /><p className="mt-2 text-xs text-muted-foreground">Source: <a className="underline" href="https://www.mom.gov.sg/employment-practices/public-holidays" target="_blank" rel="noopener noreferrer">Singapore Ministry of Manpower</a>.</p></section>
      <section className="mt-8"><h2 className="mb-3 font-heading text-title font-bold">Johor public holidays</h2><HolidayDates holidays={MY_PUBLIC_HOLIDAYS_2026} /><p className="mt-2 text-xs text-muted-foreground">Source: <a className="underline" href="https://www.johor.gov.my/rakyat/cuti-umum-2" target="_blank" rel="noopener noreferrer">Johor state government</a>.</p></section>
    </div>
  );
}
