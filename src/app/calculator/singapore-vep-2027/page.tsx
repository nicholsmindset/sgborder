import type { Metadata } from "next";
import Link from "next/link";
import SingaporeVep2027 from "@/components/calculator/SingaporeVep2027";

const LTA_ANNOUNCEMENT = "https://www.lta.gov.sg/content/ltagov/en/newsroom/2026/2/news-releases/updates-foreign-registered-vehicles-entering-singapore.html";
const LTA_VEP = "https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/entering_and_exiting_singapore/vep.html";
const MOM_HOLIDAYS = "https://www.mom.gov.sg/newsroom/press-releases/2026/0618-public-holidays-for-2027";

export const metadata: Metadata = {
  title: "Singapore VEP 2027 Calculator — Malaysia Car & Motorcycle Fees",
  description: "Estimate Singapore's 2027 VEP fee for a Malaysia-registered car or motorcycle. Count chargeable weekdays, public holiday exemptions and optional flat ERP without an OBU.",
  alternates: { canonical: "https://www.sgborder.live/calculator/singapore-vep-2027" },
  openGraph: {
    title: "Singapore VEP 2027 Calculator",
    description: "Calculate the announced 2027 VEP and flat ERP amounts for a Malaysia-registered car or motorcycle entering Singapore.",
    url: "https://www.sgborder.live/calculator/singapore-vep-2027",
  },
};

export default function SingaporeVep2027Page() {
  return <div className="pb-mobile-nav">
    <header className="bg-primary text-primary-foreground">
      <div className="container py-7 md:py-10">
        <p className="text-xs font-bold uppercase tracking-widest text-status-smooth">Malaysia-registered vehicle · JB → SG</p>
        <h1 className="mt-2 max-w-3xl font-heading text-display-sm font-bold md:text-display">Singapore VEP 2027 calculator</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">Estimate the daily Vehicle Entry Permit fee and, if you have no OBU, the flat ERP charge for a 2027 visit to Singapore.</p>
      </div>
    </header>

    <main className="container max-w-6xl py-6">
      <SingaporeVep2027 />

      <section className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-card" aria-labelledby="vep-rule-summary">
        <h2 id="vep-rule-summary" className="font-heading text-title font-bold">What changes on 1 January 2027?</h2>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground">LTA says the daily Singapore VEP fee will be <strong className="text-foreground">S$50 for a foreign-registered car</strong> or <strong className="text-foreground">S$7 for a motorcycle</strong> on weekdays. Saturdays, Sundays and Singapore public holidays remain free VEP days. The previous first ten free chargeable days and weekday free hours end. A foreign-registered vehicle without an OBU may also owe flat ERP of S$10 per applicable driving day for a car or S$3 for a motorcycle. <a className="text-accent underline" href={LTA_ANNOUNCEMENT} target="_blank" rel="noopener noreferrer">Read LTA’s announcement</a>.</p>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-title font-bold">What this estimate covers</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Chargeable calendar dates from entry through exit, including both dates.</li>
            <li>2027 Singapore public holidays listed by the Ministry of Manpower, including the 8 February observed holiday.</li>
            <li>Flat ERP only when you select “No OBU” and enter days you expect to drive on ERP operational days.</li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">A vehicle with an OBU pays prevailing route and time based ERP charges. This tool cannot determine those from trip dates alone.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-title font-bold">Before you drive</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Malaysia-registered vehicles need a valid Autopass card, insurance, road tax and LTA VEP approval before entering Singapore. Car tolls and the Reciprocal Road Charge are separate from this estimate. Social visit pass VEPs are normally valid for up to 14 days; longer stays require an extension.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-accent">
            <a className="underline" href={LTA_VEP} target="_blank" rel="noopener noreferrer">LTA’s official fee calculator</a>
            <a className="underline" href="https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/entering_and_exiting_singapore/cars-and-motorcycles-registered-in-malaysia.html" target="_blank" rel="noopener noreferrer">Vehicle entry requirements</a>
          </div>
        </div>
      </section>

      <section className="mt-8 max-w-4xl">
        <h2 className="font-heading text-title font-bold">Singapore VEP or Malaysia VEP?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">This calculator is for a <strong className="text-foreground">Malaysia-registered vehicle entering Singapore</strong> and uses LTA’s announced 2027 fees. Singapore drivers entering Malaysia use Malaysia’s separate JPJ VEP registration and Road Charge rules. For that trip, see the <Link className="text-accent underline" href="/guides/vep-malaysia-guide">Malaysia VEP guide</Link> and <Link className="text-accent underline" href="/calculator">SG → JB driving cost calculator</Link>.</p>
      </section>

      <section className="mt-8 max-w-4xl border-t border-border pt-5 text-xs text-muted-foreground">
        <h2 className="font-semibold text-foreground">Sources and review date</h2>
        <p className="mt-2">Reviewed 6 October 2026. Rates: <a href={LTA_ANNOUNCEMENT} target="_blank" rel="noopener noreferrer" className="text-accent underline">LTA 2027 VEP and ERP announcement</a>. Holiday dates: <a href={MOM_HOLIDAYS} target="_blank" rel="noopener noreferrer" className="text-accent underline">MOM 2027 public holidays</a>. This is an indicative planning tool; confirm payable charges with <a href={LTA_VEP} target="_blank" rel="noopener noreferrer" className="text-accent underline">LTA’s official calculator</a> before travelling.</p>
      </section>
    </main>
  </div>;
}
