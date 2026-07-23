import { Page, Locator } from "@playwright/test";
import { DashboardPage } from './DashboardPage';

export class SearchResultsPage extends DashboardPage {
    constructor(page: Page) {
        super(page);
    }

    private searchRecordLink(recordName: string): Locator {
        return this.page.locator('//a[text(), "' + recordName + '"]');
    }

    private searchRecordText(recordName: string): Locator {
        return this.page.locator('//span[text(), "' + recordName + '"]');
    }

    async clickSearchRecordLink(recordName: string): Promise<void> {
        await this.searchRecordLink(recordName).click();
    }

    async isSearchRecordLinkVisible(recordName: string): Promise<boolean> {
        return this.searchRecordLink(recordName).isVisible();
    }
    
    async isSearchRecordTextVisible(recordName: string): Promise<boolean> {
        return this.searchRecordText(recordName).isVisible();
    }
}