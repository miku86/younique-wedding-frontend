import { API, ROUTES } from "../../../src/config";
import { mockTodo1, mockTodo2 } from "../../../src/utils/fixtures";

const mockTodos = [
  mockTodo1,
  mockTodo2,
];

describe("Todos: User can delete a todo", () => {
  it("should delete a todo", () => {
    cy.server({ force404: true });

    cy.route({
      method: "GET",
      url: `*${API.TODOS}`,
      response: mockTodos
    });

    cy.route({
      method: "DELETE",
      url: `*${API.TODOS}`,
    }).as("deleteTodo");

    cy.visit(ROUTES.TODOS);
    cy.get("[data-testid='demo-account']").click();

    cy.get("[data-testid='todos-table-body-delete']").first().click();

    cy.wait("@deleteTodo").its("requestBody").should("deep.equal", {
      itemId: mockTodo1.todoId
    });

    cy.get("[data-testid='todos-table-body-delete']").should("have.length", mockTodos.length - 1);
  });
});
