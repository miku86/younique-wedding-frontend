import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      siteTitle: "Younique Wedding",
      sitePitch: "Plan your Wedding the right way"
    }
  },
  de: {
    translation: {
      siteTitle: "Younique Wedding",
      sitePitch: "Der einfachste Weg, deine Hochzeit zu planen!"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "de",
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
