import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact & corrections",
  description: "Report a broken camera, incorrect source or website problem to the SG Border Live project.",
  alternates: { canonical: "https://www.sgborder.live/contact" },
};

export default function ContactPage() {
  return <div className="container max-w-3xl py-8 pb-mobile-nav">
    <h1 className="font-heading text-2xl font-bold">Contact & corrections</h1>
    <p className="mt-4 text-muted-foreground leading-relaxed">SG Border Live is an independent information project. Report website problems and factual corrections through the project's public GitHub issue tracker. A GitHub account is required to submit a report.</p>
    <a className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-accent px-4 py-2 font-semibold text-accent-foreground" href="https://github.com/nicholsmindset/sgborder/issues/new" target="_blank" rel="noopener noreferrer">Report a website issue on GitHub</a>
    <section className="mt-8 space-y-3">
      <h2 className="font-heading text-lg font-bold">What to include</h2>
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>The page URL and the specific statement or feature that needs attention.</li>
        <li>For camera or bus feed problems: checkpoint or stop, date, time and the timestamp displayed.</li>
        <li>For a factual correction: a link to the relevant official agency or operator source.</li>
      </ul>
      <p className="text-sm text-muted-foreground">Reports are public. Do not include passport details, vehicle registration numbers, phone numbers, travel documents or other personal information. We do not handle immigration cases, bookings or emergency requests.</p>
    </section>
    <section className="mt-8 space-y-3">
      <h2 className="font-heading text-lg font-bold">Official travel enquiries</h2>
      <p className="text-sm text-muted-foreground">Use <a href="https://www.ica.gov.sg/" className="text-accent underline">Singapore ICA</a>, <a href="https://www.imi.gov.my/" className="text-accent underline">Malaysia Immigration</a> or the relevant transport operator for decisions about your journey. Our <Link href="/methodology" className="text-accent underline">methodology</Link> explains what the dashboard can and cannot establish.</p>
    </section>
  </div>;
}
