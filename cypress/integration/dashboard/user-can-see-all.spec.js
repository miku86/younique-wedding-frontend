import { API, ROUTES } from "../../../src/config";
import { mockDashboard } from "../../fixtures/data";

const mockData = mockDashboard;

describe("Dashboard: User can see all", () => {
  it("should show the dashboard cards", () => {
    cy.server();
    cy.route({
      method: "POST",
      url: `*${API.LOGIN}`,
    }).as("login");
    cy.route({
      method: "GET",
      url: `*${API.DASHBOARD}`,
      response: mockData
    }).as("get");

    cy.visit(ROUTES.LOGIN);
    cy.get("[data-testid='demo-account']").click();
    cy.wait("@get").then(() => {
      cy.visit("/");

      cy.get("[data-testid='page-dashboard']")
        .find("[data-testid='dashboard-card']")
        .should("have.length", 3);
    });
  });
});
