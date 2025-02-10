//funcionalidade
describe('Teste', () => {

    //cenário de sucesso
    it.only('Teste depuração env secrects - Ci Actions', () => {

        const username = Cypress.env('username')
        const password = Cypress.env('password')

        cy.log(`Username: ${username}`);
        cy.log(`Password: ${password}`);

    })
})