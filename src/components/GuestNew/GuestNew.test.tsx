import React from "react";
import { renderWithRouter } from "../../utils/testing";
import GuestNew from "./GuestNew";

describe("component", () => {
  it("should render the component with all fields", () => {
    const { getByTestId } = renderWithRouter(<GuestNew />);
    expect(getByTestId("page-guest-new")).toBeInTheDocument();
    expect(getByTestId("guest-new-name")).toBeInTheDocument();
    expect(getByTestId("guest-new-comment")).toBeInTheDocument();
    expect(getByTestId("guest-new-add")).toBeInTheDocument();
  });
});
