import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { pt } from "../locales/pt";
import type { Translations } from "../locales/pt";
import { es } from "../locales/es";

type Language = "pt" | "es";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  const t = (key: keyof Translations): string => {
    if (language === "es") {
      return es[key] || pt[key] || key;
    }
    return pt[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
