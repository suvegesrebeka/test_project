import test, { expect } from "@playwright/test";
import { callUrl } from "../utils/url";
import category from "../fixtures/category.json"


//Verify the visiblity of category table
test('Category table - Visiblity of table', async ({ page }) => {
    await callUrl(page, "books")
    await expect(page.locator(".category-page")).toBeVisible()
})

//Verify the names of the sorting list
test('Category table - Verification of sort list names ', async ({ page }) => {
    await callUrl(page, "books")
    const sortInput = await page.locator('#products-orderby');
    const count = await sortInput.locator('option').count();
    console.log(count);



    for (let i = 1; i < count; i++) {
        const option = sortInput.locator('option').nth(i)
        await expect(option).toHaveText(category.categorySortoptions[i].name)
        console.log("option:", option, "expected text:", category.categorySortoptions[i].name)
    }

})

//Verify the functionality of sorting - Name A-Z & Z-A
test.describe('Category table: Sorting test - Name A-Z and Z-A', () => {
    test.beforeEach(async ({ page }) => {
    });

    test('should sort books correctly by Name: A to Z', async ({ page }) => {
        for (let categoryUrl of category.categoryUrl) {
            await page.goto(`https://demowebshop.tricentis.com/${categoryUrl.url}?orderby=${category.categorySortoptions[0].orderBy}`);


            const titles = await page.locator('.product-item .product-title a').allInnerTexts();

            const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
            console.log("ASC", categoryUrl.url, titles, sortedTitles)
            expect(titles).toEqual(sortedTitles);
        }
    });

    test('should sort books correctly by Name: Z to A', async ({ page }) => {
        for (let categoryUrl of category.categoryUrl) {
            await page.goto(`https://demowebshop.tricentis.com/${categoryUrl.url}?orderby=${category.categorySortoptions[1].orderBy}`);


            const titles = await page.locator('.product-item .product-title a').allInnerTexts();

            const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));
            console.log("DESC", categoryUrl.url, titles, sortedTitles)

            expect(titles).toEqual(sortedTitles);
        }
    });
});