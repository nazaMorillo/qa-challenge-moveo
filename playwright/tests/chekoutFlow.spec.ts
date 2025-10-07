import { test, expect, Page } from '@playwright/test';
// 1. ENLAZAR: Importar la clase Page Object creada
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

// precondition: 
// Given I am logged in as standard_user

test.describe('SauceDemo Login', () => {  
    test.beforeAll(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});
    // When user add any product to the cart
    test('Ride creation', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        
        await productsPage.isLoaded();
        await productsPage.isVisibleSomeProduct();
    });
});
