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
  
    it('should sort products by Price (low to high)', () => { //เปลี่ยนฟิลเตอร์ราคาจากต่ำไปสูง 
      cy.get('.product_sort_container').select('Price (low to high)')
      cy.get('option').should('have.value', 'lohi') // ค่า value ต้องเป็น lohi
      
      cy.get('.inventory_item_price').then((prices) => {
        const priceValues = [...prices].map(el => parseFloat(el.textContent?.replace('$', '') || '0'))
        const sortedPrices = [...priceValues].sort((a, b) => a - b)
        expect(priceValues).to.deep.equal(sortedPrices)
      })
    })
  })