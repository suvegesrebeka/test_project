import { Locator, Page } from "@playwright/test";


export class CategoryNavigationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getMenuItems() {
        return await this.page.locator('.block-category-navigation .list li a');
    }


}

async function verifyAndClick(page: Page, link: Locator) {
    const text = (await link.textContent())?.trim() || "";
    const href = (await link.getAttribute('href')) || "";
    const expectedUrl = `https://demowebshop.tricentis.com${href}`;

    console.log(`Clicking: ${text} - Expected URL: ${expectedUrl}`);

    await link.click();

    //verifikation - url
    const actualUrl = page.url();
    if (actualUrl !== expectedUrl) {
        throw new Error(`Error: Expected URL: ${expectedUrl}, but got: ${actualUrl}`);
    }

    //verification - titel
    const pageTitle = (await page.locator('h1').textContent())?.trim() || "";
    if (pageTitle !== text) {
        throw new Error(`Error: Expected title: "${text}", but got: "${pageTitle}"`);
    }

}

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

        //back to the prev. page
        await page.goBack();
    }
}