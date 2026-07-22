import { Page, Locator } from "@playwright/test";

export class ConfirmedLeadConversionPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private accountNameLink(accountName: string): Locator {
        return this.page.locator('a[title="' + accountName 
            + '"][class=" outputLookupLink slds-truncate outputLookupLink-001dL00002Mz0ewQAB-105:3928;a forceOutputLookup"]');
    }

    private contactNameLink(contactName: string): Locator {
        return this.page.locator('a[title*="' + contactName + '"]');
    }

    private opportunityNameLink(opportunityName: string): Locator {
        return this.page.locator('a[title="' + opportunityName + '-"]');
    }

    private opportunityAccountNameLink(accountName: string): Locator {
        return this.page.locator('a[title="' + accountName 
            + '][class=" outputLookupLink slds-truncate outputLookupLink-001dL00002Mz0ewQAB-5:3934;a forceOutputLookup"]');
    }

    private get goToLeadsButton(): Locator {
        return this.page.locator('//button[text()="Go to Leads"]');
    }

    async isContactCreated(contactName: string): Promise<boolean> {
        return await this.contactNameLink(contactName).isVisible();
    }

    async isOpportunityCreated(accountName: string): Promise<boolean> {
        await this.page.waitForLoadState('domcontentloaded');
        return await this.opportunityNameLink(accountName).isVisible();
    }

    async clickOpportunityNameLink(accountName: string): Promise<void> {
        await this.opportunityNameLink(accountName).click();
    }

    async isAccountNameSameInOpportunityDetails(accountName: string): Promise<boolean> {        
        const accountNameTitle = await this.accountNameLink(accountName).getAttribute('title');
        const opportunityAccountNameTitle = await this.opportunityAccountNameLink(accountName).getAttribute('title');
        if(accountNameTitle === opportunityAccountNameTitle) {
            return true;
        }
        return false;
    }
    
    async clickGoToLeadsButton(): Promise<void> {
        await this.goToLeadsButton.click();
    }
}