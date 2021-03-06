import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      siteTitle: "Younique Weddings",
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
      bought: "Bought",
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
      noEntries: "You have no entry so far.",
      feedbackButton: "Which new feature do you want?",
      feedbackHeading: "Help us to improve this app!",
      feedbackText: "Which new feature do you want to have the most?",
      cancel: "Cancel",
      okay: "Send",
      calendar: "Calendar",
      downloads: "Downloads",
      shops: "Shops",
      onlineFair: "Online Fair",
      afterWedding: "After The Wedding",
      theDay: "Agenda For The Big Day",
      ideas: "Ideas",
      add: "add",
      send: "Send",
      verify: "Verify E-Mail Code",
      useDemoAccount: "Use Demo Account",
      save: "Save",
      updateTodoHeading: "Update your Todo",
      updateGuestHeading: "Update your Guest",
      updateBudgetItemHeading: "Update your Budget Item",
      settings: "Settings",
      availableBudget: "Available Budget",
      newEntry: "New Entry",
    },
  },
  de: {
    translation: {
      siteTitle: "Younique Weddings",
      sitePitch: "Der einfachste Weg, deine Hochzeit zu planen!",
      signup: "Registrieren",
      login: "Einloggen",
      logout: "Ausloggen",
      dashboard: "Dashboard",
      todos: "Todos",
      guests: "Gäste",
      budget: "Budget",
      done: "Erledigt",
      coming: "Zugesagt",
      bought: "Gekauft",
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
      noEntries: "Du hast noch keine Einträge.",
      feedbackButton: "Welche neue Funktion möchtest du?",
      feedbackHeading: "Hilf uns, die App besser zu machen!",
      feedbackText: "Welche neue Funktion willst du unbedingt haben?",
      cancel: "Abbrechen",
      okay: "Senden",
      calendar: "Kalender",
      downloads: "Downloads",
      shops: "Einkaufsmöglichkeiten",
      onlineFair: "Online-Messe",
      afterWedding: "Nach der Hochzeit",
      theDay: "Ablaufplan am Tag der Hochzeit",
      ideas: "Ideen",
      add: "Hinzufügen",
      send: "Senden",
      verify: "E-Mail Code bestätigen",
      useDemoAccount: "Demo Account nutzen",
      save: "Speichern",
      updateTodoHeading: "Update dein Todo",
      updateGuestHeading: "Update deinen Gast",
      updateBudgetItemHeading: "Update deinen Budget-Eintrag",
      settings: "Einstellungen",
      availableBudget: "Verfügbares Budget",
      newEntry: "Neuer Eintrag",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "de",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
