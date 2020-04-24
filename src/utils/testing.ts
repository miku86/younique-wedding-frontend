import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const renderWithRouter = (ui: any, parentElement: string) => {
  return {
    ...render(
      ui,
      {
        wrapper: MemoryRouter,
        container: parentElement ? document.body.appendChild(document.createElement(parentElement)) : undefined
      }
    ),
  };
};

export { renderWithRouter };
