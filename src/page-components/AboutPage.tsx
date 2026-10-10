"use client";
import Link from "next/link";
import { SEOHead } from "@/components/shared/SEOHead";
import { ArrowRight, Camera, Bus, Clock, Map } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="About SG Border Live — Real-Time Causeway Traffic & Bus Info"
        description="SG Border Live provides real-time Singapore–JB causeway traffic status, LTA camera feeds, cross-border bus arrivals, and commuter guides. Independent and free, with timestamps and source limitations."
        path="/about"
      />

      <div className="container py-8 max-w-3xl">
        <h1 className="font-heading text-2xl font-bold mb-1">About SG Border Live</h1>
        <p className="text-sm text-muted-foreground mb-8">An independent Singapore–Johor crossing dashboard</p>

        <div className="space-y-8">

          {/* Mission */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">What is SG Border Live?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              SG Border Live is a free, independent traffic information service for the Singapore–Johor Bahru
              border crossing. We show timestamped LTA road camera images, Singapore bus arrivals and
              source-backed travel guidance to help commuters inspect conditions before they leave.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We are not affiliated with the Land Transport Authority (LTA), ICA, JIM, or any government
              body in Singapore or Malaysia. Camera images cover only the views available from Singapore
              government feeds; they do not measure border clearance times.
            </p>
          </section>

          {/* What we provide */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">What We Provide</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Clock,
                  title: "Road Approach Status",
                  desc: "Road status is currently paused while its source and direction mapping are validated. Camera images remain available with source timestamps.",
                },
                {
                  icon: Camera,
                  title: "LTA Traffic Cameras",
                  desc: "Timestamped still images from selected LTA cameras near both checkpoints and Singapore expressways.",
                },
                {
                  icon: Bus,
                  title: "Cross-Border Bus Arrivals",
                  desc: "Singapore public bus arrival estimates at selected stops, where data is available. Operator services may use different data sources.",
                },
                {
                  icon: Map,
                  title: "Commuter Guides",
                  desc: "Reviewed guides on crossing preparation, official forms, rail and bus options, and holiday dates.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10">
                      <item.icon className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="font-heading text-sm font-bold">{item.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Data Sources */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Data Sources</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent mt-1.5" />
                <span><strong className="text-foreground">LTA DataMall & data.gov.sg</strong> — Traffic camera images and, when the road feed is available, nearby Singapore road speed bands.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent mt-1.5" />
                <span><strong className="text-foreground">ArriveLah API</strong> — Real-time bus arrival times and crowd load data for Singapore bus services.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Editorial responsibility and corrections</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">SG Border Live publishes its own crossing checklists, source explanations and calculators alongside third-party transport data. Official agencies and operators remain the authority for entry rules, charges and service changes. Guides link to their sources and show a review date; that date is not a guarantee that rules have remained unchanged.</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">When a feed or claim cannot be validated, we label it unavailable or withdraw the guide from browsing and search until it can be checked. To flag an error, use our <Link href="/contact" className="text-accent underline">contact and corrections page</Link>. Read the <Link href="/methodology" className="text-accent underline">data methodology</Link> for coverage and limitations.</p>
          </section>

          {/* Disclaimer */}
          <section className="rounded-xl border border-border bg-muted/30 p-4">
            <h2 className="font-heading text-sm font-bold mb-2">Disclaimer</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Information on SG Border Live is provided for general guidance only. Traffic conditions can
              change rapidly. Do not rely solely on this site for time-critical decisions. Always check
              official sources (ICA, LTA, JIM) before crossing. We are not responsible for any loss,
              inconvenience, or damage arising from use of this information.
            </p>
          </section>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Live Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
