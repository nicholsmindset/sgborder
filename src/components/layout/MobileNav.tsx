import { Link, useLocation } from "react-router-dom";
import { Car, Bus, Camera, BookOpen, Calculator } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export const MobileNav = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const tabs = [
    { to: "/", icon: Car, label: t("mobile_nav_live") },
    { to: "/bus", icon: Bus, label: t("mobile_nav_bus") },
    { to: "/cameras", icon: Camera, label: t("mobile_nav_cameras") },
    { to: "/guides", icon: BookOpen, label: t("mobile_nav_guides") },
    { to: "/calculator", icon: Calculator, label: t("mobile_nav_tools") },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex h-14 items-stretch">
        {tabs.map((tab) => {
          const active = tab.to === "/" ? location.pathname === "/" : location.pathname.startsWith(tab.to);
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 text-label-sm transition-all duration-200 active:scale-95 ${
                active ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {active && (
                <span className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-accent" />
              )}
              <tab.icon className="h-5 w-5" strokeWidth={active ? 2.2 : 1.8} />
              <span className={`font-medium ${active ? "text-accent" : ""}`}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
