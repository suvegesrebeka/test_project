import { test, expect } from '@playwright/test';
import { callLoginUrl, loginProcess, loginVerification, logout } from '../pages/loginPage';
import { invalidUser, validUser } from '../utils/user';



test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.title === 'Negative login test') {
        return;
    }
    await logout(page)
});

test('Login: Basic login function', async ({ page }) => {
    await callLoginUrl(page)
    await loginProcess(page, validUser)
    await loginVerification(page, validUser)
})

// test('Login with remember function', async ({ page }) => {
//     await callLoginUrl(page)
//     await loginProcess(page, validUser)

//     await page.check("#RememberMe")

// const isChecked = await page.isChecked("#RememberMe");
// expect(isChecked).toBe(true);

//     await page.getByRole('button', { name: 'Log in' }).click();

//     await page.waitForSelector('a[href="/customer/info"]');
//     console.log(`Login as '${validUser.email}' successful.`);
// })

test('Login: Negative login test', async ({ page }) => {
    await callLoginUrl(page)
    await loginProcess(page, invalidUser)

    const errorLocator = page.locator("//div[@class='validation-summary-errors']");
    await expect(errorLocator).toBeVisible();
})