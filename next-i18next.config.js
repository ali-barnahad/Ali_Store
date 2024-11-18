module.exports = {
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    localeDetection: false,
  },
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
  },
  react: {
    useSuspense: false,
  },
};
