import { test, expect, Page } from '@playwright/test';
// 1. ENLAZAR: Importar la clase Page Object creada
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';




test.describe('SauceDemo', () => {
    test('Successful login with standard_user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        // Given I open the login page
        await loginPage.goto();

        // When I log in with standard_user using secret_sauce password
        await loginPage.login('standard_user', 'secret_sauce');

        // Then I should see the products page
        await productsPage.isLoaded();
    });
});