import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import BusRouteClient from "@/page-components/BusRoutePage";
import { BUS_ROUTES } from "@/lib/bus-data";

export function generateStaticParams() {
  return BUS_ROUTES.map((route) => ({ service: route.slug }));
}

export function generateMetadata({ params }: { params: { service: string } }): Metadata {
  const route = BUS_ROUTES.find((r) => r.slug === params.service);
  if (!route) return { title: "Bus Route Not Found" };

  return {
    title: `${route.service_no} Bus to JB — ${route.route_name} Route, Fare & Schedule 2026`,
    description: `Complete ${route.service_no} bus guide: ${route.route_name} with live arrivals, S$${route.fare_sgd}/RM${route.fare_myr} fares, first/last bus timing & tips for crossing via ${route.via_checkpoint === "woodlands" ? "Woodlands" : "Tuas"}.`,
    alternates: { canonical: `/bus/${route.slug}` },
  };
}

export default function BusRoutePage({ params }: { params: { service: string } }) {
  const route = BUS_ROUTES.find((r) => r.slug === params.service);

  return (
    <>
      {route && (
        <>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "BusTrip",
              name: `Bus ${route.service_no} — ${route.route_name}`,
              departureBusStop: { "@type": "BusStop", name: route.sg_departure },
              arrivalBusStop: { "@type": "BusStop", name: route.jb_arrival },
              provider: { "@type": "Organization", name: route.operator },
              offers: { "@type": "Offer", price: route.fare_sgd, priceCurrency: "SGD" },
            }}
          />
          <div className="sr-only">
            <h2>Bus {route.service_no} — {route.route_name}</h2>
            <p>{route.operator} cross-border bus from {route.sg_departure} to {route.jb_arrival} via {route.via_checkpoint === "woodlands" ? "Woodlands Checkpoint" : "Tuas Second Link"}.</p>
            <h2>Schedule & Fares</h2>
            <ul>
              <li>Fare: S${route.fare_sgd} (SGD) / RM{route.fare_myr} (MYR)</li>
              <li>First bus: {route.first_bus}</li>
              <li>Last bus: {route.last_bus}</li>
              <li>Peak frequency: every {route.frequency_peak}</li>
              <li>Off-peak frequency: every {route.frequency_offpeak}</li>
              <li>Typical duration: ~{route.typical_duration_min} minutes</li>
              <li>Payment: {route.payment_methods.join(", ")}</li>
            </ul>
            <h2>Tips</h2>
            <p>{route.tips}</p>
          </div>
        </>
      )}
      <BusRouteClient />
    </>
  );
}
