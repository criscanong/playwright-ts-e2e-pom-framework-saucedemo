import { test, expect } from "../../fixtures/pages.fixture";
import { takeScreenshot } from "../../../utils/screenshot";
import { InventoryProduct } from "../../../types/InventoryProduct";
import { customer } from "../../../utils/test-data";

test.describe("Checkout", () => {

    test("TC14 - Checkout a single product", async ({ page, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
        let selectedProduct: InventoryProduct;

         await test.step("Add random product to cart", async () => {
            selectedProduct = await inventoryPage.addRandomProductToCart();
            await takeScreenshot(page, "random-product-added");
        });

        await test.step("Navigate to cart", async () => {
            await inventoryPage.header.goToCart();
            await takeScreenshot(page, "cart-page");
        });

        await test.step("Proceeded to checkout", async () => {
            await cartPage.proceedToCheckout();
            await takeScreenshot(page, "checkout-step-one-page");
        });

        await test.step("Fill checkout information", async () => {
            await checkoutStepOnePage.fillCustomerInfo(customer.standard.firstName, customer.standard.lastName, customer.standard.zip);
            await takeScreenshot(page, "checkout-information-filled");
        });

        await test.step("Continue to step two page", async() => {
            await checkoutStepOnePage.continue();
            await takeScreenshot(page, "checkout-step-two-page");
        });

        await test.step("Validate checkout information", async () => {
            const subtotal = await checkoutStepTwoPage.getOrderSubtotal();
            const tax = await checkoutStepTwoPage.getOrderTax();
            const total = await checkoutStepTwoPage.getOrderTotal();

            const expectedTax = parseFloat((selectedProduct.productPrice * 0.08).toFixed(2));
            const expectedTotal = parseFloat((selectedProduct.productPrice + expectedTax).toFixed(2));

            expect(subtotal).toBe(selectedProduct.productPrice);
            expect(tax).toBe(expectedTax);
            expect(total).toBe(expectedTotal);
        });
        
        await test.step("Complete checkout", async () => {
            await checkoutStepTwoPage.finish();
            await takeScreenshot(page, "order-completed");
        });

        await test.step("Validate thank page", async() => {
            const confirmationMessage = await checkoutCompletePage.getOrderConfirmationMessage();
            expect(confirmationMessage).toBe("Thank you for your order!");
            await takeScreenshot(page, "complete-page");
        });
    })

    test("TC15 - Checkout multiple products", async ({ page, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
        let selectedProducts: InventoryProduct[];
        let totalProductsPrice: number;

         await test.step("Add random product to cart", async () => {
            selectedProducts = await inventoryPage.addAllProductsToCart();
            totalProductsPrice = selectedProducts.reduce((acc, product) => acc + product.productPrice, 0);
            totalProductsPrice = parseFloat(totalProductsPrice.toFixed(2));
            await takeScreenshot(page, "all-products-added");
        });

        await test.step("Navigate to cart", async () => {
            await inventoryPage.header.goToCart();
            await takeScreenshot(page, "cart-page");
        });

        await test.step("Proceeded to checkout", async () => {
            await cartPage.proceedToCheckout();
            await takeScreenshot(page, "checkout-step-one-page");
        });

        await test.step("Fill checkout information", async () => {
            await checkoutStepOnePage.fillCustomerInfo(customer.standard.firstName, customer.standard.lastName, customer.standard.zip);
            await takeScreenshot(page, "checkout-information-filled");
        });

        await test.step("Continue to step two page", async() => {
            await checkoutStepOnePage.continue();
            await takeScreenshot(page, "checkout-step-two-page");
        });

        await test.step("Validate checkout information", async () => {
            const subtotal = await checkoutStepTwoPage.getOrderSubtotal();
            const tax = await checkoutStepTwoPage.getOrderTax();
            const total = await checkoutStepTwoPage.getOrderTotal();

            const expectedTax = parseFloat((totalProductsPrice * 0.08).toFixed(2));
            const expectedTotal = parseFloat((totalProductsPrice + expectedTax).toFixed(2));

            expect(subtotal).toBe(totalProductsPrice);
            expect(tax).toBe(expectedTax);
            expect(total).toBe(expectedTotal);
        });
        
        await test.step("Complete checkout", async () => {
            await checkoutStepTwoPage.finish();
        });

        await test.step("Validate thank page", async() => {
            const confirmationMessage = await checkoutCompletePage.getOrderConfirmationMessage();
            expect(confirmationMessage).toBe("Thank you for your order!");
            await takeScreenshot(page, "complete-page");
        });
    })
})