import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { users } from '../../../utils/test-data';
import { takeScreenshot } from '../../../utils/screenshot';

test.describe('Auth - Login', () => {

    test('TC01 - Login exitoso', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const user = users.standard;

        await test.step('Ir al login', async () => {
            await loginPage.goto();
            await takeScreenshot(page, 'login-page');
        });

        await test.step('Ingresar credenciales válidas y enviar', async () => {
            await loginPage.login(user.username, user.password);
            await takeScreenshot(page, 'after-login');
        });

        await test.step('Validar redirección a inventory', async () => {
            await expect(page).toHaveURL(/inventory/);
        });

        await test.step('Validar UI base del inventory', async () => {
            await expect(page.getByText('Products')).toBeVisible();
        });
    });

    test('TC02 - Login fallido usuario bloqueado', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const user = users.locked_out;

        await test.step('Ir al login', async () => {
            await loginPage.goto();
            await takeScreenshot(page, 'login-page');
        });

        await test.step('Intentar login con usuario bloqueado', async () => {
            await loginPage.login(user.username, user.password);
        });

        await test.step('Validar error', async () => {
            await expect(loginPage.errorBanner).toBeVisible();
            await expect(loginPage.errorBanner).toContainText(user.message!);
            await takeScreenshot(page, 'error-visible');
        });
    });

    test('TC03 - Login fallido usuario inexistente', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const user = users.not_existent;

        await test.step('Ir al login', async () => {
            await loginPage.goto();
            await takeScreenshot(page, 'login-page');
        });

        await test.step('Intentar login con usuario inexistente', async () => {
            await loginPage.login(user.username, user.password);
        });

        await test.step('Validar error', async () => {
            await expect(loginPage.errorBanner).toBeVisible();
            await expect(loginPage.errorBanner).toContainText(user.message!);
            await takeScreenshot(page, 'error-visible');
        });
    });

    test('TC04 - Login fallido sin password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const user = users.no_password;

        await test.step('Ir al login', async () => {
            await loginPage.goto();
            await takeScreenshot(page, 'login-page');
        });

        await test.step('Intentar login sin password', async () => {
            await loginPage.login(user.username, user.password);
        });

        await test.step('Validar error', async () => {
            await expect(loginPage.errorBanner).toBeVisible();
            await expect(loginPage.errorBanner).toContainText(user.message!);
            await takeScreenshot(page, 'error-visible');
        });
    });

    test('TC05 - Login fallido sin usuario', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const user = users.no_user;

        await test.step('Ir al login', async () => {
            await loginPage.goto();
            await takeScreenshot(page, 'login-page');
        });

        await test.step('Intentar login sin usuario', async () => {
            await loginPage.login(user.username, user.password);
        });

        await test.step('Validar error', async () => {
            await expect(loginPage.errorBanner).toBeVisible();
            await expect(loginPage.errorBanner).toContainText(user.message!);
            await takeScreenshot(page, 'error-visible');
        });
    });
});