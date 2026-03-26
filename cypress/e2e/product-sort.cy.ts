describe('Product Sort/Filter the items', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com')
      cy.get('[data-test="username"]').type('standard_user')
      cy.get('[data-test="password"]').type('secret_sauce')
      cy.get('[data-test="login-button"]').click()
    })
  
    it('should sort products by Name (A to Z)', () => {
       //  รอให้ URL เปลี่ยนเป็นหน้าหลัง login
      cy.url().should('include', '/inventory.html')
      cy.wait(3000) // รอ 3 วินาที
  // แล้วค่อยหาตัว sort dropdown
      cy.get('.product_sort_container')
        .select('Name (A to Z)')
        .should('have.value', 'az')

      // ตรวจสอบสินค้าชิ้นแรกเป็นชื่อที่น้อยที่สุด
      cy.get('.inventory_item_name').first().should('contain', 'Sauce Labs Backpack')
    })
  
    it('should sort products by Price (low to high)', () => {
      cy.url().should('include', '/inventory.html')
      cy.get('.product_sort_container').as('sortSelect')
      cy.get('@sortSelect').select('Price (low to high)')
      cy.get('@sortSelect').should('have.value', 'lohi')

      cy.get('.inventory_item_price').then((prices) => {
        const priceValues = Cypress._.map(prices, (el) => {
          const text = el.textContent ?? ''
          return Number(text.replace('$', '').trim())
        })

        const sortedPrices = [...priceValues].sort((a, b) => a - b)
        expect(priceValues, 'products are sorted low to high by price').to.deep.equal(sortedPrices)
      })
    })
  })