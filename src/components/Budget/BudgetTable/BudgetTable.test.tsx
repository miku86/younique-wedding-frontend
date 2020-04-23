import React from "react";
import { renderWithRouter } from "../../../utils/testing";
import BudgetTable from "./BudgetTable";

describe("component", () => {
  it("should render the component", () => {
    const props = {
      data: [],
      handleUpdateBools: jest.fn(),
      handleUpdateTexts: jest.fn(),
      handleDelete: jest.fn(),
    }

    const { getByTestId } = renderWithRouter(<BudgetTable {...props} />);
    expect(getByTestId("budget-table")).toBeInTheDocument();
    expect(getByTestId("items-table-header")).toBeInTheDocument();
    expect(getByTestId("budget-table-body")).toBeInTheDocument();
  });
});