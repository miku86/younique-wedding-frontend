import { demoUser, ROUTES } from "../../src/config";

const dontTest = ["/signup"];

describe("Login: User can login", () => {
  describe("User can login with its own data", () => {
    [ROUTES.LOGIN].forEach((route) => {
      it("should login the user and redirect to '/'", () => {
        cy.visit(route);

        cy.get("#email").type(demoUser.email);
        cy.get("#password").type(demoUser.password);
        cy.get("[data-testid='login-submit']").click();

        cy.url().should("equal", Cypress.config().baseUrl + "/");
      });
    });

    Object.values(ROUTES).forEach((route) => {
      if (!dontTest.includes(route)) {
        it("should login the user and redirect to original path", () => {
          cy.visit(route);

          cy.get("#email").type(demoUser.email);
          cy.get("#password").type(demoUser.password);
          cy.get("[data-testid='login-submit']").click();

          cy.url().should("equal", Cypress.config().baseUrl + route);
        });
      }
    });
  });

  describe("User can login with the demo account", () => {
    [ROUTES.LOGIN].forEach((route) => {
      it("should login the user and redirect to '/'", () => {
        cy.visit(route);

        cy.get("[data-testid='demo-account']").click();

        cy.url().should("equal", Cypress.config().baseUrl + "/");
      });
    });

    Object.values(ROUTES).forEach((route) => {
      if (!dontTest.includes(route)) {
        it("should login the user and redirect to original path", () => {
          cy.visit(route);

          cy.get("[data-testid='demo-account']").click();

          cy.url().should("equal", Cypress.config().baseUrl + route);
        });
      }
    });
  });
});
