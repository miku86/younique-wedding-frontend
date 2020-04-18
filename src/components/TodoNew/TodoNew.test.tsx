import React from "react";
import { renderWithRouter } from "../../utils/testing";
import TodoNew from "./TodoNew";

describe("component", () => {
  it("should render the component", () => {
    const { getByTestId } = renderWithRouter(<TodoNew />);
    expect(getByTestId("todos")).toBeInTheDocument();
  });
});
