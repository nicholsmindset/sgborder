import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import BusRouteClient from "@/page-components/BusRoutePage";
import { BUS_ROUTES } from "@/lib/bus-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return BUS_ROUTES.map((route) => ({ service: route.slug }));
}

export function generateMetadata({ params }: { params: { service: string } }): Metadata {
  const route = BUS_ROUTES.find((r) => r.slug === params.service);
  if (!route) return { title: "Bus Route Not Found" };

  return {
    title: `${route.service_no} Bus to JB — ${route.route_name} via ${route.via_checkpoint === "woodlands" ? "Woodlands" : "Tuas"}`,
    description: `${route.service_no} cross-border bus from ${route.sg_departure} via ${route.via_checkpoint === "woodlands" ? "Woodlands Causeway" : "Tuas Second Link"} to ${route.jb_arrival}. Check operator details for current fares and times.`,
    alternates: { canonical: `https://www.sgborder.live/bus/${route.slug}` },
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
            }}
          />

        </>
      )}
      <BusRouteClient />
    </>
  );
}
