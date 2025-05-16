import { test, expect } from '@playwright/test';
import { login, logout } from '../utils/auth';
import environment from '../config/environment.json'
import user from '../fixtures/user.json'
import { invalidUser, validUser } from '../utils/interfaces';



test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.title === 'Negative login test') {
        return;
    }
    await logout(page)
});

test('Basic login function', async ({ page }) => {
    await login(page, `${environment.baseUrl}/login`, validUser)
})

test('Login with remember function', async ({ page }) => {
    await page.goto(`${environment.baseUrl}/login`);

    await page.fill('#Email', validUser.email);
    await page.fill('#Password', validUser.password);

    await page.check("#RememberMe")

    await page.getByRole('button', { name: 'Log in' }).click();

    await page.waitForSelector('a[href="/customer/info"]');
    console.log(`Login as '${validUser.email}' successful.`);
})

test('Negative login test', async ({ page }) => {
    await page.goto(`${environment.baseUrl}/login`);

    await page.fill('#Email', invalidUser.email);
    await page.fill('#Password', invalidUser.password);

    await page.getByRole('button', { name: 'Log in' }).click();


    const errorLocator = page.locator("//div[@class='validation-summary-errors']");
    await expect(errorLocator).toBeVisible();
})