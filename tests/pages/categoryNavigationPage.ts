import { expect, Locator, Page } from "@playwright/test";
import environment from '../data/environment.json'



export class CategoryNavigationPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getMenuItems() {
        return await this.page.locator('.block-category-navigation .list li a');
    }
    async verifyAndClick(page: Page, menuItem: Locator) {
        const mennuText = (await menuItem.textContent())?.trim() || "";
        const href = (await menuItem.getAttribute('href')) || "";
        const expectedUrl = `${environment.baseUrl}${href}`;

        await menuItem.click();

        //verifikation - url
        const actualUrl = page.url();
        // console.log("ExpectedURL:", expectedUrl, "ActualURL:", actualUrl)
        expect(actualUrl).toBe(expectedUrl)

        //verification - titel
        const pageTitle = (await page.locator('h1'));
        // console.log("ExpectedURL:", await pageTitle.innerText(), "ActualURL:", mennuText)

        await expect(pageTitle).toHaveText(mennuText);


    }

    async clickAllMenuItems(page: Page) {
        const locator = await this.getMenuItems();
        const mainMenuItems = locator.all();

        for (const menuItem of await mainMenuItems) {
            await this.verifyAndClick(this.page, menuItem);


            const subMenuItems = await this.page.locator('.block-category-navigation .sublist > li > a').all();

            //handle submenus, if they exist
            for (const subItem of subMenuItems) {
                await this.verifyAndClick(this.page, subItem);
                await this.page.goBack();
            }

            await this.page.goBack();
        }

    }
}
