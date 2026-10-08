import { Page, Locator } from "@playwright/test";
import { parsePriceLabel } from "../../utils/parsers";

export class CheckoutStepTwoPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly finishButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.subtotalLabel = page.locator('.summary_subtotal_label')
        this.taxLabel = page.locator('.summary_tax_label')
        this.totalLabel = page.locator('.summary_total_label')
        this.finishButton = page.getByRole('button', { name: 'Finish' });
    }
    
    /**
     * Returns order subtotal text.
     */
    async getOrderSubtotal(): Promise<number> {
        const text = await this.subtotalLabel.textContent() ?? '';
        return parsePriceLabel(text);
    }

    /**
     * Returns order tax text.
     */
    async getOrderTax(): Promise<number> {
        const text = await this.taxLabel.textContent() ?? '';
        return parsePriceLabel(text);
    }

    /**
     * Returns order total text.
     */
    async getOrderTotal(): Promise<number> {
        const text = await this.totalLabel.textContent() ?? '';
        return parsePriceLabel(text);
    }

    /**
     * Completes the checkout by clicking Finish.
     */
    async finish(): Promise<void> {
        await this.finishButton.click();
    }
}