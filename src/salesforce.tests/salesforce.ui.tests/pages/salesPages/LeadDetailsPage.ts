import { Page, Locator } from "@playwright/test";
import { SalesPage } from "../SalesPage";

export class LeadDetailsPage extends SalesPage {
    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return this.page.url();
    }

    private leadId(currentUrl: string): string {        
        return currentUrl.slice(-18);      
    }

    private get leadMenuButton(): Locator {
        return this.page.locator(
            'lightning-button-menu[data-target-reveals="sfdc:StandardButton.Lead.Clone,sfdc:StandardButton.Lead.XClean,sfdc:StandardButton.Lead.Delete,sfdc:StandardButton.Lead.Share,sfdc:StandardButton.Lead.Edit,sfdc:StandardButton.Lead.ChangeOwnerOne,sfdc:StandardButton.Lead.Convert"]');
    }

    private leadMenuOption({ optionName }: { optionName: string; }): Locator {
        return this.page.locator(`lightning-menu-item[data-target-selection-name="${optionName}"]`);
    }

    private leadStatusButton(leadStatus: string): Locator {
        return this.page.locator(`a[role="option"][title="${leadStatus}"]`);
    }

    async isUniqueLeadIdCreated(): Promise<boolean> {  
        const uniqueLeadId = this.leadId(this.url);
        if (uniqueLeadId && uniqueLeadId.startsWith("0")) {
            console.log(`Unique Sales Lead ID created: ${uniqueLeadId}`);
            return true;
        }
        else {
            console.log(`Unique Sales Lead ID not created. Current URL: ${this.url}`);
            return false;
        }
    }

    async clickLeadStatusButton(leadStatus: string): Promise<void> {
        await this.leadStatusButton(leadStatus).click();
    }

    async clickFinalizeLeadStatusButton(): Promise<void> {        
        await this.pressKeyboard('Tab');     
        await this.pressKeyboard('Enter'); 
    }

    async isLeadStatusFinalized(leadStatus: string): Promise<boolean> {
        const isLeadStatusButtonSelected = await this.leadStatusButton(leadStatus).getAttribute('aria-selected');
        if(isLeadStatusButtonSelected) {
            return true;
        }
        return false;
    }

    async clickLeadMenuOption(leadMenuOption: string) {
        await this.leadMenuButton.click();
        await this.leadMenuOption({optionName: leadMenuOption}).click();
    }
}