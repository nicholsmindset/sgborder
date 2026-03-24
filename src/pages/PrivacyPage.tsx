import { SEOHead } from "@/components/shared/SEOHead";

const PrivacyPage = () => {
  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="Privacy Policy — SG Border Live"
        description="Privacy policy for SG Border Live (sgborder.live). Learn how we collect data, use cookies, and work with Google AdSense and Analytics."
        path="/privacy"
      />

      <div className="container py-8 max-w-3xl">
        <h1 className="font-heading text-2xl font-bold mb-1">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: March 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground">

          <section>
            <h2 className="font-heading text-lg font-bold mb-2">1. About This Site</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              SG Border Live (<strong>sgborder.live</strong>) is a real-time traffic and commuter information service
              for the Singapore–Johor Bahru causeway crossing. We provide live checkpoint status, LTA traffic
              camera feeds, cross-border bus arrival times, and commuter guides. This site is operated as an
              independent service and is not affiliated with the Land Transport Authority (LTA) or any
              Singapore or Malaysian government agency.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-2">2. Information We Collect</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              We do not directly collect personally identifiable information (PII) such as names, email
              addresses, or phone numbers. Our site does use third-party services that may collect
              anonymous usage data as described below.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li><strong>Usage data:</strong> Pages visited, time on site, device type, and browser — collected anonymously via Google Analytics.</li>
              <li><strong>Traffic camera images:</strong> Live images are fetched from the LTA/data.gov.sg public API and are not stored by us.</li>
              <li><strong>Bus arrival data:</strong> Fetched from the ArriveLah public API in real time. No personal data is transmitted.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-2">3. Cookies</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              This site uses cookies through the following third-party services:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>
                <strong>Google AdSense:</strong> We use Google AdSense to display advertisements. Google uses
                cookies (including the DoubleClick cookie) to serve ads based on your prior visits to this
                site and other sites. You may opt out of personalised advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  Google Ads Settings
                </a>
                {" "}or{" "}
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  NAI opt-out page
                </a>
                .
              </li>
              <li>
                <strong>Google Analytics (GA4):</strong> We use Google Analytics to understand how visitors
                use our site. Google Analytics uses cookies to collect anonymous traffic information. You can
                opt out via the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-2">4. Google AdSense & Third-Party Advertising</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits
              to this website or other websites. Google's use of advertising cookies enables it and its
              partners to serve ads to users of our site based on their visit to our site and/or other sites
              on the internet.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the
              DoubleClick cookie enables it and its partners to serve ads to our users based on their visit
              to our site and other sites on the internet. For more information about how Google uses data
              from sites that use Google services, visit:{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                How Google uses information from sites or apps that use our services
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-2">5. Data Sources & Attribution</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Traffic camera images and road speed data are sourced from the{" "}
              <strong>Singapore Land Transport Authority (LTA)</strong> via the{" "}
              <a
                href="https://data.gov.sg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                data.gov.sg
              </a>{" "}
              public API under the Singapore Open Data Licence. Bus arrival times are provided by the
              ArriveLah community API. Travel time estimates use the Google Routes API. All data is
              provided for informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-2">6. Links to External Sites</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This site contains links to external websites. We are not responsible for the privacy
              practices or content of those sites. We encourage you to review the privacy policies of any
              site you visit.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-2">7. Children's Privacy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This site is not directed at children under the age of 13. We do not knowingly collect
              personal information from children. If you believe a child has provided us with personal
              information, please contact us and we will take steps to remove it.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-2">8. Changes to This Policy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. Changes will be posted on this page
              with an updated revision date. Continued use of the site after changes are posted constitutes
              your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-2">9. Contact</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you have questions about this privacy policy, please contact us via the About page.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
