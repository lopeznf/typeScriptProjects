import { Page, Locator } from "@playwright/test";
import { SalesPage } from "../SalesPage";
import { promises } from "node:dns";

export class OpportunityInfoPage extends SalesPage{
    constructor(page: Page) {
        super(page);
    }

    private stageButton(stage: string) {
        return this.page.locator(`a[role="option"][title="${stage}"]`);
    }
    
    private get accountNameLink(): Locator {
        return this.page.locator('//a[contains(href, "lightning/r/Account")][class="slds-truncate"]');
    }

    private get opportunityOwnerLink(): Locator {
        return this.page.locator('//a[contains(href, "lightning/r/User")][id="window"]');
    }

    private get activityTab(): Locator {
        return this.page.locator('a[id="activityTab__item"]');
    }

    private get detailsTab(): Locator {
        return this.page.locator('a[id="detailTab__item"]');
    }

    private get editAccountNameIcon(): Locator {
        return this.page.locator('button[title="Edit Account Name"]');
    }

    private contactLink(contactName: string): Locator {
        return this.page.locator('a[text(), "' + contactName + '"]')
    }

    private accountNameInput(accountName: string): Locator {
        return this.page.locator('input[data-value="' + accountName 
            + '"][contains(id, "combobox-input-")]');
    }
    
    private get chatterTab(): Locator {
        return this.page.locator('a[id="collaborateTab__item"]');
    }

    async getOwnerUrl(): Promise<string> {
        const ownerUrl = await this.opportunityOwnerLink.getAttribute('href');
        return ownerUrl ?? '';
    }

    async isStageAsExpected(stage: string): Promise<boolean> {
        const isStageSelected = await this.stageButton(stage).getAttribute('aria-selected');
        if(isStageSelected) {
            return true;
        }
        return false;
    }

    async clickActivityTab(): Promise<void> {
        await this.activityTab.click();
    }
    
    async clickDetailsTab(): Promise<void> {
        await this.detailsTab.click();
    }

    async clickEditAccountName(): Promise<void> {
        await this.editAccountNameIcon.click();
    }

    async isAccountNameInputVisible(accountName: string): Promise<boolean> {
        return this.accountNameInput(accountName).isVisible();
    }

    async isContactLinkVisible(contactName: string): Promise<boolean> {
        return this.contactLink(contactName).isVisible();
    }
    
    async clickChatterTab(): Promise<void> {
        await this.chatterTab.click();
    }    
}