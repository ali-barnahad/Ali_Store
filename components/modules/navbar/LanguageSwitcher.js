import React, { useEffect, useState } from "react";
import { MdLanguage } from "react-icons/md";
import styles from "@/styles/Navbar.module.css";
import { button, Image } from "@nextui-org/react";

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
      // case "fa":
      //   return "http://purecatamphetamine.github.io/country-flag-icons/3x2/IR.svg";
      case "de":
        return "/uploads/de.svg";
      case "en":
        return "/uploads/gb.svg";
      default:
        return "/uploads/de.svg";
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
    const storedLanguage = localStorage.getItem("language") || "de";
    setLanguage(storedLanguage);
    setFlagSrc(getFlagSrc(storedLanguage));
  }, [setLanguage]);

  return (
    <div className={styles.languageSwitcher}>
      <button onClick={toggleLanguageDropdown}>
        <span className={styles.languageButtonText}>
          <MdLanguage className={styles.languageIcon} />
          <Image src={flagSrc} alt={language} className={styles.languageFlag} />
        </span>
      </button>
      {languageDropdownVisible && (
        <div className="flex flex-col	absolute top-full left-0 bg-white border border-gray-300  shadow-lg z-[1000] w-80">
          {/* <button
            onClick={() => handleLanguageChange("fa")}
            className="flex flex-row-reverse justify-between p-5 items-center hover:bg-[#4990e2]"
          >
            {t("فارسی")}
            <span>
              <Image
                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/IR.svg"
                alt={t("فارسی")}
                width={40}
                height={40}
              />
            </span>
          </button> */}
          <button
            onClick={() => handleLanguageChange("de")}
            className="flex flex-row-reverse justify-between p-5 items-center hover:bg-[#4990e2]"
          >
            {t("Deutsch")}
            <span>
              <Image
                src="/uploads/de.svg"
                alt={t("Deutsch")}
                width={40}
                height={40}
              />
            </span>
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            className="flex flex-row-reverse justify-between p-5 items-center hover:bg-[#4990e2]"
          >
            {t("English")}
            <span>
              <Image
                src="/uploads/gb.svg"
                alt={t("English")}
                width={40}
                height={40}
              />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
