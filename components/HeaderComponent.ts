import { Page, Locator, expect } from "@playwright/test";

export class HeaderComponent {
    readonly page: Page;
    readonly cartIcon: Locator;
    readonly cartBadgeIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadgeIcon = page.locator('.shopping_cart_badge');
    }

    async goToCart(): Promise<void> {
        await this.cartIcon.click();
    }

    async getCartBadgeCount(): Promise<String> {
        await expect(this.cartBadgeIcon).toBeVisible();
        const cartBadgeCount = await this.cartBadgeIcon.textContent();
        return cartBadgeCount ?? '0';
    }
}