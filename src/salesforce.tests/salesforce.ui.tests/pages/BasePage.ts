import { Page, Locator } from "@playwright/test";

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    abstract get url(): string;

    async navigateTo(): Promise<void> {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    }
    
    protected get header(): Locator {
        return this.page.getByRole('banner');
    }

    protected get footer(): Locator {
        return this.page.locator('footer');
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitUntil(timeout: number): Promise<void> {
        await this.page.waitForTimeout(timeout);
    }

    async pressKeyboard(key: string): Promise<void> {
        await this.page.keyboard.press(key);
    }

    async refreshPage(): Promise<void> {
        await this.page.reload({ waitUntil: 'domcontentloaded' });
    }
}

