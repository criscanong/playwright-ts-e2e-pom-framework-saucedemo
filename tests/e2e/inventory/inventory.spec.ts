import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";
import { users } from "../../../utils/test-data";
import { takeScreenshot } from "../../../utils/screenshot";
import { InventoryProduct } from "../../../types/InventoryProduct";

test.describe("Inventory", () => {

    test("TC06 - Add random product from inventory", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        let selectedProduct: InventoryProduct;

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
            await takeScreenshot(page, "random-product-added");
        });

        await test.step("Validate cart badge count", async () => {
            expect(await inventoryPage.header.getCartBadgeCount()).toBe("1");
            await takeScreenshot(page, "cart-badge-validation");
        });

        await test.step("Validate selected product button change to Remove", async () => {
            await expect(selectedProduct.productCard.getByRole("button", { name: "Remove" })).toBeVisible();
            await takeScreenshot(page, "selected-product-remove-button");
        });
    });

    test("TC07 - Remove random product from inventory", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        let selectedProduct: InventoryProduct;

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
            await expect(inventoryPage.header.cartBadgeIcon).toHaveText("1");
            await takeScreenshot(page, "random-product-added");
        });

        await test.step("Remove the previous added product", async () => {
            await inventoryPage.removeProductFromCart(selectedProduct.productCard);
            await takeScreenshot(page, "product-removed");
        });

        await test.step("Validate product was removed", async () => {
            await expect(selectedProduct.productCard.getByRole("button", {name: "Add to cart"})).toBeVisible();
            await expect(inventoryPage.header.cartBadgeIcon).not.toBeVisible();
            await takeScreenshot(page, "product-removal-validation");
        });
    });

    test("TC08 - Add all products from inventory", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        let products: InventoryProduct[];
        let expectedProductsCount: number;

        await test.step("Navigate to login page", async () => {
            await loginPage.goto();
            await takeScreenshot(page, "login-page");
        });

        await test.step("Login with standard user", async () => {
            await loginPage.login(users.standard.username, users.standard.password);
            await expect(page).toHaveURL(/inventory/);
            await takeScreenshot(page, "inventory-after-login");
        });

        await test.step("Add all products to cart from inventory", async () => {
            expectedProductsCount = await inventoryPage.getInventoryItemsCount();
            products = await inventoryPage.addAllProductsToCart();
            await takeScreenshot(page, "all-products-added");
        });

        await test.step("Validate cart badge count", async () => {
            expect(await inventoryPage.header.getCartBadgeCount()).toBe(expectedProductsCount.toString());
            await takeScreenshot(page, "cart-badge-validation");
        });

        await test.step("Validate all product display Remove button", async () => {
            for (const product of products) {
                await expect(product.productCard.getByRole('button', {name: "Remove"})).toBeVisible();
            }
            await takeScreenshot(page, "all-products-remove-button");
        });
    });

    test("TC09 - Remove all products from inventory", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        let products: InventoryProduct[];
        let expectedProductsCount: number;

        await test.step("Navigate to login page", async () => {
            await loginPage.goto();
            await takeScreenshot(page, "login-page");
        });

        await test.step("Login with standard user", async () => {
            await loginPage.login(users.standard.username, users.standard.password);
            await expect(page).toHaveURL(/inventory/);
            await takeScreenshot(page, "inventory-after-login");
        });

        await test.step("Add all products to cart from inventory", async () => {
            expectedProductsCount = await inventoryPage.getInventoryItemsCount();
            products = await inventoryPage.addAllProductsToCart();
            await takeScreenshot(page, "all-products-added");
        });

        await test.step("Validate cart badge count", async () => {
            expect(await inventoryPage.header.getCartBadgeCount()).toBe((expectedProductsCount).toString());
            await takeScreenshot(page, "cart-badge-validation");
        });

        await test.step("Validate all product display Remove button", async () => {
            for (const product of products) {
                await expect(product.productCard.getByRole('button', {name: "Remove"})).toBeVisible();
            }
            await takeScreenshot(page, "all-products-remove-button");
        });

        await test.step("Remove the previous added products", async () => {
            for (const product of products) {
                await inventoryPage.removeProductFromCart(product.productCard);
            }
            await takeScreenshot(page, "all-products-removed");
        });

        await test.step("Validate products were removed", async () => {
            for (const product of products) {
                await expect(product.productCard.getByRole("button", {name: "Add to cart"})).toBeVisible();
            }
            await expect(inventoryPage.header.cartBadgeIcon).not.toBeVisible();
            await takeScreenshot(page, "products-removal-validation");
        });
    });
});