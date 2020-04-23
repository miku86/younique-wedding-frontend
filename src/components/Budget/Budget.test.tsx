import React from "react";
import { renderWithRouter } from "../../utils/testing";
import Budget from "./Budget";

describe("component", () => {
  it("should render the page", () => {
    const { getByTestId } = renderWithRouter(<Budget />);
    expect(getByTestId("page-budget")).toBeInTheDocument();
  });
});
