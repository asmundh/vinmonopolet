/// <reference types="Cypress" />

describe('Give a thumbs up on an item', () => {
    it('Clicks the thumbs-up icon on an item, ensuring that both state and database is updated with an incremented value', () => {

        // visit 'baseUrl'
        cy.visit('/');

        // check if at correct page
        cy.title().should('contain', 'Vinmonopolet');

        // log previous count of thumbs-up
        cy.get('.db-item').contains('tr','Thomas Henry Ginger Beer').find('#score').invoke('text')
            .then(score => {
                cy.log("Score on item was: "+score);

                // Navigates to thumbs-up icon, clicking it
                cy.get('.db-item').contains('tr','Thomas Henry Ginger Beer').find('#thumbs-up').click();

                // wait for page to load
                cy.wait(1000);

                // Check if score was incremented in state
                cy.get('.db-item').contains('tr','Thomas Henry Ginger Beer').find('#score').should('contain', parseInt(score.toString())+1);

                // Reload page
                cy.reload();

                // Check if score was incremented in backend as well.
                cy.get('.db-item').contains('tr','Thomas Henry Ginger Beer').find('#score').should('contain', parseInt(score.toString())+1);

            });
    });
});

describe('Give a thumbs down on an item', () => {
    it('Clicks the thumbs-down icon on an item, ensuring that both state and database is updated with a decremented value', () => {

        // visit 'baseUrl'
        cy.visit('/');

        // check if at correct page
        cy.title().should('contain', 'Vinmonopolet');

        // log previous count of thumbs-up
        cy.get('.db-item').contains('tr','Thomas Henry Ginger Beer').find('#score').invoke('text')
            .then(score => {
                cy.log("Score on item was: "+score);

                // Navigates to thumbs-up icon, clicking it
                cy.get('.db-item').contains('tr','Thomas Henry Ginger Beer').find('#thumbs-down').click();

                // wait for page to load
                cy.wait(1000);

                // Check if score was incremented in state
                cy.get('.db-item').contains('tr','Thomas Henry Ginger Beer').find('#score').should('contain', parseInt(score.toString())-1);

                // Reload page
                cy.reload();

                // Check if score was incremented in backend as well.
                cy.get('.db-item').contains('tr','Thomas Henry Ginger Beer').find('#score').should('contain', parseInt(score.toString())-1);

            });
    });
});