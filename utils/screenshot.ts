import { Page, test } from '@playwright/test';

export async function takeScreenshot(
  page: Page,
  name: string
) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-');

  const screenshot = await page.screenshot({
    fullPage: true,
  });

  await test.info().attach(`${name}-${timestamp}`, {
    body: screenshot,
    contentType: 'image/png',
  });
}