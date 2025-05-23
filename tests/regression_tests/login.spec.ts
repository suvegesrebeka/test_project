import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { invalidUser, validUser } from '../utils/user';
import { LogoutPage } from '../pages/logoutPage';



test.afterEach(async ({ page }, testInfo) => {
    const logoutPage = new LogoutPage(page)

    if (testInfo.title === 'Login: Negative login test') {
        return;
    }
    await logoutPage.logout()
});

//Login: login with valid user
test('Login: Basic login function', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login(validUser)
})

//Login: with remember me
test.skip('Login with remember function', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.callLoginUrl()
    await loginPage.loginProcess(validUser)

    await page.check("#RememberMe")

    const isChecked = await page.isChecked("#RememberMe");
    expect(isChecked).toBe(true);

    await page.getByRole('button', { name: 'Log in' }).click();

    await page.waitForSelector('a[href="/customer/info"]');
    // console.log(`Login as '${validUser.email}' successful.`);
})

//Login: login with invalid user
test('Login: Negative login test', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.callLoginUrl()
    await loginPage.loginProcess(invalidUser)

    const errorLocator = page.locator("//div[@class='validation-summary-errors']");
    await expect(errorLocator).toBeVisible();
})