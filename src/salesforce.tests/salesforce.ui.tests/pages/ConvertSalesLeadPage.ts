import { Page, Locator } from "@playwright/test";

export class ConvertSalesLeadPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get createNewAccountOption(): Locator {
        return this.page.locator('input[type="radio"][name^="Account"]');
    }

    get newAccountNameInput(): Locator {
        const createNewAccountOptionElementId = this.createNewAccountOption.getAttribute("id");
        return this.page.locator(`input[type="text"][id="${createNewAccountOptionElementId}"]`);
    }

    get createNewContactOption(): Locator {
        return this.page.locator('input[type="radio"][name^="Contact"]');
    }

    newContactButton(contactName: string): Locator {
        return this.page.locator('button[type="button"][title*="${contactName}"]');
    }

    get convertButton(): Locator {
        return this.page.getByText('Convert');
    }
    
    get cancelButton(): Locator {
        return this.page.getByText('Cancel');
    }

    async clickCreateNewAccountOption(): Promise<void> {
        await this.createNewAccountOption.click();
    }

    async fillNewAccountNameInputEmpty(accountName: string): Promise<void> {
        await this.newAccountNameInput.fill(accountName);
    }

    async clickCreateNewContactOption(): Promise<void> {
        await this.createNewContactOption.click();        
    }

    async clickNewContactButton(contactName: string): Promise<void> {
        await this.newContactButton(contactName).click();
    }
}