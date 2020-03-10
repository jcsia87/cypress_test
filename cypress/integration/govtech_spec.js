describe('Business Grants', function () {
    it('basic auth', function () {
        cy.fixture('authuser.json').as('authuser')
        cy.get('@authuser').then(user => {
            cy.visit('', {
                auth: {
                    username: user.username,
                    password: user.password
                }
            })

        })
    })

    it('can login', function () {
        cy.get('#login-button > span').click()
        cy.url().should('include', '/saml/sso_stub')
        cy.get('[name="CPUID"]').clear().type('S1234567A')
        cy.get('[name="CPUID_FullName"]').clear().type('Tan Ah Kow')
        cy.get('[name="CPEntID"]').clear().type('BGPQEDEMO')

        cy.get('[name="CPRole"]').select('Acceptor')
        cy.get(':nth-child(8) > button').click()
    })
})