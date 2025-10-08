import { type Page, expect } from '@playwright/test';
// Page Object Model for Products Page (after login)
export class InventoryPage {
    readonly page: Page;
    readonly product;
    readonly addtoCartBTN;
    readonly cartBTN;
    
    constructor(page: Page) {
        this.page = page;
        this.product = this.page.locator('[data-test="inventory-item"]');
        this.addtoCartBTN = this.page.getByText('Add to cart').first();      
        this.cartBTN = this.page.locator('[data-test="shopping-cart-link"]');
    }

    async isLoaded() {
        await expect(this.page.locator('.title')).toHaveText('Products');
        await expect(this.page).toHaveURL(/inventory/)
        // Expects page to have a heading with the name of Installation.
    }
    async isVisibleSomeProduct() {
         // Expects page to have a heading with the name of Installation.
        await expect(this.product.first()).toBeVisible();
    }

    async selectFirstProduct() {
         // Expects page to have a heading with the name of Installation.
        await this.addtoCartBTN.click();
    }

    async gotoCArt() {
         // Expects page to have a heading with the name of Installation.
        await this.cartBTN.click();
        await expect(this.page).toHaveURL(/cart/);
    }

}