import React from "react";
import { renderWithRouter } from "../../../utils/testing";
import TodosSummary from "./TodosSummary";

describe("component", () => {
  it("should render the component", () => {
    const props = {
      amountItems: 0,
      amountDoneItems: 0
    }

    const { getByTestId } = renderWithRouter(<TodosSummary {...props} />);
    expect(getByTestId("todos-summary")).toBeInTheDocument();
  });
});
