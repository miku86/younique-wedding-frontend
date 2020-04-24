import { waitFor } from "@testing-library/react";
import React from "react";
import { renderWithRouter } from "../../utils/testing";
import Budget from "./Budget";

describe("component", () => {
  it("should render the page", async () => {
    const { getByTestId } = renderWithRouter(<Budget />);
    await waitFor(() => {
      expect(getByTestId("page-budget")).toBeInTheDocument();
    });
  });
});
