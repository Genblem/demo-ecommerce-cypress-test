describe('Logout Flow', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com')
      cy.get('[data-test="username"]').type('standard_user')
      cy.get('[data-test="password"]').type('secret_sauce')
      cy.get('[data-test="login-button"]').click()
    })
  
    it('should logout and redirect to login page', () => {
      cy.get('#react-burger-menu-btn').click()
      cy.get('#logout_sidebar_link').click()
  
      cy.url().should('include', '/')
      cy.get('[data-test="login-button"]').should('be.visible')
    })
  })
  