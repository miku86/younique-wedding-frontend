import React from "react";
import { renderWithRouter } from "../../../utils/testing";
import TodoUpdate from "./TodoUpdate";

describe("component", () => {
  it("should render the component", () => {
    const props = {}

    const { getByTestId } = renderWithRouter(<TodoUpdate />);
    expect(getByTestId("todos")).toBeInTheDocument();
  });
});
