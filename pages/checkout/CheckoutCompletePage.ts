import { Page, Locator } from "@playwright/test";

export class CheckoutCompletePage {
    readonly page: Page;
    readonly resultBanner: Locator;
    readonly backHomeButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.resultBanner = page.getByText('Thank you for your order!');
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    }

    /**
     * Returns the order confirmation message text.
     */
    async getOrderConfirmationMessage(): Promise<string> {
        const text = await this.resultBanner.textContent() ?? '';
        return text;
    }

    /**
     * Navigates back to the inventory page by clicking the "Back Home" button.
     */
    async goBackToInventory(): Promise<void> {
        await this.backHomeButton.click();
    }
}