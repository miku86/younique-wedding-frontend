import React from "react";
import { ROUTE } from "../../../config";
import { renderWithRouter } from "../../../utils/testing";
import ItemNewButton from "./ItemNewButton";

describe("component", () => {
  it("should render the component", () => {
    const props = {
      link: ROUTE.TODOSNEW
    }

    const { getByTestId } = renderWithRouter(<ItemNewButton {...props} />);
    expect(getByTestId("item-new-button")).toBeInTheDocument();
  });
});
