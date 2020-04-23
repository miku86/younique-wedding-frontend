import React from "react";
import BudgetNew from ".";
import { renderWithRouter } from "../../utils/testing";

describe("component", () => {
  it("should render the component with all fields", () => {
    const { getByTestId } = renderWithRouter(<BudgetNew />);
    expect(getByTestId("page-budget-new")).toBeInTheDocument();
    expect(getByTestId("budget-new-name")).toBeInTheDocument();
    expect(getByTestId("budget-new-plannedcost")).toBeInTheDocument();
    expect(getByTestId("budget-new-actualcost")).toBeInTheDocument();
    expect(getByTestId("budget-new-add")).toBeInTheDocument();
  });
});
