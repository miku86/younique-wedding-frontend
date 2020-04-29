import { API } from "../../src/config";
import { mockTodo1, mockTodo2 } from "../fixtures/data";

const mockTodos = [
  mockTodo1,
  mockTodo2,
];

describe("Todos: User can see Todos", () => {
  it("should show the todos from the database", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "*/todos",
      response: mockTodos
    }).as("getTodos");

    cy.visit(API.TODOS);
    cy.get("[data-testid='demo-account']").click();
    cy.url()
      .should("equal", Cypress.config().baseUrl + API.TODOS);
    cy.wait("@getTodos")
      .should((xhr) => {
        expect(xhr.method).to.equal("GET");
        expect(xhr.url).to.match(/\/todos$/);
        expect(xhr.status).to.equal(200);
        expect(xhr.response.body.length).to.equal(mockTodos.length);
      });

    mockTodos.forEach(todo =>
      cy.get("[data-testid='page-todos']").contains(todo.title)
    );
  });
});
