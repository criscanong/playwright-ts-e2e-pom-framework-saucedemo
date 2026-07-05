import { Locator } from '@playwright/test';

export type InventoryProduct = {
    productCard: Locator;
    productName: string;
    productDescription: string;
    productPrice: string
};