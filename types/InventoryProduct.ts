import { Locator } from '@playwright/test';

export type InventoryProduct = {
    productName: string;
    productCard: Locator;
};