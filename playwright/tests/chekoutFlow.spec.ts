import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOne } from '../pages/CheckoutStepOne.ts';

const User = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
    userName: 'standard_user',
    password: 'secret_sauce'
};

test('Checkout flow for standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutStepOne(page);

    // Given I am logged in as standard_user
    await loginPage.goto();
    await loginPage.login(User.userName, User.password);

    // When I add any product to the cart → go to cart → checkout
    await productsPage.selectFirstProduct()// Add first product
    await productsPage.gotoCArt();
    //await page.click('.shopping_cart_link');    
    //await page.click('[data-test="checkout"]');
    await cartPage.proceedToCheckout();

    // And I fill First Name, Last Name, Postal Code with any valid values

    await checkoutPage.fillCheckoutForm(User.firstName, User.lastName, User.postalCode);
    // await page.fill('[data-test="firstName"]', 'John');
    // await page.fill('[data-test="lastName"]', 'Doe');
    // await page.fill('[data-test="postalCode"]', '12345');
    // await page.click('[data-test="continue"]');

    // And I complete the checkout
    await page.click('[data-test="finish"]');

    // Then I see the “Thank you for your order!” confirmation
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});