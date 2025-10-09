import { type Page, expect  } from '@playwright/test';

export class CheckoutStepOnePage {
    readonly page: Page;
    readonly firstNameInput;
    readonly lastNameInput;
    readonly postalCodeInput;
    readonly continueButton;
    readonly errorLabel;  

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.errorLabel = page.locator('[data-test="error"]');
    }

    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillPostalCode(postalCode: string) {
        await this.postalCodeInput.fill(postalCode);
    }

    async continue() {
        await this.continueButton.click();
    }

    async fillCheckoutForm( firstName: string, lastName: string, postalCode: string) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
        await this.continue();
    }

    async isRedirectedToStepTwo() {
        await expect(this.page).toHaveURL(/checkout-step-two/);
    }

    async errorMessageValidation(errorMessage: string) {
        await expect(this.errorLabel).toHaveText(errorMessage);
    }

}