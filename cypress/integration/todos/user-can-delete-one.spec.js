import { API, ROUTES } from "../../../src/config";
import { mockTodo1 } from "../../../src/utils/fixtures";

const mockTodos = [
  mockTodo1,
];

describe("Todos: User can delete a Todo", () => {
  it("should delete a todo", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: `*${API.TODOS}`,
      response: mockTodos
    }).as("getTodos");

    cy.route({
      method: "DELETE",
      url: `*${API.TODOS}`,
    }).as("deleteTodo");

    cy.visit(ROUTES.TODOS);
    cy.get("[data-testid='demo-account']").click();
    cy.get("[data-testid='todos-table-body-delete']").click();

    cy.get("[data-testid='page-todos']").should("not.contain", mockTodo1.title);
  });
});
