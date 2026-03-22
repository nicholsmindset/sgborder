import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/shared/SEOHead";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Link } from "react-router-dom";
import { Car, Bike, Truck, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const vepFaqs = [
  {
    question: "What is the VEP (Vehicle Entry Permit) for Malaysia?",
    answer:
      "The VEP is a mandatory permit for all Singapore-registered vehicles entering Malaysia. It uses an RFID tag attached to your windscreen. The current daily fee is S$35 for cars (increasing to S$50 in 2027).",
  },
  {
    question: "How much does it cost to drive across the causeway?",
    answer:
      "Total cost depends on your vehicle and checkpoint. For a car via Woodlands: S$0.80 toll each way + S$35 VEP daily fee + RM20 Malaysia road charge. Via Tuas: S$2.10 toll each way. Use the calculator above for exact costs.",
  },
  {
    question: "Is Woodlands or Tuas toll cheaper?",
    answer:
      "Woodlands is significantly cheaper at S$0.80 per crossing vs S$2.10 at Tuas for cars. However, Tuas may save time during peak hours when Woodlands is congested.",
  },
  {
    question: "When do VEP fees increase to S$50?",
    answer:
      "The VEP daily fee for cars increases from S$35 to S$50 on 1 January 2027. Motorcycle fees increase from S$4 to S$7. Toggle '2027 VEP rates' in the calculator above to see updated costs.",
  },
];

type Vehicle = "car" | "motorcycle" | "van";
type CheckpointOption = "woodlands" | "tuas";
type TripType = "one_way" | "round_trip";

const TOLLS = {
  woodlands: { car: 0.8, motorcycle: 0.4, van: 1.6 },
  tuas: { car: 2.1, motorcycle: 1.05, van: 4.2 },
};

const VEP_FEES = {
  current: { car: 35, motorcycle: 4, van: 35 },
  future: { car: 50, motorcycle: 7, van: 50 },
};

const MALAYSIA_ROAD_CHARGE = 20; // RM

const Calculator = () => {
  const { t } = useTranslation();
  const [vehicle, setVehicle] = useState<Vehicle>("car");
  const [cp, setCp] = useState<CheckpointOption>("woodlands");
  const [trip, setTrip] = useState<TripType>("round_trip");
  const [showFuture, setShowFuture] = useState(false);

  const vep = showFuture ? VEP_FEES.future[vehicle] : VEP_FEES.current[vehicle];
  const toll = TOLLS[cp][vehicle];
  const multiplier = trip === "round_trip" ? 2 : 1;

  const sgToll = toll * multiplier;
  const totalSGD = sgToll + vep;
  const totalMYR = MALAYSIA_ROAD_CHARGE;

  const vehicles: { value: Vehicle; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: "car", label: t("calc_car"), icon: Car },
    { value: "motorcycle", label: t("calc_motorcycle"), icon: Bike },
    { value: "van", label: t("calc_van"), icon: Truck },
  ];

  return (
    <div className="pb-mobile-nav">
      <SEOHead
        title="VEP Malaysia Calculator — Toll, Fees & Crossing Cost 2026"
        description="Calculate your VEP Malaysia cost, causeway toll & total crossing fees. Includes Woodlands/Tuas tolls, VEP registration fees, and Malaysia road charges for 2026."
        path="/calculator"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: vepFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <section className="bg-primary text-primary-foreground">
        <div className="container py-6 md:py-8">
          <h1 className="font-heading text-display-sm font-bold md:text-display">
            {t("calc_h1")}
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/60">
            {t("calc_subtitle")}
          </p>
        </div>
      </section>

      <RevealSection>
        <div className="container">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card max-w-lg">
            {/* Vehicle */}
            <label className="text-label font-semibold text-foreground">{t("calc_vehicle_type")}</label>
            <div className="mt-2 flex gap-2">
              {vehicles.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setVehicle(v.value)}
                  className={`flex flex-1 flex-col items-center gap-1 rounded-xl border p-3 text-label transition-all active:scale-[0.97] ${
                    vehicle === v.value
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <v.icon className="h-5 w-5" />
                  {v.label}
                </button>
              ))}
            </div>

            {/* Checkpoint */}
            <label className="mt-4 block text-label font-semibold text-foreground">{t("calc_checkpoint")}</label>
            <div className="mt-2 flex gap-2">
              {(["woodlands", "tuas"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCp(c)}
                  className={`flex-1 rounded-xl border p-3 text-label font-medium transition-all capitalize active:scale-[0.97] ${
                    cp === c ? "border-accent bg-accent/5 text-accent" : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Trip type */}
            <label className="mt-4 block text-label font-semibold text-foreground">{t("calc_trip")}</label>
            <div className="mt-2 flex gap-2">
              {[
                { v: "one_way" as TripType, l: t("calc_one_way") },
                { v: "round_trip" as TripType, l: t("calc_round_trip") },
              ].map((tripOption) => (
                <button
                  key={tripOption.v}
                  onClick={() => setTrip(tripOption.v)}
                  className={`flex-1 rounded-xl border p-3 text-label font-medium transition-all active:scale-[0.97] ${
                    trip === tripOption.v ? "border-accent bg-accent/5 text-accent" : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {tripOption.l}
                </button>
              ))}
            </div>

            {/* VEP toggle */}
            <label className="mt-4 flex items-center gap-2 text-label text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={showFuture} onChange={(e) => setShowFuture(e.target.checked)} className="rounded" />
              {t("calc_show_2027")}
            </label>

            {/* Results */}
            <div className="mt-5 border-t border-border pt-4 space-y-2">
              <Row label={`${t("calc_sg_toll")} (${cp === "woodlands" ? "Woodlands" : "Tuas"})${trip === "round_trip" ? " × 2" : ""}`} value={`S$${sgToll.toFixed(2)}`} />
              <Row label={showFuture ? t("calc_vep_fee_2027") : t("calc_vep_fee")} value={`S$${vep.toFixed(2)}`} />
              <Row label={t("calc_my_road_charge")} value={`RM${totalMYR.toFixed(2)}`} />
              <div className="border-t border-border pt-2 mt-2">
                <Row label={t("calc_total_sgd")} value={`S$${totalSGD.toFixed(2)}`} bold />
                <Row label={t("calc_total_myr")} value={`RM${totalMYR.toFixed(2)}`} bold />
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* FAQ */}
      <RevealSection>
        <div className="container max-w-lg">
          <h2 className="font-heading text-title font-bold mb-3">{t("calc_faq_title")}</h2>
          <FAQAccordion faqs={vepFaqs} />
        </div>
      </RevealSection>

      {/* Related links */}
      <RevealSection>
        <div className="container max-w-lg">
          <h2 className="font-heading text-title font-bold mb-3">{t("calc_related")}</h2>
          <div className="space-y-2">
            <Link
              to="/guides/vep-malaysia-guide"
              className="flex items-center justify-between rounded-xl border border-border bg-card p-3 shadow-card transition-all hover:shadow-card-hover"
            >
              <span className="text-sm font-medium text-foreground">{t("calc_vep_guide")}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link
              to="/woodlands"
              className="flex items-center justify-between rounded-xl border border-border bg-card p-3 shadow-card transition-all hover:shadow-card-hover"
            >
              <span className="text-sm font-medium text-foreground">{t("calc_woodlands_link")}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link
              to="/tuas"
              className="flex items-center justify-between rounded-xl border border-border bg-card p-3 shadow-card transition-all hover:shadow-card-hover"
            >
              <span className="text-sm font-medium text-foreground">{t("calc_tuas_link")}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </RevealSection>
    </div>
  );
};

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className={`text-sm ${bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{label}</span>
    <span className={`tabular-nums text-sm ${bold ? "font-heading font-bold text-foreground" : "font-medium text-foreground"}`}>{value}</span>
  </div>
);

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal();
  return <section ref={ref} className="reveal py-4">{children}</section>;
};

export default Calculator;
