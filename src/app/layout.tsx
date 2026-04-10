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
    "Live Singapore-to-JB causeway traffic, bus arrivals, camera feeds, and crossing guides. Updated every 5 minutes.",
  alternates: {
    canonical: "/",
    // Note: site uses client-side i18n without URL-based localization.
    // Cannot use hreflang until we add /en, /zh, /ms routes.
  },
  openGraph: {
    type: "website",
    locale: "en_SG",
    alternateLocale: ["zh_SG", "ms_MY"],
    siteName: "SG Border Live",
    title: "SG Border Live — Real-Time Causeway Traffic",
    description:
      "Live causeway traffic status for Woodlands & Tuas checkpoints with LTA CCTV cameras, bus arrivals, and travel predictions.",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SG Border Live — Real-Time Causeway Traffic Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SG Border Live — Real-Time Causeway Traffic",
    description:
      "Live causeway traffic status for Woodlands & Tuas checkpoints. Updated every 5 minutes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
          strategy="afterInteractive"
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
