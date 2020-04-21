import React from "react";
import { renderWithRouter } from "../../../../utils/testing";
import TodosTableHeader from "./TodosTableHeader";

describe("component", () => {
  it("should render the component", () => {
    const props = {
      order: "asc",
      orderBy: "name",
      handleRequestSort: jest.fn()
    }

    const { getByTestId } = renderWithRouter(<TodosTableHeader {...props} />);
    expect(getByTestId("todos-table-header")).toBeInTheDocument();
  });
});
