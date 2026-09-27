"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BUS_ROUTES } from "@/lib/bus-data";
import { ArrowLeft, ArrowRight, Bus, ExternalLink, MapPin } from "lucide-react";

const officialRouteUrl = (operator: string, serviceNo: string) => {
  if (operator === "SBS Transit") return `https://www.sbstransit.com.sg/Service/BusService?ServiceNo=${encodeURIComponent(serviceNo)}&ServiceType=Basic`;
  if (operator === "SMRT") return "https://www.smrt.com.sg/Journey-with-Us/Buses/Bus-Services";
  return "https://www.causewaylink.com.my/routes-schedules/singapore-cross-border-bus/";
};

export default function BusRoutePage() {
  const params = useParams();
  const route = BUS_ROUTES.find((item) => item.slug === params?.service);
  if (!route) return null;
  const alternatives = BUS_ROUTES.filter((item) => item.slug !== route.slug && item.via_checkpoint === route.via_checkpoint).slice(0, 3);

  return (
    <div className="container pb-12 pt-6 pb-mobile-nav">
      <Link href="/bus" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"><ArrowLeft className="h-4 w-4" /> All JB buses</Link>
      <div className="mt-4 flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent font-heading text-lg font-bold text-accent-foreground">{route.service_no}</div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{route.operator} · via {route.via_checkpoint === "woodlands" ? "Woodlands Causeway" : "Tuas Second Link"}</p>
          <h1 className="mt-1 font-heading text-display-sm font-bold text-foreground">{route.route_name}</h1>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">Plan which checkpoint this service uses and where to board. Confirm current fares, payment methods and first or last bus times with the operator before travelling.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5 shadow-card" aria-labelledby="route-stops">
          <h2 id="route-stops" className="flex items-center gap-2 font-heading text-title font-bold"><MapPin className="h-5 w-5 text-accent" /> Route at a glance</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Singapore boarding</dt><dd className="mt-0.5 font-medium text-foreground">{route.sg_departure}</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Border crossing</dt><dd className="mt-0.5 font-medium capitalize text-foreground">{route.via_checkpoint}</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Johor arrival</dt><dd className="mt-0.5 font-medium text-foreground">{route.jb_arrival}</dd></div>
          </dl>
        </section>
        <section className="rounded-xl border border-border bg-card p-5 shadow-card" aria-labelledby="route-operator">
          <h2 id="route-operator" className="flex items-center gap-2 font-heading text-title font-bold"><Bus className="h-5 w-5 text-accent" /> Current service details</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Operators can change stops, fares and schedules. Their published route information is the source for today’s service.</p>
          <a href={officialRouteUrl(route.operator, route.service_no)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground hover:bg-accent/90">Check {route.operator} <ExternalLink className="h-4 w-4" /></a>
        </section>
      </div>

      <section className="mt-7">
        <h2 className="font-heading text-title font-bold">Other buses via {route.via_checkpoint === "woodlands" ? "Woodlands" : "Tuas"}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {alternatives.map((item) => <Link key={item.slug} href={`/bus/${item.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground hover:bg-muted">{item.service_no} <ArrowRight className="h-3.5 w-3.5 text-accent" /></Link>)}
        </div>
      </section>
    </div>
  );
}
