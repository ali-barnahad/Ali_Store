import React, { useEffect, useState } from "react";
import { MdLanguage } from "react-icons/md";
import styles from "@/styles/Navbar.module.css";

const LanguageSwitcher = ({
  languageDropdownVisible,
  toggleLanguageDropdown,
  setLanguage,
  language,
  t,
}) => {
  const [flagSrc, setFlagSrc] = useState("");

  const getFlagSrc = (lang) => {
    switch (lang) {
      case "fa":
        return "http://purecatamphetamine.github.io/country-flag-icons/3x2/IR.svg";
      case "de":
        return "http://purecatamphetamine.github.io/country-flag-icons/3x2/DE.svg";
      case "en":
        return "http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg";
      default:
        return "http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg";
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setFlagSrc(getFlagSrc(lang));

    const event = new CustomEvent("languageChange", { detail: lang });
    window.dispatchEvent(event);

    toggleLanguageDropdown();
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en";
    setLanguage(storedLanguage);
    setFlagSrc(getFlagSrc(storedLanguage));
  }, [setLanguage]);

  return (
    <div className={styles.languageSwitcher}>
      <button onClick={toggleLanguageDropdown}>
        <span className={styles.languageButtonText}>
          <MdLanguage className={styles.languageIcon} />
          <img src={flagSrc} alt={language} className={styles.languageFlag} />
        </span>
      </button>
      {languageDropdownVisible && (
        <div className={styles.languageDropdown}>
          <button onClick={() => handleLanguageChange("fa")}>
            {t("فارسی")}
          </button>
          <button onClick={() => handleLanguageChange("de")}>
            {t("Deutsch")}
          </button>
          <button onClick={() => handleLanguageChange("en")}>
            {t("English")}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
