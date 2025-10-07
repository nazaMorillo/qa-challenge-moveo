import { type Page, expect } from '@playwright/test';
// Page Object Model for Cart Page
export class CartPage {
    readonly page: Page;
    readonly cartItem;
    readonly removeBTN;
    readonly continueShoppingBTN;
    readonly checkoutButton;

    constructor(page: Page) {
        this.page = page;
        this.cartItem = this.page.locator('.cart_item');
        this.removeBTN = this.page.getByText('Remove').first();
        this.continueShoppingBTN = this.page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
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
        await this.checkoutButton.click();
    }
}