import React from "react";
import { renderWithRouter } from "../../utils/testing";
import Guests from "./Guests";

describe("component", () => {
  it("should render the page", () => {
    const { getByTestId } = renderWithRouter(<Guests />);
    expect(getByTestId("page-guests")).toBeInTheDocument();
  });
});
