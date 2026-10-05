"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bike, Car, ExternalLink } from "lucide-react";

type Vehicle = "car" | "motorcycle";
type Checkpoint = "woodlands" | "tuas";

const SINGAPORE_TOLLS: Record<Checkpoint, Record<Vehicle, { exit: number; return: number }>> = {
  woodlands: { car: { exit: 0.8, return: 0 }, motorcycle: { exit: 0, return: 0 } },
  tuas: { car: { exit: 2.1, return: 2.1 }, motorcycle: { exit: 0, return: 0 } },
};

export default function Calculator() {
  const [vehicle, setVehicle] = useState<Vehicle>("car");
  const [checkpoint, setCheckpoint] = useState<Checkpoint>("woodlands");
  const [returning, setReturning] = useState(true);
  const toll = SINGAPORE_TOLLS[checkpoint][vehicle];
  const singaporeTotal = toll.exit + (returning ? toll.return : 0);
  const malaysiaRoadCharge = vehicle === "car" ? 20 : 0;

  return (
    <div className="pb-mobile-nav">
      <section className="bg-primary text-primary-foreground">
        <div className="container py-7 md:py-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">SG registered vehicles · SG → JB</p>
          <h1 className="mt-2 font-heading text-display-sm font-bold md:text-display">SG to JB driving cost calculator</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
            See the published Singapore checkpoint toll and Malaysia road charge for a private car or motorcycle. Amounts stay in their original currencies.
          </p>
        </div>
      </section>

      <div className="container grid gap-5 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)]">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card" aria-labelledby="trip-options">
          <h2 id="trip-options" className="font-heading text-title font-bold">Your crossing</h2>
          <fieldset className="mt-5">
            <legend className="text-sm font-semibold text-foreground">Singapore registered vehicle</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {([{ value: "car", label: "Private car", Icon: Car }, { value: "motorcycle", label: "Motorcycle", Icon: Bike }] as const).map(({ value, label, Icon }) => (
                <button key={value} type="button" aria-pressed={vehicle === value} onClick={() => setVehicle(value)} className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${vehicle === value ? "border-accent bg-accent/10 text-accent" : "border-border text-foreground hover:bg-muted"}`}>
                  <Icon className="h-4 w-4" />{label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-5">
            <legend className="text-sm font-semibold text-foreground">Checkpoint</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["woodlands", "tuas"] as const).map((value) => (
                <button key={value} type="button" aria-pressed={checkpoint === value} onClick={() => setCheckpoint(value)} className={`min-h-12 rounded-xl border px-3 text-sm font-semibold capitalize focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${checkpoint === value ? "border-accent bg-accent/10 text-accent" : "border-border text-foreground hover:bg-muted"}`}>{value}</button>
              ))}
            </div>
          </fieldset>
          <label className="mt-5 flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border px-4 text-sm font-medium text-foreground">
            <input type="checkbox" checked={returning} onChange={(event) => setReturning(event.target.checked)} className="h-4 w-4 accent-accent" />
            Include return via the same checkpoint
          </label>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-card" aria-labelledby="charge-summary" aria-live="polite">
          <h2 id="charge-summary" className="font-heading text-title font-bold">Published border charges</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Singapore exit toll</dt><dd className="font-semibold tabular-nums">S${toll.exit.toFixed(2)}</dd></div>
            {returning && <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Singapore return toll</dt><dd className="font-semibold tabular-nums">S${toll.return.toFixed(2)}</dd></div>}
            <div className="flex justify-between gap-3 border-t border-border pt-3"><dt className="font-semibold">Singapore toll subtotal</dt><dd className="font-heading text-lg font-bold tabular-nums">S${singaporeTotal.toFixed(2)}</dd></div>
            <div className="flex justify-between gap-3 border-t border-border pt-3"><dt className="font-semibold">Malaysia road charge per entry</dt><dd className="font-heading text-lg font-bold tabular-nums">RM{malaysiaRoadCharge.toFixed(2)}</dd></div>
          </dl>
          <p className="mt-5 rounded-lg bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
            Malaysia road tolls, fuel, parking and any one-time VEP RFID tag cost are separate. Singapore's daily VEP fee is for foreign-registered vehicles entering Singapore; it does not apply to a Singapore car entering Malaysia.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-accent">
            <a href="https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/entering_and_exiting_singapore/vehicles-registered-in-singapore.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">LTA toll rates <ExternalLink className="h-3 w-3" /></a>
            <a href="https://www.jpj.gov.my/en/rc-vep-faq/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">JPJ road charge <ExternalLink className="h-3 w-3" /></a>
          </div>
        </section>
      </div>

      <section className="container pb-8">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/guides/vep-malaysia-guide" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-card hover:bg-muted">Malaysia VEP registration guide <ArrowRight className="h-4 w-4 text-accent" /></Link>
          <Link href="/calculator/singapore-vep-2027" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-card hover:bg-muted">Malaysia car entering SG? Calculate 2027 Singapore VEP <ArrowRight className="h-4 w-4 text-accent" /></Link>
        </div>
      </section>
    </div>
  );
}
