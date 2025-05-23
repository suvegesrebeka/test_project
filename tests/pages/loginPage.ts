import { expect, Page } from '@playwright/test';
import { User } from '../utils/user';
import environment from '../data/environment.json'

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    //Call the login URL
    async callLoginUrl() {
        await this.page.goto(`${environment.baseUrl}/${environment.login}`);
    }

    //Fill and submit the login form  
    async loginProcess(user: User) {
        await this.page.fill('#Email', user.email);
        await this.page.fill('#Password', user.password);

        await this.page.getByRole('button', { name: 'Log in' }).click();
    }

    //Verification of the login
    async loginVerification(user) {
        await this.page.waitForSelector('a[href="/customer/info"]');
        await expect(this.page.getByRole('link', { name: `${user.email}` })).toHaveText(user.email)
    }

    //positive login process
    async login(user) {
        await this.callLoginUrl()
        await this.loginProcess(user)
        await this.loginVerification(user)
    }

}