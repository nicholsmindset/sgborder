"use client";
import { Send } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { useTranslation } from "@/lib/i18n";

const TelegramPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="Causeway Traffic Alerts — Telegram Bot for Live Updates"
        description="Get live causeway traffic alerts on Telegram. Free /status and /bus commands. Premium: AI predictions, daily digest & personalized JB traffic alerts."
        path="/telegram"
      />
      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 mb-4">
            <Send className="h-7 w-7" />
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {t("telegram_title")}
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {t("telegram_subtitle")}
          </p>
        </div>
      </section>
      <div className="container py-8 max-w-lg text-center">

        <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-left shadow-card">
          <h2 className="font-heading text-title font-bold mb-3">{t("telegram_free_title")}</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono text-label-sm">/status</code> — {t("telegram_free_status")}</li>
            <li><code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono text-label-sm">/bus</code> — {t("telegram_free_bus")}</li>
            <li><code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono text-label-sm">/woodlands</code> — {t("telegram_free_woodlands")}</li>
            <li><code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono text-label-sm">/tuas</code> — {t("telegram_free_tuas")}</li>
          </ul>
        </div>

        <div className="mt-4 rounded-2xl border border-accent/20 bg-accent/5 p-5 text-left">
          <h2 className="font-heading text-title font-bold mb-3">{t("telegram_premium_title")}</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono text-label-sm">/predict</code> — {t("telegram_premium_predict")}</li>
            <li>{t("telegram_premium_alerts")}</li>
            <li>{t("telegram_premium_digest")}</li>
            <li>{t("telegram_premium_support")}</li>
          </ul>
        </div>

        <button className="mt-6 rounded-xl bg-accent px-6 py-3 font-heading font-semibold text-accent-foreground transition-colors hover:bg-accent/90 active:scale-[0.97]">
          {t("telegram_open_bot")}
        </button>
      </div>
    </div>
  );
};

export default TelegramPage;
