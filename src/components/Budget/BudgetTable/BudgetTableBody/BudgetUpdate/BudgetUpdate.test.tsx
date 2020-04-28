import React from "react";
import { renderWithRouter } from "../../../../../utils/testing";
import { budgetItem } from "../../../../../utils/testing/fixtures";
import BudgetUpdate from "./BudgetUpdate";

describe("component", () => {
  it("should render the component with all fields", () => {
    const props = {
      item: budgetItem,
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
