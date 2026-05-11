import { Page, Locator, expect } from '@playwright/test';

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
        return Math.floor(Math.random() * count);
    }

    /**
     * Returns inventory item locator by index.
     */
    getInventoryItemByIndex(index: number): Locator {
        return this.inventoryItems.nth(index);
    }

    /**
     * Adds random product to cart.
     * Returns selected product name for future validations.
     */
    async addRandomProductToCart(): Promise<{ productName: string; productCard: Locator; }> {
        const randomIndex = await this.getRandomProductIndex();
        const productCard = this.getInventoryItemByIndex(randomIndex);
        const productName = await productCard.locator('.inventory_item_name').textContent() ?? '';
        await productCard.getByRole('button', { name: 'Add to cart' }).click();
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
    async removeProductFromCart(productCard: Locator) {
        await productCard.getByRole('button', { name: 'Remove' }).click();
    }
}