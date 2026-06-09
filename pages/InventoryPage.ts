import { Page, Locator, expect } from '@playwright/test';
import { InventoryProduct } from '../types/InventoryProduct';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartBadgeIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadgeIcon = page.locator('.shopping_cart_badge');
    }

    /**
     * Returns all inventory items count.
     */
    async getInventoryItemsCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    /**
     * Selects a random inventory item index.
     */
    async getRandomProductIndex(): Promise<number> {
        const count = await this.getInventoryItemsCount();

        if (count === 0) {
            throw new Error('No inventory products available.');
        }

        return Math.floor(Math.random() * count);
    }

    /**
     * Returns inventory item locator by index.
     */
    getInventoryItemByIndex(index: number): Locator {
        return this.inventoryItems.nth(index);
    }

    /**
     * Returns product name from product locator
     */
    async getProductName(productCard: Locator): Promise<string> {
        return await productCard.locator('.inventory_item_name').textContent() ?? '';
    }

    /**
     * adds a product to cart by locator
     */
    async addProductToCart(productCard: Locator): Promise<void> {
        await productCard.getByRole('button', { name: 'Add to cart'}).click();
    }

    /**
     * Adds random product to cart.
     * Returns selected product name for future validations.
     */
    async addRandomProductToCart(): Promise<InventoryProduct> {
        const randomIndex = await this.getRandomProductIndex();
        const productCard = this.getInventoryItemByIndex(randomIndex);
        const productName = await this.getProductName(productCard);
        await this.addProductToCart(productCard);
        return { productName, productCard };
    }

    /**
     * Returns current cart badge count.
     */
    async getCartBadgeCount(): Promise<string> {
        await expect(this.cartBadgeIcon).toBeVisible();
        const cartBadgeCount = await this.cartBadgeIcon.textContent();
        return cartBadgeCount ?? '0';
    }

    /**
     * Removes product from cart by locator.
     */
    async removeProductFromCart(productCard: Locator): Promise<void> {
        await productCard.getByRole('button', { name: 'Remove' }).click();
    }

    /**
     * Adds all inventory products to cart.
     * Returns added products for future validations.
     */
    async addAllProductsToCart(): Promise<InventoryProduct[]> {

        const products: InventoryProduct[] = [];

        const inventoryItemsCount = await this.getInventoryItemsCount();

        for (let i = 0; i < inventoryItemsCount; i++) {

            const productCard = this.getInventoryItemByIndex(i);
            const productName = await this.getProductName(productCard);
            await this.addProductToCart(productCard);

            products.push({
                productName,
                productCard
            });
        }
        return products;
    }
}