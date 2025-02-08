//funcionalidade
describe('Login', () => {
    beforeEach(() => {
        cy.visit('');
    });

    //cenário de sucesso
    it('Login com sucesso', () => {
        cy.loginSession(Cypress.env('username'), Cypress.env('password'));
        cy.visit('/inventory');

        //validações de login
        cy.get('.product_label').should('have.text', "Products")
        cy.get('#inventory_container').should('be.visible')
        cy.url().should('include', '/inventory')
    })

    //cenários sem sucesso
    it('Login com usuário inválido', () => {
        cy.login(Cypress.env('userIncorrect'), Cypress.env('password'));

        //validações de login invalido
        cy.get('[data-test="error"]').should('have.text', "Epic sadface: Username and password do not match any user in this service")
        cy.url().should('include', '/v1')
    })

    it('Login com senha inválida', () => {
        cy.login(Cypress.env('username'), Cypress.env('passwordIncorrect'));

        //validações de senha invalida
        cy.get('[data-test="error"]').should('have.text', "Epic sadface: Username and password do not match any user in this service")
        cy.url().should('include', '/v1')
    })

    it('Login com usuário e senha vazio', () => {
        cy.visit('');
        cy.get('#login-button').click();

        //validações usuário e senha vazio
        cy.get('[data-test="error"]').should('have.text', "Epic sadface: Username is required")
        cy.url().should('include', '/v1')
    })

    it('Login com usuário vazio', () => {
        cy.get('[data-test="password"]').type(Cypress.env('password'));
        cy.get('#login-button').click();

        //validações usuário vazio
        cy.get('[data-test="error"]').should('have.text', "Epic sadface: Username is required")
        cy.url().should('include', '/v1')
    })

    it('Login com senha vazio', () => {
        cy.get('[data-test="username"]').type(Cypress.env('username'));
        cy.get('#login-button').click();

        //validações senha vazia
        cy.get('[data-test="error"]').should('have.text', "Epic sadface: Password is required")
        cy.url().should('include', '/v1')
    })

    it('Login com usuário bloqueado', () => {
        cy.login(Cypress.env('userBlocked'), Cypress.env('password'));

        //validações de usuário bloqueado
        cy.get('[data-test="error"]').should('have.text', "Epic sadface: Sorry, this user has been locked out.")
        cy.url().should('include', '/v1')
    })

    it('Login usuário com problema', () => {
        cy.login(Cypress.env('userProblem'), Cypress.env('password'));

        //validações de usuário com problema
        cy.get('.product_label').should('have.text', "Products")
        cy.get('#item_0_img_link > .inventory_item_img').should('be.visible')
        cy.url().should('include', '/inventory')
    })

    it('Login usuário com falha de desempenho', () => {
        const startTime = Date.now();

        cy.login(Cypress.env('userPerformance'), Cypress.env('password'));

        //validações de usuário com falha de desempenho
        cy.get('.product_label').should('have.text', "Products")
            .then(() => {
                const endTime = Date.now();
                const duration = (endTime - startTime) / 1000; //convertendo para segundos

                expect(duration).to.be.greaterThan(4); //verifica se o texto products demorou mais que 4 segundos
                return duration;
            })
        cy.get('#inventory_container').should('be.visible')
        cy.url().should('include', '/inventory')
    });

})