// components/LanguageSwitcher.js
import { useRouter } from "next/router";

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locales, locale, asPath } = router;

  // Ensure locales is defined before using it
  if (!locales) {
    return null; // or return an appropriate message or default UI
  }

  const changeLanguage = (lng) => {
    router.push(asPath, asPath, { locale: lng });
  };

  return (
    <div>
      {locales.map((lng) => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          disabled={lng === locale}
        >
          {lng}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
