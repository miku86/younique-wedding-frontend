import React from "react";
import { renderWithRouter } from "../../../utils/testing";
import TodosTable from "./TodosTable";

describe("component", () => {
  it("should render the component", () => {
    const props = {
      data: [],
      handleUpdateBools: jest.fn(),
      handleUpdateTexts: jest.fn(),
      handleDelete: jest.fn(),
    }

    const { getByTestId } = renderWithRouter(<TodosTable {...props} />);
    expect(getByTestId("todos-table")).toBeInTheDocument();
    expect(getByTestId("todos-table-header")).toBeInTheDocument();
    expect(getByTestId("todos-table-body")).toBeInTheDocument();
  });
});