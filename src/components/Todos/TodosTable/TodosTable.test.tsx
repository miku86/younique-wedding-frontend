import React from "react";
import { renderWithRouter } from "../../../utils/testing";
import TodosTable from "./TodosTable";

describe("component", () => {
  it("should render the component", () => {
    const props = {}

    const { getByTestId } = renderWithRouter(<TodosTable />);
    expect(getByTestId("todos")).toBeInTheDocument();
  });
});