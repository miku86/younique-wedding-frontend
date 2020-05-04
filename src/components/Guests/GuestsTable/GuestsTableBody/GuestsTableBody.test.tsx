import React from "react";
import { mockGuest1 } from "../../../../utils/fixtures";
import { renderWithRouter } from "../../../../utils/testing";
import GuestsTableBody from "./GuestsTableBody";

describe("component", () => {
  it("should render the component with no data", () => {
    const props = {
      data: [],
      handleUpdateBools: jest.fn(),
      handleUpdateTexts: jest.fn(),
      handleDelete: jest.fn(),
      order: "asc",
      orderBy: "name",
    };

    const { getByTestId } = renderWithRouter(
      <GuestsTableBody {...props} />,
      "table"
    );
    expect(getByTestId("guests-table-body")).toBeInTheDocument();
    expect(getByTestId("guests-table-body-no-entries")).toBeInTheDocument();
  });

  it("should render the component data", () => {
    const props = {
      data: [mockGuest1],
      handleUpdateBools: jest.fn(),
      handleUpdateTexts: jest.fn(),
      handleDelete: jest.fn(),
      order: "asc",
      orderBy: "name",
    };

    const { getByTestId } = renderWithRouter(
      <GuestsTableBody {...props} />,
      "table"
    );
    expect(getByTestId("guests-table-body")).toBeInTheDocument();
    expect(getByTestId("guests-table-body-name")).toBeInTheDocument();
    expect(getByTestId("guests-table-body-sentsavethedate")).toBeInTheDocument();
    expect(getByTestId("guests-table-body-receivedresponse")).toBeInTheDocument();
    expect(getByTestId("guests-table-body-coming")).toBeInTheDocument();
    expect(getByTestId("guests-table-body-comment")).toBeInTheDocument();
    expect(getByTestId("guests-table-body-update")).toBeInTheDocument();
    expect(getByTestId("guests-table-body-delete")).toBeInTheDocument();
  });
});
