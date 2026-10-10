"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

const KEY = "sgborder-analytics-choice";
type Choice = "accepted" | "declined" | null;

/** Analytics only. This is not an advertising CMP; advertising is managed separately. */
export function AnalyticsConsent() {
  const [choice, setChoice] = useState<Choice>(null);
  const [productionHost, setProductionHost] = useState(false);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setProductionHost(["www.sgborder.live", "sgborder.live"].includes(location.hostname));
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "accepted" || saved === "declined") setChoice(saved);
      else setOpen(true);
    } catch { setOpen(true); }
    setReady(true);
    // Synchronize withdrawal across tabs; unload any Analytics code already running.
    const syncChoice = (event: StorageEvent) => {
      if (event.storageArea === localStorage && (event.key === KEY || event.key === null)) {
        (window as unknown as Record<string, unknown>)["ga-disable-G-CVM2KVL177"] = true;
        location.reload();
      }
    };
    window.addEventListener("storage", syncChoice);
    return () => window.removeEventListener("storage", syncChoice);
  }, []);

  function choose(next: Exclude<Choice, null>) {
    try { localStorage.setItem(KEY, next); } catch { /* Choice still applies to this page. */ }
    if (next === "declined") {
      (window as unknown as Record<string, unknown>)["ga-disable-G-CVM2KVL177"] = true;
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0].trim();
        if (name === "_ga" || name.startsWith("_ga_")) {
          for (const domain of ["", `; domain=${location.hostname}`, "; domain=.sgborder.live"]) {
            document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
          }
        }
      }
    }
    // Reload after changing a prior choice so already-loaded Analytics cannot keep running.
    if (choice !== null && choice !== next) { location.reload(); return; }
    setChoice(next);
    setOpen(false);
  }

  return <>
    {productionHost && choice === "accepted" && <>
      <Script id="sgborder-analytics-init" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-CVM2KVL177', {allow_google_signals: false, allow_ad_personalization_signals: false});`}</Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-CVM2KVL177" strategy="afterInteractive" />
    </>}
    <div className="bg-primary px-4 pb-20 text-center text-primary-foreground md:pb-4">
      <button type="button" onClick={() => setOpen(true)} className="min-h-11 text-sm underline">Analytics preferences</button>
    </div>
    {ready && open && <section aria-label="Analytics preferences" className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl rounded-xl border border-border bg-card p-4 shadow-xl md:bottom-4">
      <h2 className="font-heading text-base font-bold">Optional analytics</h2>
      <p className="mt-2 text-sm text-muted-foreground">Allow Google Analytics cookies to help us understand site use? The dashboard works without them. <Link href="/privacy" className="text-accent underline">Privacy policy</Link></p>
      <div className="mt-3 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("declined")} className="min-h-11 rounded-lg border border-border px-4 text-sm font-semibold">Decline analytics</button>
        <button type="button" onClick={() => choose("accepted")} className="min-h-11 rounded-lg border border-border px-4 text-sm font-semibold">Allow analytics</button>
      </div>
    </section>}
  </>;
}
