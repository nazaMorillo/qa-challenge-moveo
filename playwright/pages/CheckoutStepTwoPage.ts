import { type Page, expect  } from '@playwright/test';

export class CheckoutStepTwoPage {
    readonly page: Page;
    readonly summaryContainer;
    readonly cancelBTN;
    readonly finishBTN;
    readonly paymentInfo;
    readonly shippingInfo;
    readonly itemTotal;
    readonly tax;
    readonly total;

    constructor(page: Page) {
        this.page = page;
        this.summaryContainer = page.locator('.checkout_summary_container');
        this.cancelBTN = page.locator('[data-test="cancel"]');
        this.finishBTN = page.locator('[data-test="finish"]');
        this.paymentInfo = page.locator('.summary_info > div:has-text("Payment Information")');
        this.shippingInfo = page.locator('.summary_info > div:has-text("Shipping Information")');
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
    }

    async cancel() {
        await this.cancelBTN.click();
    }

    async finish() {
        await this.finishBTN.click();
        //await expect(this.page).toHaveURL(/checkout-complete/);
    }

}