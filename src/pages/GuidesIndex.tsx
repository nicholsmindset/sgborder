import { useState } from "react";
import { GUIDES, GUIDE_CATEGORIES } from "@/data/guides";
import { GuideCard } from "@/components/content/GuideCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { useTranslation } from "@/lib/i18n";
import { BookOpen } from "lucide-react";

const GuidesIndex = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState("all");
  const filtered = category === "all" ? GUIDES : GUIDES.filter((g) => g.category === category);

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
          {GUIDE_CATEGORIES.map((cat) => (
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
    </div>
  );
};

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return <section ref={ref} className="reveal py-4">{children}</section>;
};

export default GuidesIndex;
