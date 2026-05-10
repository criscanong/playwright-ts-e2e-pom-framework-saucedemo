import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { users } from '../../../utils/test-data';
import { takeScreenshot } from '../../../utils/screenshot';

test.describe('Auth - Login', () => {

    /**
     * Converts users object into iterable login scenarios.
     * 
     * Example:
     * [
     *   ['standard', {...}],
     *   ['locked_out', {...}]
     * ]
     */
    const loginScenarios = Object.entries(users);

    for (const [scenarioName, scenarioData] of loginScenarios) {
        test(`Login - ${scenarioName}`, async ({ page }) => {

            // Page Object responsible for login interactions
            const loginPage = new LoginPage(page);

            await test.step('Navigate to login page', async () => {
                await loginPage.goto();
                // Initial application state evidence
                await takeScreenshot(page, `${scenarioName}-login-page`);
            });

            await test.step('Perform login with current scenario credentials', async () => {
                await loginPage.login(scenarioData.username, scenarioData.password);
            });

            await test.step('Validate expected login result', async () => {
                if (scenarioData.expected === 'success') {
                    // Successful authentication redirects user to inventory page
                    await expect(page).toHaveURL(/inventory/);
                    await takeScreenshot(page, `${scenarioName}-successful-login`);
                } else {
                    // Invalid authentication should display error banner
                    await expect(loginPage.errorBanner).toContainText(scenarioData.message!);
                    await takeScreenshot(page, `${scenarioName}-error-message`);
                }
            });
        });
    }
});