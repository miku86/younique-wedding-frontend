import { API, ROUTES } from "../../../src/config";
import { mockGuest1, mockGuest2 } from "../../../src/utils/fixtures";

const mockData = [
  mockGuest1,
  mockGuest2,
];

describe("Guests: User can see all", () => {
  it("should show the guests", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: `*${API.GUESTS}`,
      response: mockData
    });

    cy.visit(ROUTES.GUESTS);
    cy.get("[data-testid='demo-account']").click();

    mockData.forEach(guest => {
      cy.get("[data-testid='page-guests']").should("contain", guest.name);
    });
  });
});
