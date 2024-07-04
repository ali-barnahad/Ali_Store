module.exports = {
  i18n: {
    defaultLocale: "fa",
    locales: ["fa", "de", "en"],
    localeDetection: false,
  },
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
  },
  react: {
    useSuspense: false,
  },
};
