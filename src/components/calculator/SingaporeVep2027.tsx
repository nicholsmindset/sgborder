"use client";

import { useState } from "react";
import { Car, Bike } from "lucide-react";
import { estimateSingaporeVep2027, type SingaporeVepVehicle } from "@/lib/singapore-vep-2027";

function dollars(value: number) {
  return `S$${value.toFixed(2)}`;
}

function dateLabel(value: string) {
  return new Date(`${value}T00:00:00.000Z`).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    weekday: "short",
    timeZone: "UTC",
  });
}

export default function SingaporeVep2027() {
  const [vehicle, setVehicle] = useState<SingaporeVepVehicle>("car");
  const [entryDate, setEntryDate] = useState("2027-01-04");
  const [exitDate, setExitDate] = useState("2027-01-04");
  const [hasObu, setHasObu] = useState(false);
  const [erpDrivingDays, setErpDrivingDays] = useState(0);

  let result: ReturnType<typeof estimateSingaporeVep2027> | null = null;
  let error = "";
  try {
    result = estimateSingaporeVep2027({ vehicle, entryDate, exitDate, hasObu, erpDrivingDays });
  } catch (issue) {
    error = issue instanceof Error ? issue.message : "Check the trip details.";
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-card" aria-labelledby="vep-options">
        <h2 id="vep-options" className="font-heading text-title font-bold">Your 2027 visit</h2>
        <p className="mt-1 text-sm text-muted-foreground">For a Malaysia-registered private car or motorcycle entering Singapore.</p>

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">Vehicle</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {([{ value: "car", label: "Private car", Icon: Car }, { value: "motorcycle", label: "Motorcycle", Icon: Bike }] as const).map(({ value, label, Icon }) => (
              <button key={value} type="button" aria-pressed={vehicle === value} onClick={() => setVehicle(value)} className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${vehicle === value ? "border-accent bg-accent/10 text-accent" : "border-border text-foreground hover:bg-muted"}`}>
                <Icon className="h-4 w-4" />{label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold" htmlFor="vep-entry-date">
            Entry date
            <input id="vep-entry-date" type="date" min="2027-01-01" max="2027-12-31" value={entryDate} onChange={(event) => setEntryDate(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-3 font-normal text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" />
          </label>
          <label className="block text-sm font-semibold" htmlFor="vep-exit-date">
            Exit date
            <input id="vep-exit-date" type="date" min="2027-01-01" max="2027-12-31" value={exitDate} onChange={(event) => setExitDate(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-3 font-normal text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" />
          </label>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Entry and exit dates count as days in Singapore. The daily VEP fee is waived on Saturdays, Sundays and Singapore public holidays.</p>

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">ERP 2 on-board unit (OBU)</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={!hasObu} onClick={() => setHasObu(false)} className={`min-h-12 rounded-xl border px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${!hasObu ? "border-accent bg-accent/10 text-accent" : "border-border text-foreground hover:bg-muted"}`}>No OBU</button>
            <button type="button" aria-pressed={hasObu} onClick={() => setHasObu(true)} className={`min-h-12 rounded-xl border px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${hasObu ? "border-accent bg-accent/10 text-accent" : "border-border text-foreground hover:bg-muted"}`}>OBU installed</button>
          </div>
        </fieldset>

        {!hasObu ? (
          <label className="mt-5 block text-sm font-semibold" htmlFor="vep-erp-days">
            ERP operational days you will drive in Singapore
            <input id="vep-erp-days" type="number" min="0" max={result?.erpEligibleDates.length} step="1" value={erpDrivingDays} onChange={(event) => setErpDrivingDays(Number(event.target.value))} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-3 font-normal text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" />
            <span className="mt-2 block text-xs font-normal text-muted-foreground">Count days you expect to drive on Singapore roads Monday–Saturday, excluding Singapore public holidays. Enter 0 if you will not drive on those days.</span>
          </label>
        ) : <p className="mt-5 rounded-xl bg-muted p-3 text-xs text-muted-foreground">With an OBU, prevailing ERP gantry charges depend on your route and time. They are not estimated here.</p>}
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card" aria-labelledby="vep-result" aria-live="polite">
        <h2 id="vep-result" className="font-heading text-title font-bold">Indicative charges</h2>
        {error ? <p className="mt-5 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive" role="alert">{error}</p> : result && <>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Chargeable VEP weekdays</dt><dd className="font-semibold tabular-nums">{result.chargeableDates.length} × {dollars(vehicle === "car" ? 50 : 7)}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Free weekend / public holiday dates</dt><dd className="font-semibold tabular-nums">{result.freeDates.length}</dd></div>
            <div className="flex justify-between gap-3 border-t border-border pt-3"><dt className="font-semibold">VEP fee</dt><dd className="font-semibold tabular-nums">{dollars(result.vepFee)}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-muted-foreground">{hasObu ? "ERP with OBU" : `Flat ERP (${erpDrivingDays} ${erpDrivingDays === 1 ? "day" : "days"})`}</dt><dd className="font-semibold tabular-nums">{result.flatErpFee === null ? "Route dependent" : dollars(result.flatErpFee)}</dd></div>
            <div className="flex justify-between gap-3 border-t border-border pt-4"><dt className="font-heading text-base font-bold">{hasObu ? "Known VEP subtotal" : "VEP + flat ERP"}</dt><dd className="font-heading text-xl font-bold tabular-nums text-accent">{dollars(result.knownSubtotal)}</dd></div>
          </dl>
          {result.chargeableDates.length > 0 && <div className="mt-5">
            <h3 className="text-sm font-semibold">Charged dates</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">{result.chargeableDates.map((day) => <li key={day} className="rounded-lg bg-accent/10 px-2 py-1 text-xs font-medium text-accent">{dateLabel(day)}</li>)}</ul>
          </div>}
          {result.freeDates.length > 0 && <div className="mt-4">
            <h3 className="text-sm font-semibold">Free VEP dates</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">{result.freeDates.map((day) => <li key={day} className="rounded-lg bg-muted px-2 py-1 text-xs text-muted-foreground">{dateLabel(day)}</li>)}</ul>
          </div>}
          <p className="mt-5 rounded-xl bg-muted p-3 text-xs leading-relaxed text-muted-foreground">This estimate excludes Singapore entry/exit tolls, the Reciprocal Road Charge for cars, OBU gantry charges, Autopass costs and fines. LTA’s official calculator gives the payable estimate for your exact trip.</p>
        </>}
      </section>
    </div>
  );
}
