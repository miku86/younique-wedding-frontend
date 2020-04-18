import React from "react";
import { renderWithRouter } from "../../../utils/testing";
import TodoNewButton from "./TodoNewButton";

describe("component", () => {
  it("should render the component", () => {
    const { getByTestId } = renderWithRouter(<TodoNewButton />);
    expect(getByTestId("todo-new-button")).toBeInTheDocument();
  });
});
