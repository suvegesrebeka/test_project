import test, { expect } from "@playwright/test";
import { callUrl } from "../utils/url";
import { validUser } from "../utils/user";
import { clearCart } from "../utils/clearCar";
import { LoginPage } from "../pages/loginPage";

//Positive test:Purchase - Buy a book 
test.skip("purchase: buy a book", async ({ page }) => {

    //init - login and clear the cart
    const loginPage = new LoginPage(page)
    await loginPage.login(validUser)
    await clearCart(page);
    await callUrl(page)

    //Select first book
    await page.getByRole('link', { name: 'Books' }).nth(1).click()
    const productName = await page.getByRole('link', { name: 'Computing and Internet', exact: true }).textContent() || ""
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    console.log("productName: ", productName)

    //Navigate to shopping cart and verify the name of the product
    await page.click('a[href="/cart"]');
    await page.locator('h1', { hasText: 'Shopping cart' }).waitFor();
    const cartProductName = await page.getByRole('link', { name: 'Computing and Internet' }).textContent()
    console.log("cartname: ", cartProductName)
    expect(cartProductName).toBe(productName)

    //Select country & terms and checkout
    await page.getByLabel('Country:').selectOption("Hungary");
    // console.log("Selected country:", countrySelect);
    await page.check("#termsofservice")
    await page.locator('button[type="submit"]').click();
    // console.log(await page.url());

    //Fill address
    await page.locator("#billing-address-select").selectOption("")
    await page.getByRole('textbox', { name: 'First Name:' }).fill('Barka');
    await page.getByRole('textbox', { name: 'Last Name:' }).fill('Virag');
    await page.getByRole('textbox', { name: 'Email:' }).fill('barkavirag@gmail.com');
    await page.getByLabel('Country:').selectOption("Hungary");
    await page.getByRole('textbox', { name: 'City:' }).fill('Budapest');
    await page.getByRole('textbox', { name: 'Address 1:' }).fill('Maxmustermann strasse 1');
    await page.getByRole('textbox', { name: 'Zip / postal code:' }).fill('6300');
    await page.getByRole('textbox', { name: 'Phone number:' }).fill('+36202345678');
    await page.getByRole('button', { name: "Continue" }).click()


    // await page.locator("(//span[normalize-space()='Sub-Total:'])[1]").textContent()
    await page.locator('#billing-address-select').selectOption({ index: 0 });
    await page.getByRole('button', { name: "Continue" }).click()



})
