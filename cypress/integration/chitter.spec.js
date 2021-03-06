describe('When the user visits the home page', function () {
    it('displays the header', function () {
        cy.visit('/')
        cy.get('#header1').should('contain', 'Chitter')
        cy.get('#header2').should('contain', 'The legally distinct short message posting application')
    })
    it('displays peeps', function () {
        cy.visit('/')
        cy.get('#name2').should('contain', 'Mr Test')
        cy.get('#username2').should('contain', '@Test1')
        cy.get('#peep2').should('contain', 'A very nice test peep')
        cy.get('#sentAt2').should('contain', 'Sent at: Fri Aug 13')
    })
    it('displays replies', function () {
        cy.visit('/')
        cy.get('#reply2').click()
        cy.get('#reply1').should('contain', 'Reply:a lovely reply to this test peep')
    })
    it('returns back to home', function () {
        cy.visit('/')
        cy.get('#reply2').click()
        cy.get('#reply1').should('contain', 'Reply:a lovely reply to this test peep')
        cy.get('#return').click()
        cy.get('#header1').should('contain', 'Chitter')
        cy.get('#header2').should('contain', 'The legally distinct short message posting application')
        cy.get('#name2').should('contain', 'Mr Test')
        cy.get('#username2').should('contain', '@Test1')
        cy.get('#peep2').should('contain', 'A very nice test peep')
        cy.get('#sentAt2').should('contain', 'Sent at: Fri Aug 13')
    })
    it('can sign up', function () {
        cy.visit('/')
        cy.get('#signUp').click()
        cy.get('#signUpHeader').should('contain', 'Sign Up')
        cy.get('#registrations-email').type('email@email.com')
        cy.get('#registrations-username').type('testuser')
        cy.get('#registrations-name').type('Test Person')
        cy.get('#registrations-password').type('Password1')
        cy.get('#registrations-submit').click()
    })
    it('can login', function () {
        cy.visit('/')
        cy.get('#login').click()
        cy.get('#registrations-username').type('testuser')
        cy.get('#registrations-password').type('Password1')
        cy.get('#registrations-submit').click()
    })
    it('can send a peep', function () {
        cy.visit('/')
        cy.get('#login').click()
        cy.get('#registrations-username').type('testuser')
        cy.get('#registrations-password').type('Password1')
        cy.get('#registrations-submit').click()
        cy.get('#message').type('Cypress Test Peep')
        cy.get('#add-button').click()
        cy.get('#peep1').should('contain', 'Cypress Test Peep')
    })
    it('can delete a peep', function () {
        cy.visit('/')
        cy.get('#login').click()
        cy.get('#registrations-username').type('testuser')
        cy.get('#registrations-password').type('Password1')
        cy.get('#registrations-submit').click()
        cy.get('#deleteButton1').click()
        cy.get('#peep1').should('contain', 'most recent')
    })
})