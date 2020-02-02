describe('App', () => {
  describe('state: logged out', () => {
    it('should show the landing page and its fields', () => {
      cy.visit('/');
      cy.get('[data-testid="landing-title"]');
      cy.get('[data-testid="landing-pitch"]');
    });
  });
})