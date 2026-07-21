import { Page, Locator } from "@playwright/test";

export class NewSalesLeadPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get phoneInput(): Locator {
        return this.page.locator('input[name="Phone"');
    }

    get salutationDropdown(): Locator {
        return this.page.locator('button[name="salutation"]');
    }

    get firstNameInput(): Locator {
        return this.page.locator('input[name="firstName"]');
    }
    
    get lastNameInput(): Locator {
        return this.page.locator('input[name="lastName"]');
    }
    
    get companyInput(): Locator {
        return this.page.locator('input[name="Company"]');
    }

    get leadSourceDropdown(): Locator {
        return this.page.locator('button[aria-label="Lead Source"]');
    }

    get leadStatusDropdown(): Locator {
        return this.page.locator('button[aria-label="Lead Status"]');
    }    

    leadDropdownOption({ leadOption }: { leadOption: string; }): Locator {
        return this.page.locator(`lightning-base-combobox-item[role="option"][data-value="${leadOption}"]`);
    }

    get saveEditButton(): Locator {
        return this.page.locator('button[name="SaveEdit"]');
    }

    async createNewLead(firstName: string, lastName: string, company: string, leadSource = '--None--'): Promise<void> {
        this.firstNameInput.fill(firstName);
        this.lastNameInput.fill(lastName);
        this.companyInput.fill(company);
        await this.leadSourceDropdown.click();
        await this.leadDropdownOption({ leadOption: leadSource }).click();
        await this.saveEditButton.click();
    }

    async selectLeadStatus(leadStatus: string): Promise<void> {
        await this.leadStatusDropdown.click();
        await this.leadDropdownOption({ leadOption: leadStatus }).click();
    }
}