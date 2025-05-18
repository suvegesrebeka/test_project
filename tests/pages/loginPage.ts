import { expect, Page } from '@playwright/test';
import { User } from '../utils/user';
import environment from '../fixtures/environment.json'

//Call the login URL
export async function callLoginUrl(page: Page) {
    await page.goto(`${environment.baseUrl}/${environment.login}`);
}

//Fill and submit the login form  
export async function loginProcess(page: Page, user: User) {
    await page.fill('#Email', user.email);
    await page.fill('#Password', user.password);

    await page.getByRole('button', { name: 'Log in' }).click();
}

//Verification of the login process
export async function loginVerification(page: Page, user) {
    await page.waitForSelector('a[href="/customer/info"]');
    await expect(page.getByRole('link', { name: 'barkavirag@gmail.com' })).toHaveText(user.email)
}

//Logout
export async function logout(page: Page) {
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible()
    await page.getByRole('link', { name: 'Log out' }).click();
}