import { createContext, useState, useEffect } from "react";

export const TranslationContext = createContext({
  language: "en",
  setLanguage: () => {},
  translations: {},
});

export const TranslationProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "de"; // Retrieve the stored language or default to "en"
    }
    return "de"; // Default to "en" on the server side
  });
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const fetchTranslations = async (lang) => {
      const response = await fetch(`/locales/${lang}/common.json`);
      const data = await response.json();
      setTranslations(data);
    };

    fetchTranslations(language);
  }, [language]);

  const setLanguage = (lang) => {
    setLanguageState(lang);
  };

  return (
    <TranslationContext.Provider
      value={{ language, setLanguage, translations }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
