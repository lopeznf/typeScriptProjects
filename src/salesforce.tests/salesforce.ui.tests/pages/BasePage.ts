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
    
    get header(): Locator {
        return this.page.getByRole('banner');
    }

    get footer(): Locator {
        return this.page.locator('footer');
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async refreshPage(): Promise<void> {
        await this.page.reload({ waitUntil: 'networkidle' });
    }
}

