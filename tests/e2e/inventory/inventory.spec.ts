import { test, expect, Locator } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";
import { users } from "../../../utils/test-data";
import { takeScreenshot } from "../../../utils/screenshot";

test.describe("Inventory", () => {

    test("TC06 - Add random product from inventory", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        let selectedProductName: string;

        await test.step("Navigate to login page", async () => {
            await loginPage.goto();
            await takeScreenshot(page, "login-page");
        });

        await test.step("Login with standard user", async () => {
            await loginPage.login(users.standard.username, users.standard.password);
            await expect(page).toHaveURL(/inventory/);
            await takeScreenshot(page, "inventory-after-login");
        });

        await test.step("Add random product to car", async () => {
            selectedProductName = (await inventoryPage.addRandomProductToCart()).productName;
            await takeScreenshot(page, "random-product-added");
        });

        await test.step("Validate cart badge count", async () => {
            expect(await inventoryPage.getCartBadgeCount()).toBe("1");
            await takeScreenshot(page, "cart-badge-validation");
        });

        await test.step("Validate selected product button change to Remove", async () => {
            const selectedProductCard = inventoryPage.inventoryItems.filter({ hasText: selectedProductName });
            await expect(selectedProductCard.getByRole("button", { name: "Remove" })).toBeVisible();
            await takeScreenshot(page, "cart-badge-validation");
        });
    });

    test("TC07 - Remove random product from inventory", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        let selectedProduct: {
            productName: string;
            productCard: Locator;
        };

        await test.step("Navigate to login page", async () => {
            await loginPage.goto();
            await takeScreenshot(page, "login-page");
        });

        await test.step("Login with standard user", async () => {
            await loginPage.login(users.standard.username, users.standard.password);
            await expect(page).toHaveURL(/inventory/);
            await takeScreenshot(page, "inventory-after-login");
        });

        await test.step("Add random product to cart", async () => {
            selectedProduct = await inventoryPage.addRandomProductToCart();
            await expect(selectedProduct.productCard.getByRole("button", { name: "Remove" })).toBeVisible();
            await expect(inventoryPage.cartBadgeIcon).toHaveText("1");
            await takeScreenshot(page, "random-product-added");
        });

        await test.step("Remove the previous added product", async () => {
            await inventoryPage.removeProductFromCart(selectedProduct.productCard);
            await takeScreenshot(page, "product-removed");
        });

        await test.step("Validate product was removed", async () => {
            await expect(selectedProduct.productCard.getByRole("button", {name: "Add to cart"})).toBeVisible();
            await expect(inventoryPage.cartBadgeIcon).not.toBeVisible();
        });
    });
});