import { test, expect } from '@playwright/test';
import { login } from '../utils/auth';
import environment from '../config/environment.json'
import { validUser } from '../utils/interfaces';


test('Basic login function', async ({ page }) => {
    await login(page, `${environment.baseUrl}/login`, validUser)
})