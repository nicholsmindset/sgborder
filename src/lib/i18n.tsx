import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { en } from "./translations/en";
import { zh } from "./translations/zh";
import { ms } from "./translations/ms";

export type Language = "en" | "zh" | "ms";

export const LANGUAGES: { code: Language; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "zh", label: "中文", short: "中文" },
  { code: "ms", label: "Bahasa Melayu", short: "BM" },
];

type TranslationDict = typeof en;
const translations: Record<Language, TranslationDict> = { en, zh, ms };

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof TranslationDict) => string;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem("sgborder-lang");
    if (stored && (stored === "en" || stored === "zh" || stored === "ms")) return stored;
    return "en";
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("sgborder-lang", newLang);
    document.documentElement.lang = newLang;
  }, []);

  const t = useCallback(
    (key: keyof TranslationDict): string => {
      return translations[lang]?.[key] ?? translations.en[key] ?? key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => useContext(I18nContext);
