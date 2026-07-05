import { Page, Locator, expect } from "@playwright/test";
import { InventoryProduct } from "../types/InventoryProduct";
import { HeaderComponent } from '../components/HeaderComponent';

export class CartPage {
    readonly page: Page;
    readonly header: HeaderComponent;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(page);
        this.cartItems = page.locator('.cart_item');
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
    async getProductPrice(productCard: Locator): Promise<string> {
        return await productCard.locator('.inventory_item_price').textContent() ?? '';
    }

    /**
     * Returns cart product information by product name.
     */
    async getProductInCartByName(selectedProductName: string): Promise<InventoryProduct> {
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
    async removeProductFromCart(productCard: Locator): Promise<void> {
        await productCard.getByRole('button', { name: 'Remove' }).click();
    }
};