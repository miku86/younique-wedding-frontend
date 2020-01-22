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
      notDone: "Not Done",
      coming: "Coming",
      notComing: "Not Coming",
      bought: "Bought",
      notBought: "Not Bought",
      email: "E-Mail",
      password: "Password",
      passwordMin: "Password (min. 8 characters)",
      deleteQuestion: "Are you sure you want to delete this entry?",
      title: "Title",
      deadline: "Deadline",
      responsible: "Responsible",
      comment: "Comment",
      options: "Options",
      name: "Name",
      plannedCost: "Planned Cost",
      actualCost: "Actual Cost",
      sentSaveTheDate: "Sent Save The Date?",
      sentInvite: "Sent Invite?",
      receivedResponse: "Received Response?",
      noEntries: "You have no entry so far."
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
      notDone: "Nicht erledigt",
      coming: "Zugesagt",
      notComing: "Nicht zugesagt",
      bought: "Gekauft",
      notBought: "Nicht gekauft",
      email: "E-Mail",
      password: "Passwort",
      passwordMin: "Passwort (min. 8 Zeichen)",
      deleteQuestion: "Willst du diesen Eintrag wirklich löschen?",
      title: "Titel",
      deadline: "Bis",
      responsible: "Verantwortlich",
      comment: "Kommentar",
      options: "Optionen",
      name: "Name",
      plannedCost: "Geplante Kosten",
      actualCost: "Tatsächliche Kosten",
      sentSaveTheDate: "Save The Date versendet?",
      sentInvite: "Einladung versendet?",
      receivedResponse: "Antwort erhalten?",
      noEntries: "Du hast noch keine Einträge."
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
