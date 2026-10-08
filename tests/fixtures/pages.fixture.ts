import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutStepOnePage } from '../../pages/checkout/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/checkout/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../../pages/checkout/CheckoutCompletePage';

type PageFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutStepOnePage: CheckoutStepOnePage;
    checkoutStepTwoPage: CheckoutStepTwoPage;
    checkoutCompletePage: CheckoutCompletePage;
}

export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        await use (new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await page.goto('/inventory.html');
        await use (new InventoryPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutStepOnePage: async ({ page }, use) => {
        await use(new CheckoutStepOnePage(page));
    },
    checkoutStepTwoPage: async ({ page }, use) => {
        await use(new CheckoutStepTwoPage(page));
    },
    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckoutCompletePage(page));
    }
});

export { expect } from '@playwright/test';