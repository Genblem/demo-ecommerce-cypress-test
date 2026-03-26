describe('Checkout Process', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com')
      cy.get('[data-test="username"]').type('standard_user')
      cy.get('[data-test="password"]').type('secret_sauce')
      cy.get('[data-test="login-button"]').click()
  
      // Add item to cart
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('.shopping_cart_link').click()
      cy.url().should('include', '/cart.html')
  
      // Go to checkout
      cy.get('[data-test="checkout"]').click()
    })
  
    it('should complete checkout with valid info', () => {
      cy.url().should('include', '/checkout-step-one.html')
  
      cy.get('[data-test="firstName"]').type('Tull')
      cy.get('[data-test="lastName"]').type('Tester')
      cy.get('[data-test="postalCode"]').type('12345')
      cy.get('[data-test="continue"]').click()
  
      cy.url().should('include', '/checkout-step-two.html')
      cy.get('[data-test="finish"]').click()
  
      cy.url().should('include', '/checkout-complete.html')
      cy.contains('Thank you for your order').should('be.visible')
    })
  
    it('should show error if form is incomplete', () => {
      cy.get('[data-test="continue"]').click()
      cy.get('[data-test="error"]').should('contain', 'Error: First Name is required')
    })
  })
  