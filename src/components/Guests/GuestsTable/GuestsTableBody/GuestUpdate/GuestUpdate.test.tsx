import React from "react";
import { renderWithRouter } from "../../../../../utils/testing";
import { guestItem } from "../../../../../utils/testing/fixtures";
import GuestUpdate from "./GuestUpdate";

describe("component", () => {
  it("should render the component with all fields", () => {
    const props = {
      item: guestItem,
      open: false,
      handleClose: jest.fn(),
      handleSubmit: jest.fn()
    };

    const { getByTestId } = renderWithRouter(<GuestUpdate {...props} />);
    expect(getByTestId("guest-update-form")).toBeInTheDocument();
    expect(getByTestId("guest-update-name")).toBeInTheDocument();
    expect(getByTestId("guest-update-comment")).toBeInTheDocument();
    expect(getByTestId("guest-update-cancel")).toBeInTheDocument();
    expect(getByTestId("guest-update-submit")).toBeInTheDocument();
  });
});
