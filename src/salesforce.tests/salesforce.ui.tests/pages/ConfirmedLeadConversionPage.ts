import { Page, Locator } from "@playwright/test";

export class ConfirmedLeadConversionPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    accountNameLink(accountName: string): Locator {
        return this.page.locator('a[title="${accountName}"]');
    }

    contactNameLink(contactName: string): Locator {
        return this.page.locator('a[title*="${contactName}"]');
    }

    opportunityNameLink(opportunityName: string): Locator {
        return this.page.locator('a[title="${opportunityName}-"]');
    }

    opportunityAccountNameLink(accountName: string): Locator {
        return this.page.locator('a[title="${accountName}"][target="_blank"]');
    }

    async isContactCreated(contactName: string): Promise<boolean> {
        if(this.contactNameLink(contactName)) {
            return true;
        }
        return false;
    }

    async isOpportunityCreated(accountName: string): Promise<boolean> {
        if(this.opportunityNameLink(accountName)) {
            return true;
        }
        return false;
    }

    async clickOpportunityNameLink(accountName: string): Promise<void> {
        await this.opportunityNameLink(accountName).click();
    }

    async isOpportunityAccountNameSame(accountName: string): Promise<boolean> {
        if(this.accountNameLink(accountName)) {
            if(this.opportunityAccountNameLink(accountName)) {
                return true;
            }
        }
        return false;
    }
}