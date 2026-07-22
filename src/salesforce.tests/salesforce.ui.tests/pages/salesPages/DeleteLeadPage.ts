import { Page, Locator } from "@playwright/test";

export class DeleteLeadPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get deleteButton(): Locator {
        return this.page.locator('button[title="Delete"]');
    }

    private get cancelButton(): Locator {
        return this.page.locator('button[title="Cancel"]');
    }

    async confirmLeadDeletion(): Promise<void> {
        await this.deleteButton.click();
    }

    async cancelLeadDeletion(): Promise<void> {
        await this.cancelButton.click();
    }
}