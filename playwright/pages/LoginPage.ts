import { type Page, expect } from '@playwright/test';

// Creation of a Page Object Model for the Login Page
export class LoginPage {
    // Property to the instance of Playwright
    readonly page: Page;

    // Locators definition
    readonly usernameInput;
    readonly passwordInput;
    readonly loginButton;
    readonly errorLabel;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorLabel = page.locator('[data-test="error"]');
    }
    // Action method to base URL redirect
    async goto() {
        await this.page.goto('https://www.saucedemo.com/', { timeout: 60000 });
    }

    // Action method to login
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    // Assertion method to validate error message
    async errorMessageValidation(errorMessage: string) {
        await expect(this.errorLabel).toHaveText(errorMessage);
    }
}