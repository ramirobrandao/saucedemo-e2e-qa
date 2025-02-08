//funcionalidade
describe('Operações com carrinho', () => {
    //efetuando login no site antes de cada cenário
    beforeEach(() => {
        cy.visit('');
        cy.loginSession(Cypress.env('username'), Cypress.env('password'));
    });

    //validando se no final de cada cenário na url tem cart
    afterEach(() => {
        cy.url().should('contain', '/cart')
    });

    it('Adicionando um produto ao carrinho', () => {
        cy.adicionarcarrinho();
    })

    it('Adicionando produtos ao carrinho', () => {
        //adicionando um produto ao carrinho
        cy.adicionarcarrinho();

        //voltando na página principal dos produtos
        //clicar menu
        cy.get('#menu_button_container > div > div:nth-child(3) > div > button').click()
        //clicar botão todos os itens
        cy.get('#inventory_sidebar_link').click()

        //adicionando mais um produto ao carrinho totalizando dois produtos

        //clicando no produto camiseta
        cy.visit('/inventory-item.html?id=1')

        //clicando no botão adicionar produto
        cy.get('.btn_primary').click()
        //validando númeração no ícone do carrinho
        cy.get('.fa-layers-counter').should('have.text', "2")
        //clicando no carrinho pelo selector
        cy.get('#shopping_cart_container > a > svg > path').click()

        //validações dentro da página de carrinho

        //validações textos
        cy.get('.subheader').should('have.text', "Your Cart")
        cy.get('.cart_quantity_label').should('have.text', "QTY")
        cy.get('.cart_desc_label').should('have.text', "DESCRIPTION")
        cy.get('.fa-layers-counter').should('have.text', "2")
        cy.get('.inventory_item_price').should('be.visible')
        cy.get('.inventory_item_desc').should('be.visible')
        cy.get('.inventory_item_name').should('be.visible')
    })

    it('Removendo produto do carrinho', () => {
        cy.adicionarcarrinho();

        //remover um produto do carrinho
        cy.get('.item_pricebar > .btn_secondary').click()

        //validações que não tem nenhum item no carrinho
        cy.get('.cart_quantity').should('not.exist')
        cy.get('.item_pricebar > .btn_secondary').should('not.exist')
        cy.get('.inventory_item_price').should('not.exist')
        cy.get('.inventory_item_desc').should('not.exist')
        cy.get('.inventory_item_name').should('not.exist')
    })
})

