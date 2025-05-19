import { expect, Locator, Page } from "@playwright/test";
import environment from '../fixtures/environment.json'



export class CategoryNavigationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getMenuItems() {
        return await this.page.locator('.block-category-navigation .list li a');
    }


}

//Click and verify categories
async function verifyAndClick(page: Page, item: Locator) {
    const text = (await item.textContent())?.trim() || "";
    const href = (await item.getAttribute('href')) || "";
    const expectedUrl = `${environment.baseUrl}${href}`;

    await item.click();

    //verifikation - url
    const actualUrl = page.url();
    expect(actualUrl).toBe(expectedUrl)

    //verification - titel
    const pageTitle = (await page.locator('h1'));
    await expect(pageTitle).toHaveText(text);


}

//Iteration through category menu items
export async function clickAllMenuItems(page: Page) {
    const categoryPage = new CategoryNavigationPage(page)
    const locator = await categoryPage.getMenuItems();
    const mainMenuItems = locator.all();

    for (const item of await mainMenuItems) {
        await verifyAndClick(page, item);


        const subMenuItems = await page.locator('.block-category-navigation .sublist > li > a').all();

        //handle submenus, if they exist
        for (const subItem of subMenuItems) {
            await verifyAndClick(page, subItem);
            await page.goBack();
        }

        await page.goBack();
    }
}