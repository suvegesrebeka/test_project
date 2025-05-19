import { Page } from "@playwright/test";
import environment from '../data/environment.json'


//Call the login URL
export async function callUrl(page: Page, path: string = "") {
    await page.goto(`${environment.baseUrl}/${path}`);
}
