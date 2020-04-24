import React from "react";
import { renderWithRouter } from "../../../../utils/testing";
import { todoItem } from "../../../../utils/testing/fixtures";
import TodosTableBody from "./TodosTableBody";

describe("component", () => {
  it("should render the component with no data", () => {
    const props = {
      data: [],
      handleUpdateBools: jest.fn(),
      handleUpdateTexts: jest.fn(),
      handleDelete: jest.fn(),
      order: "asc",
      orderBy: "name",
    }

    const { getByTestId } = renderWithRouter(
      <TodosTableBody {...props} />,
      "table"
    );
    expect(getByTestId("todos-table-body")).toBeInTheDocument();
    expect(getByTestId("todos-table-body-no-entries")).toBeInTheDocument();
  });

  it("should render the component data", () => {
    const props = {
      data: [todoItem],
      handleUpdateBools: jest.fn(),
      handleUpdateTexts: jest.fn(),
      handleDelete: jest.fn(),
      order: "asc",
      orderBy: "name",
    }

    const { getByTestId } = renderWithRouter(
      <TodosTableBody {...props} />,
      "table"
    );
    expect(getByTestId("todos-table-body")).toBeInTheDocument();
    expect(getByTestId("todos-table-body-done")).toBeInTheDocument();
    expect(getByTestId("todos-table-body-title")).toBeInTheDocument();
    expect(getByTestId("todos-table-body-deadline")).toBeInTheDocument();
    expect(getByTestId("todos-table-body-responsible")).toBeInTheDocument();
    expect(getByTestId("todos-table-body-comment")).toBeInTheDocument();
    expect(getByTestId("todos-table-body-update")).toBeInTheDocument();
    expect(getByTestId("todos-table-body-delete")).toBeInTheDocument();
  })
})
