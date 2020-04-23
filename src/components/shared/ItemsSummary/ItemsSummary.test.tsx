import React from "react";
import ItemsSummary from ".";
import { renderWithRouter } from "../../../utils/testing";

describe("component", () => {
  it("should render the component", () => {
    const props = {
      title: "done",
      amountItems: 0,
      amountDoneItems: 0
    }

    const { getByTestId } = renderWithRouter(<ItemsSummary {...props} />);
    expect(getByTestId("items-summary")).toBeInTheDocument();
  });
});
