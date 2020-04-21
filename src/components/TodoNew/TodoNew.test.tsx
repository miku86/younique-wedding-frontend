import React from "react";
import { renderWithRouter } from "../../utils/testing";
import TodoNew from "./TodoNew";

describe("component", () => {
  it("should render the component with all fields", () => {
    const { getByTestId } = renderWithRouter(<TodoNew />);
    expect(getByTestId("page-todo-new")).toBeInTheDocument();
    expect(getByTestId("todo-new-form")).toBeInTheDocument();
    expect(getByTestId("todo-new-title")).toBeInTheDocument();
    expect(getByTestId("todo-new-deadline")).toBeInTheDocument();
    expect(getByTestId("todo-new-responsible")).toBeInTheDocument();
    expect(getByTestId("todo-new-comment")).toBeInTheDocument();
    expect(getByTestId("todo-new-add")).toBeInTheDocument();
  });
});
