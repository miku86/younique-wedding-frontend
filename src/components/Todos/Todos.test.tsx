import { waitFor } from "@testing-library/react";
import React from "react";
import { renderWithRouter } from "../../utils/testing";
import Todos from "./Todos";

describe("component", () => {
  it("should render the page", async () => {
    const { getByTestId } = renderWithRouter(<Todos />);
    await waitFor(() => {
      expect(getByTestId("page-todos")).toBeInTheDocument();
    });
  });
});
