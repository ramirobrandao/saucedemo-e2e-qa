const { faker } = require('@faker-js/faker/locale/pt_BR');

//funcionalidade
describe('Efetuando uma compra', () => {
    //efetuando login no site, adicionando produto ao carrinho e continuando 
    //para confirmação de dados antes de cada cenário
    beforeEach(() => {
        cy.visit('');
        cy.loginSession(Cypress.env('username'), Cypress.env('password'));
        cy.adicionarcarrinho();
    });

    //cenário de sucesso
    it('Validando o fluxo de compra', () => {
        //finalizando a compra
        cy.get('a.btn_action.checkout_button').click()

        //validando os campos e preenchendo na página de checkout
        cy.get('.subheader').should('have.text', "Checkout: Your Information")
        cy.get('[data-test="firstName"]').should('be.visible').type(faker.person.firstName())
        cy.get('[data-test="lastName"]').should('be.visible').type(faker.person.lastName())
        cy.get('[data-test="postalCode"]').should('be.visible').type(faker.location.zipCode())

        cy.url().should('contain', '/checkout-step-one')

        cy.get('.btn_primary').click()

        //validando que estou na página de resumo da compra
        cy.get('.subheader').should('have.text', "Checkout: Overview")
        cy.get('.cart_quantity_label').should('have.text', "QTY")
        cy.get('.cart_desc_label').should('have.text', "DESCRIPTION")
        cy.get('.fa-layers-counter').should('have.text', "1")
        cy.get('.inventory_item_price').should('be.visible')
        cy.get('.inventory_item_desc').should('be.visible')
        cy.get('.inventory_item_name').should('be.visible')
        cy.get('.summary_info').should('be.visible')
        cy.get('a.btn_action.cart_button').should('be.visible')

        cy.url().should('contain', '/checkout-step-two')

        cy.get('a.btn_action.cart_button').click()

        //validando confirmação de compra 
        cy.get('.subheader').should('be.visible')
        cy.get('.complete-header').should('have.text', "THANK YOU FOR YOUR ORDER")
        cy.url().should('contain', '/checkout-complete')

    })
    //cenários sem sucesso
    it('Cadastro com campos vazio', () => {
        cy.get('a.btn_action.checkout_button').click()

        //validando os campos e preenchendo na página de checkout
        cy.get('.subheader').should('have.text', "Checkout: Your Information")
        cy.get('[data-test="firstName"]').should('be.visible')
        cy.get('[data-test="lastName"]').should('be.visible')
        cy.get('[data-test="postalCode"]').should('be.visible')

        //clicar no botão sem preencher nenhum campo obrigatário 
        cy.get('.btn_primary').click()

        //validar mensagem de erro de todos os campos vazio
        cy.get('[data-test="error"]').should('have.text', "Error: First Name is required")
        cy.url().should('contain', '/checkout-step-one')
    })

    it('Cadastro com nome vazio', () => {
        cy.get('a.btn_action.checkout_button').click()

        //validando e preenchendo os campos na página de checkout
        cy.get('.subheader').should('have.text', "Checkout: Your Information")
        cy.get('[data-test="firstName"]').should('be.visible')
        cy.get('[data-test="lastName"]').should('be.visible').type(faker.person.lastName())
        cy.get('[data-test="postalCode"]').should('be.visible').type(faker.location.zipCode())

        //clicar continue
        cy.get('.btn_primary').click()

        //validar mensagem de erro com nome vazio
        cy.get('[data-test="error"]').should('have.text', "Error: First Name is required")
        cy.url().should('contain', '/checkout-step-one')
    })

    it('Cadastro com sobrenome vazio', () => {
        cy.get('a.btn_action.checkout_button').click()

        //validando e preenchendo os campos na página de checkout
        cy.get('.subheader').should('have.text', "Checkout: Your Information")
        cy.get('[data-test="firstName"]').should('be.visible').type(faker.person.firstName())
        cy.get('[data-test="lastName"]').should('be.visible')
        cy.get('[data-test="postalCode"]').should('be.visible').type(faker.location.zipCode())

        //clicar continue
        cy.get('.btn_primary').click()

        //validar mensagem de erro com sobrenome vazio
        cy.get('[data-test="error"]').should('have.text', "Error: Last Name is required")
        cy.url().should('contain', '/checkout-step-one')
    })

    it('Cadastro com cep vazio', () => {
        cy.get('a.btn_action.checkout_button').click()

        //validando e preenchendo os campos na página de checkout
        cy.get('.subheader').should('have.text', "Checkout: Your Information")
        cy.get('[data-test="firstName"]').should('be.visible').type(faker.person.firstName())
        cy.get('[data-test="lastName"]').should('be.visible').type(faker.person.lastName())
        cy.get('[data-test="postalCode"]').should('be.visible')

        //clicar continue
        cy.get('.btn_primary').click()

        //validar mensagem de erro com cep vazio
        cy.get('[data-test="error"]').should('have.text', "Error: Postal Code is required")
        cy.url().should('contain', '/checkout-step-one')
    })

});