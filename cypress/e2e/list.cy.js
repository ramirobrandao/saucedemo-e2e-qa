describe('Lista de produtos', () => {
    it('Validar lista de produtos', () => {
        cy.loginSession(Cypress.env('username'), Cypress.env('password'));
        cy.visit('/inventory');
        //validações da lista de produtos
        cy.get('.product_label').should('have.text', "Products")
        cy.get('.inventory_list').should('be.visible')
        cy.get('.inventory_item_img').should('be.visible')
    })
})