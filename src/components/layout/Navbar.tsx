"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { LivePulse } from "../dashboard/LivePulse";
import { useTranslation, LANGUAGES } from "@/lib/i18n";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "/";
  const { lang, setLang, t } = useTranslation();

  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const links = [
    { to: "/", label: t("nav_live") },
    { to: "/bus", label: t("nav_bus") },
    { to: "/cameras", label: t("nav_cameras") },
    { to: "/rts-link", label: t("nav_rts") },
    { to: "/holidays", label: t("nav_holidays") },
    { to: "/guides", label: t("nav_guides") },
    { to: "/calculator", label: t("nav_calculator") },
  ];

  const currentLang = LANGUAGES.find((l) => l.code === lang);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <LivePulse />
          <span className="font-heading text-title font-bold text-foreground">
            SG Border Live
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {links.map((link) => {
              const isActive = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-1 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-2 -bottom-[11px] h-0.5 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Change language"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{currentLang?.short}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-border bg-card p-1 shadow-lg z-50">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      lang === l.code
                        ? "bg-muted font-semibold text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden animate-menu-slide-down">
          {links.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === link.to
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
