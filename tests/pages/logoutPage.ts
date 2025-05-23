import { expect, Page } from "@playwright/test";

export class LogoutPage {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }
    //Logout
    async logout() {
        await expect(this.page.getByRole('link', { name: 'Log out' })).toBeVisible()
        await this.page.getByRole('link', { name: 'Log out' }).click();
    }
}