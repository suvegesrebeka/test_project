import { test } from '@playwright/test';
import { validUser } from '../utils/user';
import { LoginPage } from '../pages/loginPage'

//Login: login with invalid user
test('Login: Basic login function', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login(validUser)
})