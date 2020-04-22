import React from "react";
import GuestsTableHeader from ".";
import { renderWithRouter } from "../../../../utils/testing";

describe("component", () => {
  it("should render the component", () => {
    const props = {
      order: "asc",
      orderBy: "name",
      handleRequestSort: jest.fn()
    }

    const { getByTestId } = renderWithRouter(<GuestsTableHeader {...props} />);
    expect(getByTestId("guests-table-header")).toBeInTheDocument();
  });
});
