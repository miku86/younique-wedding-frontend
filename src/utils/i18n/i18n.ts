import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      siteTitle: "Younique Wedding",
      sitePitch: "Plan your Wedding the right way",
      signup: "Signup",
      login: "Login",
      logout: "Logout",
      dashboard: "Dashboard",
      todos: "Todos",
      guests: "Guests",
      budget: "Budget",
      done: "Done",
      coming: "Coming",
      bought: "Bought"
    }
  },
  de: {
    translation: {
      siteTitle: "Younique Wedding",
      sitePitch: "Der einfachste Weg, deine Hochzeit zu planen!",
      signup: "Anmelden",
      login: "Einloggen",
      logout: "Ausloggen",
      dashboard: "Dashboard",
      todos: "Aufgaben",
      guests: "Gäste",
      budget: "Budget",
      done: "Erledigt",
      coming: "Zugesagt",
      bought: "Gekauft"
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
