import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import flushPromises from "flush-promises";
import React from "react";
import { act } from "react-dom/test-utils";
import { mockTodo1, mockTodo2 } from "../../../utils/fixtures";
import { TodosTable } from "../TodosTable/TodosTable";

describe("component", () => {
  const mockData = [
    mockTodo1,
    mockTodo2,
  ];

  let deleteTodo: jest.Mocked<any>;
  let context: RenderResult;

  const renderWithProps = (propOverrides = {}) => {
    const props = {
      deleteTodo: jest.fn().mockName("deleteTodo"),
      data: mockData,
      handleUpdateBools: jest.fn(),
      handleUpdateTexts: jest.fn(),
      ...propOverrides
    };

    deleteTodo = props.deleteTodo;

    context = render(<TodosTable {...props} />);
  };

  describe("initially", () => {
    beforeEach(() => {
      renderWithProps();
    });

    it("should not display a server error", () => {
      const { queryByTestId } = context;
      expect(queryByTestId("server-error")).toBeNull();
    });
  });

  describe("when clicked delete button", () => {
    beforeEach(async () => {
      renderWithProps();

      deleteTodo.mockResolvedValue();
      const { getAllByTestId } = context;

      userEvent.click(getAllByTestId("todos-table-body-delete")[0]);

      return act(flushPromises);
    });

    it("should call deleteTodo", () => {
      expect(deleteTodo).toHaveBeenCalledWith(mockTodo1.todoId);
    });

    it("should not display a server error", () => {
      const { queryByTestId } = context;
      expect(queryByTestId("server-error")).toBeNull();
    });
  });
});