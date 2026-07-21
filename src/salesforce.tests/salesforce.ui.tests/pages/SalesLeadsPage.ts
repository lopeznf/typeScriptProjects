import { Page, Locator } from "@playwright/test";
import { SalesPage } from "./SalesPage";

export class SalesLeadsPage extends SalesPage {
    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return "https://orgfarm-78fa3008fa-dev-ed.develop.lightning.force.com/lightning/o/Lead/home";
    }

    get newLeadButton(): Locator {
        return this.page.locator('button[name="New"]');
    }

    async clickNewLeadButton(): Promise<void> {
        await this.newLeadButton.click();
    }
}