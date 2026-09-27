import type { Metadata } from "next";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sgborder.live"),
  title: {
    template: "%s | SG Border Live",
    default: "SG Border Live — Real-Time Causeway Traffic, CCTV Cameras & Bus Info",
  },
  description:
    "Singapore–JB checkpoint cameras, road approach conditions, public bus arrivals and crossing guides. Each live feed shows its available timestamp.",
  openGraph: {
    type: "website",
    locale: "en_SG",
    siteName: "SG Border Live",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  verification: {
    google: "-ssVsE4wM4Vy9jNlw6fKX0l24rkWvcnDIuYOnpBaH6M",
  },
  other: {
    "geo.region": "SG",
    "geo.placename": "Singapore",
    "geo.position": "1.3521;103.8198",
    ICBM: "1.3521, 103.8198",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CVM2KVL177"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CVM2KVL177');`}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5441531660664467"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <BreadcrumbNav />
          <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
          <Footer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
