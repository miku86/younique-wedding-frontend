import React from "react";
import { todoItem } from "../../../../../utils/mocks/fixture";
import { renderWithRouter } from "../../../../../utils/testing";
import TodoUpdate from "./TodoUpdate";

describe("component", () => {
  it("should render the component with all fields", () => {
    const props = {
      item: todoItem,
      open: false,
      handleClose: jest.fn(),
      handleSubmit: jest.fn()
    }

    const { getByTestId } = renderWithRouter(<TodoUpdate {...props} />);
    expect(getByTestId("todo-update-form")).toBeInTheDocument();
    expect(getByTestId("todo-update-title")).toBeInTheDocument();
    expect(getByTestId("todo-update-deadline")).toBeInTheDocument();
    expect(getByTestId("todo-update-responsible")).toBeInTheDocument();
    expect(getByTestId("todo-update-comment")).toBeInTheDocument();
    expect(getByTestId("todo-update-cancel")).toBeInTheDocument();
    expect(getByTestId("todo-update-submit")).toBeInTheDocument();
  });
});
