import { test, expect } from '@playwright/test';
import { UserCredentials } from '../credentials';
import { LoginPage } from '../pages/LoginPage.ts';
import { InventoryPage } from '../pages/InventoryPage.ts';
import { CartPage } from '../pages/CartPage.ts';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.ts';

test.describe('Checkout Form Validation', () => {
    const User = {
        credential: UserCredentials.standard_user,
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '',
        errorMessage: 'Error: Postal Code is required'
};

        
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        
        // Given I am at Checkout: Your Information
        await loginPage.goto();
        await loginPage.login(User.credential.userName, User.credential.password);
        await inventoryPage.selectFirstProduct()
        await inventoryPage.gotoCart();
        await cartPage.proceedToCheckout();
    });

    test('should show error when Postal Code is missing', async ({ page }) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        // When I leave Postal Code empty and click Continue
        await checkoutStepOnePage.fillCheckoutForm(User.firstName, User.lastName, User.postalCode);

        // Then I see the error message about the missing field
        await checkoutStepOnePage.errorMessageValidation(User.errorMessage);
    });

    test('should show error when Last Name is missing', async ({ page }) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        // When I leave Postal Code empty and click Continue
        await checkoutStepOnePage.fillCheckoutForm(User.firstName, '', '12345');

        // Then I see the error message about the missing field
        await checkoutStepOnePage.errorMessageValidation('Error: Last Name is required');
    });
});