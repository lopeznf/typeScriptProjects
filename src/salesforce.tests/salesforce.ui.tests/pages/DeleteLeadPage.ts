import { Page, Locator } from "@playwright/test";

export class DeleteLeadPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get deleteButton(): Locator {
        return this.page.locator('button[title="Delete"]');
    }

    get cancelButton(): Locator {
        return this.page.locator('button[title="Cancel"]');
    }

    async confirmLeadDeletion(): Promise<void> {
        this.deleteButton.click();
    }

    async cancelLeadDeletion(): Promise<void> {
        this.cancelButton.click();
    }
}