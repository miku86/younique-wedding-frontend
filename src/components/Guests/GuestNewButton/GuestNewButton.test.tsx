import React from "react";
import { renderWithRouter } from "../../../utils/testing";
import GuestNewButton from "./GuestNewButton";

describe("component", () => {
  it("should render the component", () => {
    const { getByTestId } = renderWithRouter(<GuestNewButton />);
    expect(getByTestId("guest-new-button")).toBeInTheDocument();
  });
});
