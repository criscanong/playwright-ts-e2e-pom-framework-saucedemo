import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";
import { CartPage } from "../../../pages/CartPage";
import { users } from "../../../utils/test-data";
import { takeScreenshot } from "../../../utils/screenshot";
import { InventoryProduct } from "../../../types/InventoryProduct";

test.describe("Cart", () => {

    test("TC10 - View added product in cart", async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        let selectedProduct: InventoryProduct;
        let productInCart: InventoryProduct;

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

        await test.step("Navigate to cart", async () => {
            await inventoryPage.header.goToCart();
            await takeScreenshot(page, "cart-page");
        });

        await test.step("Validate product in cart is product added before", async () => {
            productInCart = await cartPage.getProductInCartByName(selectedProduct.productName);
            expect(productInCart.productName).toBe(selectedProduct.productName);
            expect(productInCart.productDescription).toBe(selectedProduct.productDescription);
            expect(productInCart.productPrice).toBe(selectedProduct.productPrice);
            await expect(productInCart.productCard.getByRole("button", { name: "Remove" })).toBeVisible();
            await takeScreenshot(page, "product-visible-in-cart");
        });
    })

    test("TC11 - Remove product from cart", async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        let selectedProduct: InventoryProduct;
        let productInCart: InventoryProduct;

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

        await test.step("Navigate to cart", async () => {
            await inventoryPage.header.goToCart();
            await takeScreenshot(page, "cart-page");
        });

        await test.step("Locate added product in cart", async () => {
            productInCart = await cartPage.getProductInCartByName(selectedProduct.productName);
            await expect(productInCart.productCard.getByRole("button", { name: "Remove" })).toBeVisible();
            await takeScreenshot(page, "product-visible-in-cart");
        });

        await test.step("Remove product from cart", async () => {
            await cartPage.removeProductFromCart(productInCart.productCard);
            await takeScreenshot(page, "product-was-removed");
        });

        await test.step("Validate product is no longer displayed in cart", async () => {
            await expect(productInCart.productCard).not.toBeVisible();
            await expect(cartPage.header.cartBadgeIcon).not.toBeVisible();
            await takeScreenshot(page, "product-removal-validation");
        });
    })

    test("TC12 - View all added products in cart", async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        let selectedProducts: InventoryProduct[];

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
            selectedProducts = await inventoryPage.addAllProductsToCart();
            await takeScreenshot(page, "all-products-added");
        });

        await test.step("Navigate to cart", async () => {
            await inventoryPage.header.goToCart();
            await takeScreenshot(page, "cart-page");
        });

        await test.step("Validate all added products are displayed in cart", async () => {
            for (const selectedProduct of selectedProducts) {
                const productInCart = await cartPage.getProductInCartByName(selectedProduct.productName);
                expect(productInCart.productName).toBe(selectedProduct.productName);
                expect(productInCart.productDescription).toBe(selectedProduct.productDescription);
                expect(productInCart.productPrice).toBe(selectedProduct.productPrice);
                await expect(productInCart.productCard.getByRole("button", { name: "Remove" })).toBeVisible();
            }
            await takeScreenshot(page, "products-visible-in-cart");
        });
    })

    test("TC13 - Remove all products from cart", async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        let selectedProducts: InventoryProduct[];

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
            selectedProducts = await inventoryPage.addAllProductsToCart();
            await takeScreenshot(page, "all-products-added");
        });

        await test.step("Navigate to cart", async () => {
            await inventoryPage.header.goToCart();
            await takeScreenshot(page, "cart-page");
        });

        await test.step("Remove all products from cart", async () => {
            for (const selectedProduct of selectedProducts) {
                const productInCart = await cartPage.getProductInCartByName(selectedProduct.productName);
                await expect(productInCart.productCard.getByRole("button", { name: "Remove" })).toBeVisible();
                await cartPage.removeProductFromCart(productInCart.productCard);
                await expect(productInCart.productCard).not.toBeVisible();
            }
            await takeScreenshot(page, "products-were-removed");
        });

        await test.step("Validate cart badge is removed", async () => {
            await expect(cartPage.header.cartBadgeIcon).not.toBeVisible();
            await takeScreenshot(page, "products-removal-validation");
        });
    })
})