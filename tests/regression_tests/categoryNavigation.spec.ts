import test, { expect, Locator, Page } from "@playwright/test";
import { callUrl } from "../utils/url";
import category from "../data/category.json"
import { CategoryNavigationPage, clickAllMenuItems } from "../pages/categoryNavigationPage";

//Verify the names in the category list
test('Category List: Verify category list', async ({ page }) => {
    const categoryPage = new CategoryNavigationPage(page)
    await callUrl(page)

    const locator = await categoryPage.getMenuItems();
    const items = await locator.allTextContents();

    //verify length
    expect((await items).length).toBe(category.categoryListLength);
    console.log("Expected category number: ", category.categoryListLength, "Actual: ", (await items).length)

    //verify names
    const allMenuItemNameMatch = (await items).every((item, index) => {
        // console.log("item: ", item, "category:", category.categoryNames[index].name)
        return item.trim() == category.categoryNames[index].name

    })
    expect(allMenuItemNameMatch).toBe(true)
})


//Open and Verify menu items (titel and URL)
test('Category List: Verify URL And Titel', async ({ page }) => {
    await callUrl(page);
    await clickAllMenuItems(page);
});



