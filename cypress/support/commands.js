// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

//Login

Cypress.Commands.add('loginSession', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('');

        cy.log(`Username: ${username}`);
        cy.log(`Password: ${password}`);

        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('#login-button').click();
    })
})

Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('#login-button').click();
})

//Carrinho
//adicionando um produto ao carrinho
Cypress.Commands.add('adicionarcarrinho', () => {
    //acessando produto mochila
    cy.visit('/inventory-item.html?id=4')
    //clicando no botão adicionar produto
    cy.get('.btn_primary').click()
    //validando númeração no ícone do carrinho
    cy.get('.fa-layers-counter').should('have.text', "1")
    //clicando no carrinho pelo selector
    cy.get('#shopping_cart_container > a > svg > path').click()

    //validações textos
    cy.get('.subheader').should('have.text', "Your Cart")
    cy.get('.cart_quantity_label').should('have.text', "QTY")
    cy.get('.cart_desc_label').should('have.text', "DESCRIPTION")
    cy.get('.cart_quantity').should('have.text', "1")
    cy.get('.inventory_item_price').should('be.visible')
    cy.get('.inventory_item_desc').should('be.visible')
    cy.get('.inventory_item_name').should('be.visible')

    //validações botões 
    cy.get('.item_pricebar > .btn_secondary').should('have.text', "REMOVE")
    cy.get('.btn_action').should('have.text', "CHECKOUT")
    cy.get('.cart_footer > .btn_secondary').should('have.text', "Continue Shopping")
})



