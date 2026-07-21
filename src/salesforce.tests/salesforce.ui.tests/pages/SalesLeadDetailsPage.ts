import { Page, Locator } from "@playwright/test";
import { SalesPage } from "./SalesPage";

export class SalesLeadDetailsPage extends SalesPage {
    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return "https://orgfarm-78fa3008fa-dev-ed.develop.lightning.force.com/lightning/r/Lead/";
    }

    get leadMenuButton(): Locator {
        return this.page.locator(
            'lightning-button-menu[data-target-reveals="sfdc:StandardButton.Lead.Clone,sfdc:StandardButton.Lead.XClean,sfdc:StandardButton.Lead.Delete,sfdc:StandardButton.Lead.Share,sfdc:StandardButton.Lead.Edit,sfdc:StandardButton.Lead.ChangeOwnerOne,sfdc:StandardButton.Lead.Convert"]');
    }

    leadMenuOption({ optionName }: { optionName: string; }): Locator {
        return this.page.locator(`lightning-menu-item[data-target-selection-name="${optionName}"]`);
    }

    leadStatusButton(leadStatus: string): Locator {
        return this.page.locator(`a[role="option"][title="${leadStatus}"]`);
    }

    finalizeLeadStatusButton(finalizeStatus: string): Locator {
        return this.page.locator('span[text()="' + finalizeStatus + '"]');
    }

    async isUniqueSalesLeadIdCreated(): Promise<boolean> {  
        const currentUrl = this.page.url();
        const leadId = currentUrl.slice(-18);      
        if (leadId && leadId.startsWith("0")) {
            console.log(`Unique Sales Lead ID created: ${leadId}`);
            return true;
        }
        else {
            console.log(`Unique Sales Lead ID not created. Current URL: ${currentUrl}`);
            return false;
        }
    }

    async clickLeadStatusButton(leadStatus: string): Promise<void> {
        await this.leadStatusButton(leadStatus).click();
    }

    async clickFinalizeLeadStatusButton(finalizeStatus: string): Promise<void> {
        this.finalizeLeadStatusButton(finalizeStatus);
    }

    async clickLeadMenuOption(leadMenuOption: string) {
        this.leadMenuButton.click();
        this.leadMenuOption({optionName: leadMenuOption}).click();
    }
}