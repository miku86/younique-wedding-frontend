import React from "react";
import { renderWithRouter } from "../../utils/testing";
import Todos from "./Todos";

describe("component", () => {
  it("should render the landing page when user not authed", () => {
    const { getByTestId } = renderWithRouter(<Todos />);
    expect(getByTestId("page-landing")).toBeInTheDocument();
  });
});
