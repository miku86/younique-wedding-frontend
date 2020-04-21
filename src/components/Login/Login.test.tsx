import React from "react";
import { renderWithRouter } from "../../utils/testing";
import Login from "./Login";

describe("component", () => {
  it("should render the component", () => {
    const { getByTestId } = renderWithRouter(<Login />);
    expect(getByTestId("page-login")).toBeInTheDocument();
  });
});