import { Page, Locator } from '@playwright/test';
import { InventoryProduct } from '../types/InventoryProduct';
import { HeaderComponent } from '../components/HeaderComponent';

export class InventoryPage {
    readonly page: Page;
    readonly header: HeaderComponent;
    readonly inventoryItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(page);
        this.inventoryItems = page.locator('.inventory_item');
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
        const productDescription = await this.getProductDescription(productCard);
        const productPrice = await this.getProductPrice(productCard);
        await this.addProductToCart(productCard);
        return { productCard, productName, productDescription, productPrice };
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
            const productDescription = await this.getProductDescription(productCard);
            const productPrice = await this.getProductPrice(productCard);
            await this.addProductToCart(productCard);

            products.push({
                productName,
                productCard, 
                productDescription,
                productPrice
            });
        }
        return products;
    }
}