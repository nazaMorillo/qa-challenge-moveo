import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.ts';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.ts';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.ts';

test.describe('Map to checkout flow', () => {

const User = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
    userName: 'standard_user',
    password: 'secret_sauce',
    checkoutConfirmationMessage: 'Thank you for your order!'
};

    test('Checkout flow for standard_user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        // Given I am logged in as standard_user
        await loginPage.goto();
        await loginPage.login(User.userName, User.password);

        // When I add any product to the cart → go to cart → checkout
        await productsPage.selectFirstProduct()
        await productsPage.gotoCArt();
        await cartPage.proceedToCheckout();

        // And I fill First Name, Last Name, Postal Code with any valid values
        await checkoutStepOnePage.fillCheckoutForm(User.firstName, User.lastName, User.postalCode);

        // And I complete the checkout
        await checkoutStepTwoPage.finish();
        // Then I see the “Thank you for your order!” confirmation
        await checkoutCompletePage.isDisplayedTheMessage(User.checkoutConfirmationMessage);

    });
});