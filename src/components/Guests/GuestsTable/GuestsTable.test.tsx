import React from "react";
import { renderWithRouter } from "../../../utils/testing";
import GuestsTable from "./GuestsTable";

describe("component", () => {
  it("should render the component", () => {
    const props = {
      data: [],
      handleUpdateBools: jest.fn(),
      handleUpdateTexts: jest.fn(),
      handleDelete: jest.fn(),
    };

    const { getByTestId } = renderWithRouter(<GuestsTable {...props} />);
    expect(getByTestId("guests-table")).toBeInTheDocument();
    expect(getByTestId("items-table-header")).toBeInTheDocument();
    expect(getByTestId("guests-table-body")).toBeInTheDocument();
  });
});