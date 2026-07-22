import { Page, Locator } from "@playwright/test";

export class ConvertLeadPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get createNewAccountOption(): Locator {
        return this.page.locator('input[type="radio"][name^="Account"]');
    }

    private get newAccountNameInput(): Locator {
        const createNewAccountOptionElementId = this.createNewAccountOption.getAttribute("id");
        return this.page.locator(`input[type="text"][id="${createNewAccountOptionElementId}"]`);
    }

    private get createNewContactOption(): Locator {
        return this.page.locator('input[type="radio"][name^="Contact"]');
    }

    private newContactButton(contactName: string): Locator {
        return this.page.locator('button[type="button"][title*="${contactName}"]');
    }

    private get convertButton(): Locator {
        return this.page.locator('//button[text()="Convert"]');
    }
    
    private get cancelButton(): Locator {
        return this.page.locator('//button[text()="Cancel"]');
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

    async clickConvertButton(): Promise<void> {
        await this.convertButton.click();
    }
    
    async clickCancelButton(): Promise<void> {
        await this.cancelButton.click();
    }
}