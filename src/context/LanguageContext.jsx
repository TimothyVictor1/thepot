import { createContext, useContext, useEffect, useState } from "react";
import { strings } from "../i18n/strings.js";

const LanguageContext = createContext(null);

function getInitialLanguage() {
  const stored = window.localStorage.getItem("thepot-lang");
  if (stored === "sv" || stored === "en") return stored;
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "sv";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("thepot-lang", lang);
  }, [lang]);

  const toggleLanguage = () => setLang((l) => (l === "sv" ? "en" : "sv"));

  // t('nav.conference') -> looks up strings[lang].nav.conference
  const t = (path) => {
    const parts = path.split(".");
    let node = strings[lang];
    for (const p of parts) node = node?.[p];
    return node ?? path;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
