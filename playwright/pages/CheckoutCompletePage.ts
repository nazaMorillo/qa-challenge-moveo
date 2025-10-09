import { expect, Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly header;
    readonly completeText;
    readonly ponyExpressImg;
    readonly backHomeButton;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');
        this.ponyExpressImg = page.locator('.pony_express');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async backHome() {
        await this.backHomeButton.click();
    }

    async isDisplayedTheMessage(message: string) {
        await expect(this.header).toHaveText(message);
    }
}

