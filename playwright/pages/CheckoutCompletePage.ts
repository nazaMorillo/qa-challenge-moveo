import { expect, Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly header;
    readonly completeText;
    readonly ponyExpressImg;
    readonly backHomeButton;

    constructor(page: Page) {
        this.page = page;
        this.header = this.page.locator('.complete-header');
        this.completeText = this.page.locator('.complete-text');
        this.ponyExpressImg = this.page.locator('.pony_express');
        this.backHomeButton = this.page.locator('[data-test="back-to-products"]');
    }

    async backHome() {
        await this.backHomeButton.click();
    }

    async isDisplayedTheMessage(message: string) {
        await expect(this.header).toHaveText(message);
        // await this.header.isVisible();
        // await this.completeText.isVisible();
        // await this.ponyExpressImg.isVisible();
    }
}

