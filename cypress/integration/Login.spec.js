describe("Login", () => {
  it("should login user", () => {
    cy.fixture("data").then(({ demoUser }) => {
      cy.visit("/login");
      cy.get("#email")
        .type(demoUser.email)
        .should("have.value", demoUser.email);
      cy.get("#password")
        .type(demoUser.password)
        .should("have.value", demoUser.password);
      cy.get("[data-testid='login-submit']")
        .click();
    });
  });
});