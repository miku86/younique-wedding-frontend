import React from "react";
import { renderWithRouter } from "../../../utils/testing";
import GuestsSummary from "./GuestsSummary";

describe("component", () => {
  it("should render the component", () => {
    const props = {
      amountItems: 0,
      amountDoneItems: 0
    }

    const { getByTestId } = renderWithRouter(<GuestsSummary {...props} />);
    expect(getByTestId("guests-summary")).toBeInTheDocument();
  });
});
