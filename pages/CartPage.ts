import { Page, Locator, expect } from "@playwright/test";
import { InventoryProduct } from "../types/InventoryProduct";
import { HeaderComponent } from '../components/HeaderComponent';
import { parsePriceLabel } from '../utils/parsers';

export class CartPage {
    readonly page: Page;
    readonly header: HeaderComponent;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(page);
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    /**
     * Returns product name from product locator
     */
    async getProductName(productCard: Locator): Promise<string> {
        return await productCard.locator('.inventory_item_name').textContent() ?? '';
    }

    /**
     * Returns product description from product locator
     */
    async getProductDescription(productCard: Locator): Promise<string> {
        return await productCard.locator('.inventory_item_desc').textContent() ?? '';
    }

    /**
     * Returns product price from product locator
     */
    async getProductPrice(productCard: Locator): Promise<number> {
        const text = await productCard.locator('.inventory_item_price').textContent() ?? '';
        return parsePriceLabel(text);
    }

    /**
     * Returns cart product information by product name.
     */
    async getProductByName(selectedProductName: string): Promise<InventoryProduct> {
        const productCard = this.cartItems.filter({ hasText: selectedProductName });
        await expect(productCard).toBeVisible();
        const productName = await this.getProductName(productCard);
        const productDescription = await this.getProductDescription(productCard);
        const productPrice = await this.getProductPrice(productCard);
        return { productCard, productName, productDescription, productPrice };
    }

    /**
     * Removes product from cart by locator.
     */
    async removeProduct(productCard: Locator): Promise<void> {
        await productCard.getByRole('button', { name: 'Remove' }).click();
    }

    /**
     * Proceeds to checkout by clicking on checkout button.
     */
    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
};