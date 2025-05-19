import { test } from '@playwright/test';
import { validUser } from '../utils/user';
import { callLoginUrl, loginProcess, loginVerification } from '../pages/loginPage'

test('Login: Basic login function', async ({ page }) => {
    await callLoginUrl(page)
    await loginProcess(page, validUser)
    await loginVerification(page, validUser)
})