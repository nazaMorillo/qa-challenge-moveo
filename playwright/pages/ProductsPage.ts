import { type Page, expect } from '@playwright/test';
// Page Object Model for Products Page (after login)
export class ProductsPage {
    readonly page: Page;
    readonly product;
    readonly addtoCartBTN;
    readonly cartBTN;
    
    constructor(page: Page) {
        this.page = page;
        this.product = this.page.locator('[data-test="inventory-item"]');
        this.addtoCartBTN = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]")');      
        this.cartBTN = this.page.locator('[data-test="shopping-cart-link"]');
    }

    async isLoaded() {
        await expect(this.page.locator('.title')).toHaveText('Products');
         // Expects page to have a heading with the name of Installation.
    }
    async isVisibleSomeProduct() {
         // Expects page to have a heading with the name of Installation.
        await expect(this.product.first()).toBeVisible();
    }

    async selectAProduct() {
         // Expects page to have a heading with the name of Installation.
        await expect(this.addtoCartBTN.click());
    }
}
////*[contains(., "Add to cart")][1]