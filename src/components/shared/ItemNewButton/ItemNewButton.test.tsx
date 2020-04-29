import React from "react";
import { renderWithRouter } from "../../../utils/testing";
import ItemNewButton from "./ItemNewButton";

describe("component", () => {
  it("should render the component", () => {
    const props = {
      link: ROUTES.TODOSNEW
    };

    const { getByTestId } = renderWithRouter(<ItemNewButton {...props} />);
    expect(getByTestId("item-new-button")).toBeInTheDocument();
  });
});
