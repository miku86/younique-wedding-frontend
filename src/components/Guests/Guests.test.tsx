import { waitFor } from "@testing-library/react";
import React from "react";
import { renderWithRouter } from "../../utils/testing";
import Guests from "./Guests";

describe("component", () => {
  it("should render the page", async () => {
    const { getByTestId } = renderWithRouter(<Guests />);
    await waitFor(() => {
      expect(getByTestId("page-guests")).toBeInTheDocument();
    });
  });
});
