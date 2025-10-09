import { test, expect, Page } from '@playwright/test';
import { UserCredentials } from '../credentials';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';


test.describe('SauceDemo homepage', () => {

    test('Successful login with standard_user', async ({ page }) => {
        const credential = UserCredentials.standard_user;
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        

        // Given I open the login page
        await loginPage.goto();

        // When I log in with standard_user using secret_sauce password
        await loginPage.login(credential.userName, credential.password);

        // Then I should see the products page
        await inventoryPage.isLoaded();
    });

    test('Try log in with locked out user', async ({ page }) => {
        const user = UserCredentials.locked_out_user;
        const loginPage = new LoginPage(page);
        
        
        // Given I open the login page
        await loginPage.goto();

        // When I log in with standard_user using secret_sauce password
        await loginPage.login(user.userName, user.password);

        // Then I should see the products page
        await loginPage.errorMessageValidation('Epic sadface: Sorry, this user has been locked out.');
    });
});