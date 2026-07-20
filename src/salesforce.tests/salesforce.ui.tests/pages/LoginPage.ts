import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return "https://orgfarm-78fa3008fa-dev-ed.develop.my.salesforce.com"
    }

    get usernameInput(): Locator {
        return this.page.locator('input[id="username"]');
    }

    get passwordInput(): Locator {
        return this.page.locator('input[id="password"]');
    }

    get loginButton(): Locator {
        return this.page.locator('input[id="Login"]');
    }

    get errorMessage(): Locator {
        return this.page.locator('div[id="error"]');
    }

    get rememberMeCheckbox(): Locator {
        return this.page.locator('input[id="rememberUn"]');
    }

    get forgotPasswordLink(): Locator {
        return this.page.locator('a[id="forgot_password_link"]');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginWithRememberMe(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.rememberMeCheckbox.check();
        await this.loginButton.click();
    }

    async loginWithForgotPassword(username: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.forgotPasswordLink.click();
    }

    async isErrorMessageDisplayed(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    async isExpectedErrorMessageDisplayed(expectedMessage: string): Promise<boolean> {
        const actualMessage = await this.errorMessage.textContent();
        return actualMessage?.trim() === expectedMessage;
    }

    async isRememberMeChecked(): Promise<boolean> {
        return await this.rememberMeCheckbox.isChecked();
    }
}