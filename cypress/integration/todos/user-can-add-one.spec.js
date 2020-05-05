import { API, ROUTES } from "../../../src/config";
import { createMockTodoNew } from "../../../src/utils/fixtures";

describe("Todos: User can add a Todo", () => {
  it("should add a todo", () => {
    const todo = createMockTodoNew();
    const { title, deadline, responsible, comment } = todo;

    cy.server({ force404: true });

    cy.route({
      method: "GET",
      url: `*${API.TODOS}`,
      response: []
    });

    cy.route({
      method: "POST",
      url: `*${API.TODOS}`,
      response: todo,
    }).as("addTodo");

    cy.visit(ROUTES.TODOSNEW);
    cy.get("[data-testid='demo-account']").click();


    cy.get("[data-testid='todo-new-title']").type(title);
    cy.get("[data-testid='todo-new-deadline']").type(deadline);
    cy.get("[data-testid='todo-new-responsible']").type(responsible);
    cy.get("[data-testid='todo-new-comment']").type(comment);
    cy.get("[data-testid='todo-new-add']").click();

    cy.wait("@addTodo").its("requestBody").should("deep.equal", todo);
  });
});
