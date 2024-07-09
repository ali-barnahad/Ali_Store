// hooks/useTranslation.js
import { useContext } from "react";
import { TranslationContext } from "@/context/TranslationContext";

const useTranslation = () => {
  const { language, setLanguage, translations } =
    useContext(TranslationContext);

  const t = (text) => {
    return translations[text] || text;
  };

  return { t, setLanguage, language };
};

export default useTranslation;
