describe('Business Grants', function () {
    before(function () {
        cy.clearCookies() 
    })

    beforeEach(function () {
        Cypress.Cookies.preserveOnce('_session_id')
    })

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

    it('visit grants page', function () {
        cy.get('[href="/grants/new"] .dashboard-apply-icon', { timeout: 30000 }).click()
    })

    it('select grant sector', function () {
        cy.url().should('include', '/grants/new')
        cy.get('#Agriculture').click()
        cy.get('#Food').click()
    })

    it('can go through grant steps', function () {
        cy.get('[value="International Expansion"]').click()
        cy.get('[value="Market Readiness Assistance 2"]').click()
        cy.get('#go-to-grant').click()
    })

    it('proceed with grant', function () {
        cy.get('#keyPage-form-button').click()
    })

    it('can answer form eligibility', function () {
        cy.url().should('include', '/form/eligibility')
        cy.get(':nth-child(5) > .form-group > .controls > :nth-child(1) > .radiobutton').click()
        cy.get(':nth-child(6) > .form-group > .controls > :nth-child(1) > .radiobutton').click()
        cy.get(':nth-child(7) > .form-group > .controls > :nth-child(1) > .radiobutton').click()
        cy.get(':nth-child(8) > .form-group > .controls > :nth-child(1) > .radiobutton').click()
        cy.get(':nth-child(9) > .form-group > .controls > :nth-child(1) > .radiobutton').click()
        cy.get('#next-btn').click()
    })

    it('can answer form contact info', function () {
        cy.url().should('include', '/form/contact_info')
        cy.get('#react-contact_info-name').clear().type('Jefferson')
        cy.get('#react-contact_info-designation').clear().type('Automation Engineer')
        cy.get('#react-contact_info-phone').clear().type('12345678')
        cy.get('#react-contact_info-primary_email').clear().type('sia_jefferson@yahoo.com')
        cy.get('#react-contact_info-correspondence_address-copied').click()
        cy.get('#react-contact_info-copied').click()
        cy.get('#next-btn').click()
    })
})
