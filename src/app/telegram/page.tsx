import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Crossing Alerts — Development Status",
  description: "Status of SG Border Live crossing alerts and the live resources available today.",
  robots: { index: false, follow: true },
};

export default function TelegramPage() {
  return (
    <div className="container max-w-2xl py-12 pb-mobile-nav">
      <h1 className="font-heading text-display-sm font-bold text-foreground">Crossing alerts</h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">Telegram alerts are in development. There is no active SG Border Live bot to join yet.</p>
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-card">
        <h2 className="font-heading text-title font-bold">Check before you leave</h2>
        <p className="mt-2 text-sm text-muted-foreground">View the latest checkpoint cameras and their timestamps. Singapore road approach data is shown only when a recent measurement is available.</p>
        <Link href="/cameras" className="mt-4 inline-flex rounded-xl bg-accent px-4 py-2 font-semibold text-accent-foreground">View checkpoint cameras</Link>
      </div>
    </div>
  );
}
