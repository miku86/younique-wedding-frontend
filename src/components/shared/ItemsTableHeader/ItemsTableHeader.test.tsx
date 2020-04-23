import React from "react";
import { renderWithRouter } from "../../../utils/testing";
import ItemsTableHeader from "./ItemsTableHeader";

describe("component", () => {
  it("should render the component", () => {
    const props = {
      headCells: [
        { id: "done", sorting: true },
        { id: "title", sorting: true },
        { id: "deadline", sorting: true },
        { id: "responsible", sorting: true },
        { id: "comment", sorting: true },
        { id: "options", sorting: false },
      ],
      order: "asc",
      orderBy: "name",
      handleRequestSort: jest.fn()
    }

    const { getByTestId } = renderWithRouter(<ItemsTableHeader {...props} />);
    expect(getByTestId("items-table-header")).toBeInTheDocument();
  });
});
