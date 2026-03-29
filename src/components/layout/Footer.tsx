"use client";
import Link from "next/link";
import { LivePulse } from "../dashboard/LivePulse";
import { useTranslation } from "@/lib/i18n";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-primary py-8 text-primary-foreground">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <LivePulse />
              <p className="font-heading text-sm font-semibold">SG Border Live</p>
            </div>
            <p className="mt-2 text-label-sm leading-relaxed text-primary-foreground/60">
              {t("footer_brand_desc")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-label-sm font-semibold uppercase tracking-wider text-primary-foreground/40">{t("footer_quick_links")}</p>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/woodlands" className="text-label-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">{t("footer_woodlands_checkpoint")}</Link>
              <Link href="/tuas" className="text-label-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">{t("footer_tuas_second_link")}</Link>
              <Link href="/cameras" className="text-label-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">{t("footer_live_cameras")}</Link>
              <Link href="/bus" className="text-label-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">{t("footer_cross_border_buses")}</Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <p className="text-label-sm font-semibold uppercase tracking-wider text-primary-foreground/40">{t("footer_resources")}</p>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/guides" className="text-label-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">{t("footer_commuter_guides")}</Link>
              <Link href="/holidays" className="text-label-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">{t("footer_holiday_calendar")}</Link>
              <Link href="/rts-link" className="text-label-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">{t("footer_rts_link")}</Link>
              <Link href="/calculator" className="text-label-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">{t("footer_trip_calculator")}</Link>
            </nav>
          </div>

          {/* Data Sources */}
          <div>
            <p className="text-label-sm font-semibold uppercase tracking-wider text-primary-foreground/40">{t("footer_data_sources")}</p>
            <div className="mt-3 flex flex-col gap-2 text-label-sm text-primary-foreground/60">
              <span>LTA DataMall</span>
              <span>Google Routes API</span>
              <span>ArriveLah Bus API</span>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/about" className="text-label-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">About</Link>
              <Link href="/privacy" className="text-label-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/10 pt-4">
          <p className="text-label-sm text-primary-foreground/40">
            {t("footer_disclaimer")}
          </p>
          <p className="mt-1 text-label-sm text-primary-foreground/40">
            &copy; {new Date().getFullYear()} {t("footer_copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
