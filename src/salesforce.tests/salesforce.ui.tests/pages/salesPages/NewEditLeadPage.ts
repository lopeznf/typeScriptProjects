import { Page, Locator } from "@playwright/test";

export class NewEditLeadPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get phoneInput(): Locator {
        return this.page.locator('input[name="Phone"');
    }

    private get salutationDropdown(): Locator {
        return this.page.locator('button[name="salutation"]');
    }

    private get firstNameInput(): Locator {
        return this.page.locator('input[name="firstName"]');
    }
    
    private get lastNameInput(): Locator {
        return this.page.locator('input[name="lastName"]');
    }
    
    private get companyInput(): Locator {
        return this.page.locator('input[name="Company"]');
    }

    private get leadSourceDropdown(): Locator {
        return this.page.locator('button[aria-label="Lead Source"]');
    }

    private get leadStatusDropdown(): Locator {
        return this.page.locator('button[aria-label="Lead Status"]');
    }    

    private leadDropdownOption({ leadOption }: { leadOption: string; }): Locator {
        return this.page.locator(`lightning-base-combobox-item[role="option"][data-value="${leadOption}"]`);
    }

    get saveEditButton(): Locator {
        return this.page.locator('button[name="SaveEdit"]');
    }

    async createNewLead(firstName: string, lastName: string, company: string, leadSource = '--None--'): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.companyInput.fill(company);
        await this.leadSourceDropdown.click();
        await this.leadDropdownOption({ leadOption: leadSource }).click();
        await this.saveEditButton.click();
    }

    async selectLeadStatus(leadStatus: string): Promise<void> {
        await this.leadStatusDropdown.click();
        await this.leadDropdownOption({ leadOption: leadStatus }).click();
    }
}