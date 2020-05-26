import React from "react";
import { mockBudget1 } from "../../../../../utils/fixtures";
import { renderWithRouter } from "../../../../../utils/testing";
import BudgetUpdate from "./BudgetUpdate";

describe("component", () => {
  it("should render the component with all fields", () => {
    const props = {
      item: mockBudget1,
      open: false,
      handleClose: jest.fn(),
      handleSubmit: jest.fn()
    };

    const { getByTestId } = renderWithRouter(<BudgetUpdate {...props} />);
    expect(getByTestId("budget-update-form")).toBeInTheDocument();
    expect(getByTestId("budget-update-name")).toBeInTheDocument();
    expect(getByTestId("budget-update-plannedcost")).toBeInTheDocument();
    expect(getByTestId("budget-update-actualcost")).toBeInTheDocument();
    expect(getByTestId("budget-update-cancel")).toBeInTheDocument();
    expect(getByTestId("budget-update-submit")).toBeInTheDocument();
  });
});
