import { API, ROUTES } from "../../../src/config";
import { mockTodo1, mockTodo2 } from "../../fixtures/data";

const mockData = [
  mockTodo1,
  mockTodo2,
];

describe("Todos: User can see Todos", () => {
  it("should show the todos", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: `*${API.TODOS}`,
      response: mockData
    });

    cy.visit(ROUTES.TODOS);
    cy.get("[data-testid='demo-account']").click();

    mockData.forEach(todo =>
      cy.get("[data-testid='page-todos']").contains(todo.title)
    );
  });
});
