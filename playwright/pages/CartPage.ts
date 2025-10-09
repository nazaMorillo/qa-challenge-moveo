import { type Page, expect } from '@playwright/test';
// Page Object Model for Cart Page
export class CartPage {
    readonly page: Page;
    readonly cartItem;
    readonly cartItems;
    readonly removeBTN;
    readonly continueShoppingBTN;
    readonly checkoutBTN;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.removeBTN = page.getByText('[data-test="remove-sauce-labs-backpack"]').first();
        this.continueShoppingBTN = page.locator('[data-test="continue-shopping"]');
        this.checkoutBTN = page.locator('[data-test="checkout"]');
    }

    async isLoaded() {
        await expect(this.page.locator('.title')).toHaveText('Your Cart');
    }

    async removeFirstItem() {
        await this.removeBTN.click();
    }

    async continueShopping() {
        await this.continueShoppingBTN.click();
    }

    async proceedToCheckout() {
        await this.checkoutBTN.click();
    }
}