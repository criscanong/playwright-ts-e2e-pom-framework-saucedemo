import { test, expect } from '../../fixtures/pages.fixture';
import { takeScreenshot } from '../../../utils/screenshot';

test.describe('Inventory Sorting', () => {
 
    test('TC16 - Validate inventory sorting by name (A to Z)', async ({ page, inventoryPage }) => {

        await test.step('Sort products by name A-Z', async () => {
            await takeScreenshot(page, "before-sorting");
            await inventoryPage.selectSortOption('az');
            await takeScreenshot(page, "after-sorting");
        });

        await test.step('Validate that the products are correctly sorted by name A-Z', async () => {
            const productNames = await inventoryPage.getProductNames();
            const sortedProductNames = [...productNames].sort();
            expect(productNames).toEqual(sortedProductNames);
        });
    })

    test('TC17 - Validate inventory sorting by name (Z to A)', async ({ page, inventoryPage }) => {

        await test.step('Sort products by name Z-A', async () => {
            await takeScreenshot(page, "before-sorting");
            await inventoryPage.selectSortOption('za');
            await takeScreenshot(page, "after-sorting");
        });

        await test.step('Validate that the products are correctly sorted by name Z-A', async () => {
            const productNames = await inventoryPage.getProductNames();
            const sortedProductNames = [...productNames].sort().reverse();
            expect(productNames).toEqual(sortedProductNames);
        });
    })

    test('TC18 - Validate inventory sorting by price low to high', async ({ page, inventoryPage }) => {

        await test.step('Sort products by price low to high', async () => {
            await takeScreenshot(page, "before-sorting");
            await inventoryPage.selectSortOption('lohi');
            await takeScreenshot(page, "after-sorting");
        });

        await test.step('Validate that the products are correctly sorted by price low to high', async () => {
            const productPrices = await inventoryPage.getProductPrices();
            const sortedProductPrices = [...productPrices].sort((a, b) => a - b);
            expect(productPrices).toEqual(sortedProductPrices);
        });
    })

    test('TC19 - Validate inventory sorting by price high to low', async ({ page, inventoryPage }) => {

        await test.step('Sort products by price high to low', async () => {
            await takeScreenshot(page, "before-sorting");
            await inventoryPage.selectSortOption('hilo');
            await takeScreenshot(page, "after-sorting");
        });

        await test.step('Validate that the products are correctly sorted price high to low', async () => {
            const productPrices = await inventoryPage.getProductPrices();
            const sortedProductPrices = [...productPrices].sort((a, b) => b - a);
            expect(productPrices).toEqual(sortedProductPrices);
        });
    })
})
