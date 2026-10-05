import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/shared/JsonLd";

const MOM_SOURCE = "https://www.mom.gov.sg/newsroom/press-releases/2026/0618-public-holidays-for-2027";
const holidays = [
  { date: "1 Jan", day: "Fri", name: "New Year's Day" },
  { date: "6–7 Feb", day: "Sat–Sun", name: "Chinese New Year" },
  { date: "8 Feb", day: "Mon", name: "Public holiday for Chinese New Year" },
  { date: "10 Mar", day: "Wed", name: "Hari Raya Puasa" },
  { date: "26 Mar", day: "Fri", name: "Good Friday" },
  { date: "1 May", day: "Sat", name: "Labour Day" },
  { date: "17 May", day: "Mon", name: "Hari Raya Haji" },
  { date: "20 May", day: "Thu", name: "Vesak Day" },
  { date: "9 Aug", day: "Mon", name: "National Day" },
  { date: "28 Oct", day: "Thu", name: "Deepavali" },
  { date: "25 Dec", day: "Sat", name: "Christmas Day" },
];

export const metadata: Metadata = {
  title: "Singapore Public Holidays 2027 — JB Crossing Calendar",
  description: "Official 2027 Singapore public holiday dates, including the 8 February observed holiday, with SG–JB trip planning links and VEP context.",
  alternates: { canonical: "https://www.sgborder.live/holidays/2027" },
  openGraph: { title: "Singapore Public Holidays 2027", description: "MOM's 2027 Singapore public holiday dates for SG–JB trip planning.", url: "https://www.sgborder.live/holidays/2027", type: "article" },
};

export default function Holidays2027Page() {
  return <div className="pb-mobile-nav">
    <JsonLd data={{
      "@context": "https://schema.org", "@type": "Article",
      headline: "Singapore Public Holidays 2027 — JB Crossing Calendar",
      url: "https://www.sgborder.live/holidays/2027", dateModified: "2026-10-06",
      author: { "@type": "Organization", name: "SG Border Live" },
      publisher: { "@type": "Organization", name: "SG Border Live" }, citation: MOM_SOURCE,
    }} />
    <header className="bg-primary text-primary-foreground">
      <div className="container max-w-5xl py-7 md:py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-status-smooth">Singapore calendar · 2027</p>
        <h1 className="mt-2 font-heading text-display-sm font-bold md:text-display">Singapore public holidays 2027</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary-foreground/80">Official Singapore dates to mark when planning a JB trip. A public holiday may change travel demand, but it does not predict the checkpoint queue.</p>
      </div>
    </header>
    <div className="container max-w-5xl py-7">
      <div className="max-w-3xl rounded-2xl border border-accent/30 bg-card p-5 shadow-card">
        <h2 className="font-heading text-title font-bold">Dates to check</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">MOM lists 11 gazetted public holidays for 2027. Chinese New Year falls on Saturday 6 and Sunday 7 February; Monday 8 February is also a public holiday. For a foreign-registered vehicle entering Singapore, LTA's announced 2027 VEP rates exempt Singapore public holidays as well as Saturdays and Sundays. <Link href="/calculator/singapore-vep-2027" className="text-accent underline">Estimate the VEP for your dates</Link>.</p>
      </div>
      <div className="mt-7 max-w-3xl overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">2027 Singapore public holiday dates from the Ministry of Manpower</caption>
          <thead className="bg-muted text-foreground"><tr><th scope="col" className="px-4 py-3">Date 2027</th><th scope="col" className="px-4 py-3">Day</th><th scope="col" className="px-4 py-3">Holiday</th></tr></thead>
          <tbody>{holidays.map((holiday) => <tr key={holiday.date} className="border-t border-border"><th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold">{holiday.date}</th><td className="px-4 py-3 text-muted-foreground">{holiday.day}</td><td className="px-4 py-3">{holiday.name}</td></tr>)}</tbody>
        </table>
      </div>
      <section className="mt-8 max-w-3xl">
        <h2 className="font-heading text-title font-bold">Before crossing on a holiday</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">Check <Link href="/cameras/woodlands" className="text-accent underline">Woodlands cameras</Link> and <Link href="/cameras/tuas" className="text-accent underline">Tuas cameras</Link> for the latest available images, then read any <a href="https://www.ica.gov.sg/news-and-publications/newsroom/media-releases" target="_blank" rel="noopener noreferrer" className="text-accent underline">ICA advisory</a>. These dates are Singapore public holidays; Johor and Malaysia holidays have a different calendar and can also affect travel patterns.</p>
      </section>
      <footer className="mt-9 max-w-3xl border-t border-border pt-5 text-xs text-muted-foreground">
        <p>Reviewed 6 October 2026. Source: <a href={MOM_SOURCE} target="_blank" rel="noopener noreferrer" className="text-accent underline">Singapore Ministry of Manpower — Public Holidays for 2027</a>. Check MOM for any later change.</p>
      </footer>
    </div>
  </div>;
}
