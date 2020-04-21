import { ROUTE } from "../../src/config";

const createRandomPaths = () => {
  const numberOfPaths = 10;
  const randomPaths = [...Array(numberOfPaths)].map(
    () => {
      return Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 10);
    },
  );
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

  it('should show correct page for unauthed pages', () => {
    const filteredPaths = validPaths.filter(path => dontRedirects.includes(path));
    filteredPaths.forEach((path) => {
      cy.visit(`${path}`);
      cy.url().should('eq', `${baseUrl}${path}`);
    });
  });
});