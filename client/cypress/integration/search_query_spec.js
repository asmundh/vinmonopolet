/// <reference types="Cypress" />

describe('Search', () => {
    it('Searches for an item and receives a specific result set', () => {
        // visit 'baseUrl'
        cy.visit('/');

        // check if at correct page
        cy.title().should('contain', 'Vinmonopolet');

        // searches page for first item in database (using preset sorting)
        cy.contains('Thomas Henry Ginger Beer');

        // search for search-query input and input query
        cy.get('#query-search').type('hennessy');

        // wait for data to load
        cy.wait(2000);

        // Check if query was successful
        cy.contains('Hennessy X.O.');

    });
});

describe('Multiple queries', () => {
    it('Specifies a stricter condition, using multiple queries', () => {

        // Query a more specific result
        cy.get('#query-volume').click();
        cy.get('.item').contains('0.7').click();

        // wait for data to load
        cy.wait(2000);

        // Do not expect any 0.35 volume bottles
        cy.get('.db-item-field-volume').contains('0.35').should('not.exist');

    });
});

describe('Empty result', () => {
    it('Query an expectedly non-exisiting item, check that no results are shown.', () => {

        // Query an expected empty result
        cy.get('#query-country').click();
        cy.get('.item').contains('Norge').click();

        // wait for data to load
        cy.wait(2000);

        // Do not expect any result
        cy.get('.db-item').should('not.exist');

    });
});