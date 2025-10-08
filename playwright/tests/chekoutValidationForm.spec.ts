import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.ts';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.ts';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.ts';

test.describe('Checkout Form Validation', () => {
    const User = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
    userName: 'standard_user',
    password: 'secret_sauce',
    errorMessage: 'Error: Postal Code is required'
};

        
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        
        // Given I am at Checkout: Your Information
        await loginPage.goto();
        await loginPage.login(User.userName, User.password);
        await productsPage.selectFirstProduct()
        await productsPage.gotoCArt();
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