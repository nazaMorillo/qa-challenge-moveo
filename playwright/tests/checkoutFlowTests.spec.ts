import { test, expect } from '@playwright/test';
import { UserCredentials } from '../credentials';
import { LoginPage } from '../pages/LoginPage.ts';
import { InventoryPage } from '../pages/InventoryPage.ts';
import { CartPage } from '../pages/CartPage.ts';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.ts';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.ts';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.ts';

test.describe('Map to checkout flow', () => {

const User = {
    credential: UserCredentials.standard_user,
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
    checkoutConfirmationMessage: 'Thank you for your order!'
};

    test('Checkout flow for standard_user', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        // Given I am logged in as standard_user
        await loginPage.goto();
        await loginPage.login(User.credential.userName, User.credential.password);

        // When I add any product to the cart → go to cart → checkout
        await inventoryPage.selectFirstProduct()
        await inventoryPage.gotoCart();
        await cartPage.proceedToCheckout();

        // And I fill First Name, Last Name, Postal Code with any valid values
        await checkoutStepOnePage.fillCheckoutForm(User.firstName, User.lastName, User.postalCode);

        // And I complete the checkout
        await checkoutStepTwoPage.finish();
        // Then I see the “Thank you for your order!” confirmation
        await checkoutCompletePage.isDisplayedTheMessage(User.checkoutConfirmationMessage);
// assertions
    });
});