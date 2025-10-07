import { type Page, expect } from '@playwright/test';
// Page Object Model for Cart Page
export class CartPage {
    readonly page: Page;
    readonly cartItem;
    readonly checkoutButton;

    constructor(page: Page) {
        this.page = page;
        this.cartItem = this.page.locator('.cart_item');
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
    }

    async isLoaded() {
        await expect(this.page.locator('.title')).toHaveText('Your Cart');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}