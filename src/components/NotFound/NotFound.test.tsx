import React from "react";
import { renderWithRouter } from "../../utils/testing";
import NotFound from "./NotFound";

describe("component", () => {
  it("should render the component", () => {
    const { getByTestId } = renderWithRouter(<NotFound />);
    expect(getByTestId("page-404")).toBeInTheDocument();
  });
});