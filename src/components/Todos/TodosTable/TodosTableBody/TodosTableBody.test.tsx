import React from "react";
import { renderWithRouter } from "../../../../utils/testing";
import TodosTableBody from "./TodosTableBody";

describe("component", () => {
  it("should render the component", () => {
    const props = {}

    const { getByTestId } = renderWithRouter(<TodosTableBody />);
    expect(getByTestId("todos")).toBeInTheDocument();
  });
});
