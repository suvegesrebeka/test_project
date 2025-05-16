import { expect, Page } from '@playwright/test';
import { User } from './interfaces';


//Login
export async function login(page: Page, url: string, user: User) {
    await page.goto(`${url}`);
    await page.fill('#Email', user.email);
    await page.fill('#Password', user.password);

    await page.getByRole('button', { name: 'Log in' }).click();

    await page.waitForSelector('a[href="/customer/info"]');
    console.log(`Login as '${user.email}' successful.`);
}

//Logout
export async function logout(page: Page) {
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible()
    await page.getByRole('link', { name: 'Log out' }).click();
}