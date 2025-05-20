import test, { expect } from "@playwright/test";
import { callUrl } from "../utils/url";
import category from "../data/category.json"


//Verify the visiblity of category table
test('Category table - Visiblity of table', async ({ page }) => {
    await callUrl(page, "books")
    await expect(page.locator(".category-page")).toBeVisible()
})

//Verify the names of the sorting list
test('Category table - Verification of sort list names ', async ({ page }) => {
    await callUrl(page, "books")
    const sortInput = page.locator('#products-orderby');
    const count = await sortInput.locator('option').count();

    for (let i = 1; i < count; i++) {
        const option = sortInput.locator('option').nth(i)
        await expect(option).toHaveText(category.categorySortoptions[i].name)
        // console.log("option:", option, "expected text:", category.categorySortoptions[i].name)
    }

})

//Verify the functionality of sorting by name
test.describe('Category table: Sorting test - Name A-Z and Z-A', () => {
    test.beforeEach(async ({ page }) => {
    });

    test('Name: A to Z', async ({ page }) => {
        for (let categoryUrl of category.categoryUrl) {
            await page.goto(`https://demowebshop.tricentis.com/${categoryUrl.url}?orderby=${category.categorySortoptions[0].orderBy}`);


            const titles = await page.locator('.product-item .product-title a').allInnerTexts();

            const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
            // console.log("ASC", categoryUrl.url, titles, sortedTitles)
            expect(titles).toEqual(sortedTitles);
        }
    });

    test('Name: Z to A', async ({ page }) => {
        for (let categoryUrl of category.categoryUrl) {
            await page.goto(`https://demowebshop.tricentis.com/${categoryUrl.url}?orderby=${category.categorySortoptions[1].orderBy}`);


            const titles = await page.locator('.product-item .product-title a').allInnerTexts();

            const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));
            // console.log("DESC", categoryUrl.url, titles, sortedTitles)

            expect(titles).toEqual(sortedTitles);
        }
    });
});


//!Error on the Page! Verify the functionality of sorting by prices
test.describe('Books sorting tests - Price Low to High and High to Low', () => {

    test('should sort books correctly by Price: Low to High', async ({ page }) => {
        for (let categoryUrl of category.categoryUrl) {
            await page.goto(`https://demowebshop.tricentis.com/${categoryUrl.url}?orderby=${category.categorySortoptions[2].orderBy}`);

            const priceLocators = page.locator('.product-item .prices .actual-price');
            const count = await priceLocators.count();

            //array of prices
            const pricesRaw: string[] = [];
            for (let i = 0; i < count; i++) {
                const text = await priceLocators.nth(i).textContent() || '';
                pricesRaw.push(text.trim());
            }

            // console.log('Prices from page (string):', pricesRaw);

            // parser string->float
            const pricesNumeric = pricesRaw.map(p => {
                const match = p.match(/(\d+(\.\d+)?)/);
                return match ? parseFloat(match[0]) : null;
            }).filter((p): p is number => p !== null);


            const sortedPrices = [...pricesNumeric].sort((a, b) => a - b);

            // console.log('Expected sorted prices (Low to High):', sortedPrices,pricesNumeric);

            expect(pricesNumeric).toEqual(sortedPrices);
        }
    });

    test('should sort books correctly by Price: High to Low', async ({ page }) => {
        for (let categoryUrl of category.categoryUrl) {
            await page.goto(`https://demowebshop.tricentis.com/${categoryUrl.url}?orderby=${category.categorySortoptions[3].orderBy}`);

            const priceLocators = page.locator('.product-item .prices .actual-price');
            const count = await priceLocators.count();

            //array of prices
            const pricesRaw: string[] = [];
            for (let i = 0; i < count; i++) {
                const text = await priceLocators.nth(i).textContent() || '';
                pricesRaw.push(text.trim());
            }

            // console.log('Prices from page (string):', pricesRaw);

            //parser string->float
            const pricesNumeric = pricesRaw.map(p => {
                const match = p.match(/(\d+(\.\d+)?)/);
                return match ? parseFloat(match[0]) : null;
            }).filter((p): p is number => p !== null);


            const sortedPrices = [...pricesNumeric].sort((a, b) => b - a);

            // console.log('Expected sorted prices (high to low):', sortedPrices, pricesNumeric);

            expect(pricesNumeric).toEqual(sortedPrices);

        }
    });
});