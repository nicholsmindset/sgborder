import { Link } from "react-router-dom";
import { SEOHead } from "@/components/shared/SEOHead";
import { ArrowRight, Camera, Bus, Clock, Map } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="About SG Border Live — Real-Time Causeway Traffic & Bus Info"
        description="SG Border Live provides real-time Singapore–JB causeway traffic status, LTA camera feeds, cross-border bus arrivals, and commuter guides. Independent, free, updated every 5 minutes."
        path="/about"
      />

      <div className="container py-8 max-w-3xl">
        <h1 className="font-heading text-2xl font-bold mb-1">About SG Border Live</h1>
        <p className="text-sm text-muted-foreground mb-8">The real-time causeway commuter dashboard</p>

        <div className="space-y-8">

          {/* Mission */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">What is SG Border Live?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              SG Border Live is a free, independent traffic information service for the Singapore–Johor Bahru
              border crossing. We aggregate live data from official Singapore government APIs to give
              commuters, daily workers, and weekend travellers a fast, clear view of current conditions
              before they head to the causeway.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We are not affiliated with the Land Transport Authority (LTA), ICA, JIM, or any government
              body in Singapore or Malaysia. All traffic data is sourced from publicly available APIs and
              displayed as-is for informational purposes.
            </p>
          </section>

          {/* What we provide */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">What We Provide</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Clock,
                  title: "Live Checkpoint Status",
                  desc: "Real-time traffic status at Woodlands (Causeway) and Tuas (Second Link), updated every 5 minutes.",
                },
                {
                  icon: Camera,
                  title: "LTA Traffic Cameras",
                  desc: "Live CCTV feeds from LTA cameras at both checkpoints and all major expressways leading to the border.",
                },
                {
                  icon: Bus,
                  title: "Cross-Border Bus Arrivals",
                  desc: "Next bus times and crowd levels for CW1, CW2, 170, 170X, 950, and other cross-border services.",
                },
                {
                  icon: Map,
                  title: "Commuter Guides",
                  desc: "In-depth guides on the best times to cross, VEP requirements, bus routes, and holiday traffic predictions.",
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
                <span><strong className="text-foreground">LTA DataMall & data.gov.sg</strong> — Traffic camera images, road speed bands, and estimated travel times from the Land Transport Authority of Singapore.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent mt-1.5" />
                <span><strong className="text-foreground">ArriveLah API</strong> — Real-time bus arrival times and crowd load data for Singapore bus services.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent mt-1.5" />
                <span><strong className="text-foreground">Google Routes API</strong> — Travel time estimates for causeway crossing routes.</span>
              </li>
            </ul>
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
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Live Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/privacy"
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
