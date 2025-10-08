import { type Page, expect } from '@playwright/test';

// 1. CREACIÓN: Define la clase que representa el Page Object
export class LoginPage {
    // Propiedad para la instancia de la página de Playwright
    readonly page: Page;

    // 2. Definición de Selectores (Localizadores)
    readonly usernameInput;
    readonly passwordInput;
    readonly loginButton;
    readonly errorLabel;

    // Constructor: Inicializa la instancia de la página
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = this.page.locator('[data-test="username"]');
        this.passwordInput = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-button"]');
        this.errorLabel = this.page.locator('[data-test="error"]');
    }    
    // Método para navegar a la URL base
    async goto() {
        await this.page.goto('https://www.saucedemo.com/', { timeout: 60000 });
    }

    // Método para realizar una acción de login
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async errorMessageValidation(errorMessage: string) {
        await expect(this.errorLabel).toHaveText(errorMessage);
    }
}