import React from "react";
import { renderWithRouter } from "../../utils/testing";
import Todos from "./Todos";

describe("component", () => {
  it("should render the page", () => {
    const { getByTestId } = renderWithRouter(<Todos />);
    expect(getByTestId("page-todos")).toBeInTheDocument();
  });
});
