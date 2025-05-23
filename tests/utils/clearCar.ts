import { Page } from '@playwright/test';
import { callUrl } from './url';

export async function clearCart(page: Page) {
    // Nyisd meg a kosár oldalt
    await callUrl(page, "cart")

    // car is empty checker
    const emptyCartText = await page.locator('div.order-summary-content').innerText().catch(() => "");
    if (emptyCartText.includes("Your Shopping Cart is empty!")) {
        console.log("Kosár már üres.");
        return;
    }

    //clear the car
    const removeCheckboxes = page.locator('input[name^="removefromcart"]');
    const count = await removeCheckboxes.count();

    for (let i = 0; i < count; i++) {
        const checkbox = removeCheckboxes.nth(i);
        if (!(await checkbox.isChecked())) {
            await checkbox.check();
        }
    }

    //update the shopping cart
    await page.click('input[name="updatecart"]');

    // waiting for the empty cart text
    await page.waitForSelector('div.order-summary-content:has-text("Your Shopping Cart is empty!")', { timeout: 5000 });
    console.log("Kosár sikeresen kiürítve.");
}
