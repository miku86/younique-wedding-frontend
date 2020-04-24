import "@testing-library/jest-dom/extend-expect";

// removes warning for missing i18n
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: key => key })
}));