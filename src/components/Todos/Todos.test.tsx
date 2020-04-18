import React from "react";
import { renderWithRouter } from "../../utils/testing";
import Todos from "./Todos";

describe("component", () => {
  it("should render the component", () => {
    const { getByTestId } = renderWithRouter(<Todos />);
    expect(getByTestId("todos")).toBeInTheDocument();
  });
});
