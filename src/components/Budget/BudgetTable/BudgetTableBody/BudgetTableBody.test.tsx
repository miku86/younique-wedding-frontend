import React from "react";
import { mockGuest1 } from "../../../../utils/fixtures";
import { renderWithRouter } from "../../../../utils/testing";
import BudgetTableBody from "./BudgetTableBody";

describe("component", () => {
  it("should render the component with no data", () => {
    const props = {
      data: [],
      handleUpdateBools: jest.fn(),
      handleUpdateTexts: jest.fn(),
      handleDelete: jest.fn(),
      order: "asc",
      orderBy: "name",
    };

    const { getByTestId } = renderWithRouter(
      <BudgetTableBody {...props} />,
      "table"
    );
    expect(getByTestId("budget-table-body")).toBeInTheDocument();
    expect(getByTestId("budget-table-body-no-entries")).toBeInTheDocument();
  });

  it("should render the component data", () => {
    const props = {
      data: [mockGuest1],
      handleUpdateBools: jest.fn(),
      handleUpdateTexts: jest.fn(),
      handleDelete: jest.fn(),
      order: "asc",
      orderBy: "name",
    };

    const { getByTestId } = renderWithRouter(
      <BudgetTableBody {...props} />,
      "table"
    );
    expect(getByTestId("budget-table-body")).toBeInTheDocument();
    expect(getByTestId("budget-table-body-done")).toBeInTheDocument();
    expect(getByTestId("budget-table-body-name")).toBeInTheDocument();
    expect(getByTestId("budget-table-body-plannedcost")).toBeInTheDocument();
    expect(getByTestId("budget-table-body-actualcost")).toBeInTheDocument();
    expect(getByTestId("budget-table-body-update")).toBeInTheDocument();
    expect(getByTestId("budget-table-body-delete")).toBeInTheDocument();
  });
});
