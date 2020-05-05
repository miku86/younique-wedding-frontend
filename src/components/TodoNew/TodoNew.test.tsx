import { RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import flushPromises from "flush-promises";
import React from "react";
import { act } from "react-dom/test-utils";
import { createMockTodoNew } from "../../utils/fixtures";
import { renderWithRouter } from "../../utils/testing";
import { TodoNew } from "./TodoNew";

describe("component", () => {
  let addTodo: jest.Mocked<any>;
  let context: RenderResult;

  const renderWithProps = (propOverrides = {}) => {
    const props = {
      addTodo: jest.fn().mockName("addTodo"),
      ...propOverrides
    };

    addTodo = props.addTodo;

    context = renderWithRouter(<TodoNew {...props} />);
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

  describe("when filled in", () => {
    const { title, deadline, responsible, comment } = createMockTodoNew();

    beforeEach(async () => {
      renderWithProps();

      addTodo.mockResolvedValue();
      const { getByTestId } = context;

      await userEvent.type(getByTestId("todo-new-title"), title);
      await userEvent.type(getByTestId("todo-new-deadline"), deadline);
      await userEvent.type(getByTestId("todo-new-responsible"), responsible);
      await userEvent.type(getByTestId("todo-new-comment"), comment);
      userEvent.click(getByTestId("todo-new-add"));

      return act(flushPromises);
    });

    it("should call addTodo", () => {
      expect(addTodo).toHaveBeenCalledWith({ title, deadline, responsible, comment });
    });

    it("should not display a server error", () => {
      const { queryByTestId } = context;
      expect(queryByTestId("server-error")).toBeNull();
    });
  });

  describe("when the action rejects", () => {
    const { title, deadline, responsible, comment } = createMockTodoNew();

    beforeEach(async () => {
      renderWithProps({ isError: true });

      addTodo.mockRejectedValue();

      const { getByTestId } = context;
      await userEvent.type(getByTestId("todo-new-title"), title);
      await userEvent.type(getByTestId("todo-new-deadline"), deadline);
      await userEvent.type(getByTestId("todo-new-responsible"), responsible);
      await userEvent.type(getByTestId("todo-new-comment"), comment);
      userEvent.click(getByTestId("todo-new-add"));

      return act(flushPromises);
    });

    it("should display a server error", () => {
      const { getByTestId } = context;
      expect(getByTestId("server-error")).toBeInTheDocument();
    });

    it("should not clear the fields", () => {
      const { getByTestId } = context;
      expect(getByTestId("todo-new-title").value).toEqual(title);
      expect(getByTestId("todo-new-deadline").value).toEqual(deadline);
      expect(getByTestId("todo-new-responsible").value).toEqual(responsible);
      expect(getByTestId("todo-new-comment").value).toEqual(comment);
    });
  });
});
