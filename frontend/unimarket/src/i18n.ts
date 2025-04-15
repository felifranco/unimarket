import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources, { DEFAULT_LANGUAGE } from "./locales";

i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18n;
