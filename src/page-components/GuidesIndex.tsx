"use client";
import { useState } from "react";
import { GUIDES, GUIDE_CATEGORIES } from "@/data/guides";
import { INDEXABLE_GUIDE_SLUGS } from "@/lib/indexable-guides";
import { GuideCard } from "@/components/content/GuideCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { useTranslation } from "@/lib/i18n";
import { BookOpen } from "lucide-react";
import Link from "next/link";

const GuidesIndex = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState("all");
  const reviewedGuides = GUIDES.filter((guide) => INDEXABLE_GUIDE_SLUGS.has(guide.slug));
  const filtered = category === "all" ? reviewedGuides : reviewedGuides.filter((g) => g.category === category);

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="Causeway Traffic Guide — Best Time to Cross, VEP, Bus & Tips"
        description="Practical guides for crossing to JB: best time to cross the causeway, VEP Malaysia guide, bus routes, checkpoint tips, and travel costs."
        path="/guides"
      />
      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {t("guides_title")}
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {t("guides_subtitle")}
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="container pb-4">
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
          {GUIDE_CATEGORIES.filter((cat) => cat.value === "all" || reviewedGuides.some((guide) => guide.category === cat.value)).map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-label font-medium transition-all active:scale-[0.97] ${
                category === cat.value
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <RevealSection>
        <div className="container">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">{t("guides_no_guides")}</p>
          )}
        </div>
      </RevealSection>
      <section className="container py-8" aria-labelledby="more-crossing-resources">
        <h2 id="more-crossing-resources" className="font-heading text-title font-bold">More crossing resources</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Plan the route, check official entry rules and estimate the 2027 Singapore VEP before travelling.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/routes", title: "Routes & destinations", detail: "JB Sentral, LEGOLAND and checkpoint choice" },
            { href: "/rules", title: "Crossing rules", detail: "Fuel, Malaysia Road Charge and customs" },
            { href: "/holidays/2027", title: "Singapore holidays 2027", detail: "Official dates for trip planning" },
            { href: "/calculator/singapore-vep-2027", title: "Singapore VEP 2027", detail: "Calculate announced car and motorcycle rates" },
          ].map((item) => <Link key={item.href} href={item.href} className="rounded-2xl border border-border bg-card p-4 shadow-card transition-colors hover:border-accent/40">
            <h3 className="font-semibold text-foreground">{item.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
          </Link>)}
        </div>
      </section>
    </div>
  );
};

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return <section ref={ref} className="reveal py-4">{children}</section>;
};

export default GuidesIndex;
