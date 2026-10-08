import { Page, Locator } from "@playwright/test";

export class CheckoutStepOnePage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipInput: Locator;
    readonly continueButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.zipInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    /**
     * Fills checkout form with customer information.
     */
    async fillCustomerInfo(firstName: string, lastName: string, zip: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipInput.fill(zip);
    }

    /**
     * Clicks Continue to proceed to order summary.
     */
    async continue(): Promise<void> {
        await this.continueButton.click();
    }
}