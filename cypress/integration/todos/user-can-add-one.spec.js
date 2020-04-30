import { API, ROUTES } from "../../../src/config";
import { getRandomDate, getRandomNumberBetween } from "../../../src/utils/helpers";

describe("Todos: User can add a Todo", () => {
  it("should add a todo", () => {
    cy.server();

    cy.route({
      method: "POST",
      url: `*${API.TODOS}`,
    }).as("addTodo");

    cy.visit(ROUTES.TODOSNEW);
    cy.get("[data-testid='demo-account']").click();

    const title = String(getRandomNumberBetween(10, 1000));
    cy.get("[data-testid='todo-new-title']").type(title);
    cy.get("[data-testid='todo-new-deadline']").type(getRandomDate());
    cy.get("[data-testid='todo-new-responsible']").type(String(getRandomNumberBetween(10, 1000)));
    cy.get("[data-testid='todo-new-comment']").type(String(getRandomNumberBetween(10, 1000)));
    cy.get("[data-testid='todo-new-add']").click();

    cy.get("[data-testid='page-todos']").should("contain", title);
  });
});
