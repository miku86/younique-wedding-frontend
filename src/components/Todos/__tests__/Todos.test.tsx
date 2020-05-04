import { RenderResult } from "@testing-library/react";
import React from "react";
import { mockTodo1, mockTodo2 } from "../../../../cypress/fixtures/data";
import { renderWithRouter } from "../../../utils/testing";
import { Todos } from "../Todos";

describe("component", () => {
  const mockData = [
    mockTodo1,
    mockTodo2,
  ];

  let loadTodos: jest.Mocked<any>;
  let context: RenderResult;

  const renderWithProps = (propOverrides = {}) => {
    const props = {
      isAuthenticated: true,
      loadTodos: jest.fn().mockName("loadTodos"),
      todos: mockData,
      ...propOverrides
    };

    loadTodos = props.loadTodos;

    context = renderWithRouter(<Todos {...props} />);
  };

  describe("when loading succeeds", () => {
    beforeEach(() => {
      renderWithProps({ isLoading: false });
    });

    it("should not display the loading indicator while not loading", () => {
      const { queryByTestId } = context;
      expect(queryByTestId("loading-indicator")).toBeNull();
    });

    it("should not display an error message", () => {
      const { queryByTestId } = context;
      expect(queryByTestId("loading-error")).toBeNull();
    });

    it("should display the todos", () => {
      const { getByText } = context;
      expect(getByText(mockTodo1.title)).toBeInTheDocument();
      expect(getByText(mockTodo2.title)).toBeInTheDocument();
    });
  });

  describe("when loading fails", () => {
    beforeEach(() => {
      renderWithProps({ isError: true });
    });

    it("should display an error message", () => {
      const { getByTestId } = context;
      expect(getByTestId("loading-error")).toBeInTheDocument();
    });
  });

  it("should display a loading indicator while loading", () => {
    renderWithProps({ isLoading: true });
    const { getByTestId } = context;
    expect(getByTestId("loading-indicator")).toBeInTheDocument();
  });


  it("should load todos on first render", () => {
    renderWithProps();
    expect(loadTodos).toHaveBeenCalled();
  });
});
