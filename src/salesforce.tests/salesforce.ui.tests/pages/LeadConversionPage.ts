import { Page, Locator } from "@playwright/test";

export class LeadConversionPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get activityTab(): Locator {
        return this.page.locator('a[id="activityTab__item"]');
    }

    get detailsTab(): Locator {
        return this.page.locator('a[id="detailTab__item"]');
    }
    
    get opportunityOwnerLink(): Locator {
        return this.page.locator('a[id="window"]');
    }

    get chatterTab(): Locator {
        return this.page.locator('a[id="collaborateTab__item"]');
    }

    async clickActivityTab(): Promise<void> {
        await this.activityTab.click();
    }
    
    async clickDetailsTab(): Promise<void> {
        await this.detailsTab.click();
    }
    
    async clickChatterTab(): Promise<void> {
        await this.chatterTab.click();
    }


}