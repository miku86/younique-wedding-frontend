import { ROUTE } from "../../src/config";

const createRandomPaths = () => {
  const numberOfPaths = 10;
  const randomPaths = [...Array(numberOfPaths)]
    .map(() => Math
      .random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 11))
    .map(path => `/${path}`);
  return randomPaths;
};

const baseUrl = Cypress.config().baseUrl;
const validPaths = Object.values(ROUTE).map(value => value);
const dontRedirects = ["/login", "/signup"];

describe('routing', () => {
  it('should redirect unauthed users to login', () => {
    const filteredPaths = validPaths.filter(path => !dontRedirects.includes(path));
    filteredPaths.forEach((path) => {
      cy.visit(`${path}`);
      cy.url().should('eq', `${baseUrl}/login?redirect=${path}`);
    });
  });

  it('should show correct page for unauthed user', () => {
    const filteredPaths = validPaths.filter(path => dontRedirects.includes(path));
    filteredPaths.forEach((path) => {
      cy.visit(`${path}`);
      cy.url().should('eq', `${baseUrl}${path}`);
    });
  });

  it('should lead to error page if path is not a valid path', () => {
    const randomPaths = createRandomPaths();
    const filteredRandomPaths = randomPaths.filter(path => !validPaths.includes(path));
    filteredRandomPaths.forEach((path) => {
      cy.visit(`${path}`);
      cy.url().should('eq', `${baseUrl}${path}`);
      cy.get('[data-testid="page-404"]');
    });
  });

  it('should show correct page for authed user', () => {
    cy.visit('/login');
    cy.get('[data-testid="demo-account"]')
      .click();
    cy.url().should('eq', `${baseUrl}/`);

    const filteredPaths = validPaths.filter(path => !dontRedirects.includes(path));
    filteredPaths.forEach((path) => {
      cy.visit(`${path}`);
      cy.url().should('eq', `${baseUrl}${path}`);
    });
  });
});