import { API, ROUTES } from "../../../src/config";
import { mockBudget1, mockBudget2 } from "../../fixtures/data";

const mockData = [
  mockBudget1,
  mockBudget2,
];

describe("Budgets: User can see all", () => {
  it("should show the Budgets", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: `*${API.BUDGET}`,
      response: mockData
    });

    cy.visit(ROUTES.BUDGET);
    cy.get("[data-testid='demo-account']").click();

    mockData.forEach(budget => {
      cy.get("[data-testid='page-budget']").should("contain", budget.name);
    });
  });
});
