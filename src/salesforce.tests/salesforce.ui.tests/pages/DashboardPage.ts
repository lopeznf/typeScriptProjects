import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }  
        
    get url(): string {
        return "https://orgfarm-78fa3008fa-dev-ed.develop.lightning.force.com/lightning";
    }


    private get globalSearchButton(): Locator {
        return this.page.locator('button[type="button"][aria-label="Search"]');
    }

    private get globalSearchBar(): Locator {
        return this.page.locator('input[type="search"]');
    }

    private get globalSearchTypeDropdown(): Locator {
        return this.page.locator('input[type="text"][aria-label="Search by object type"]');
    }

    private get viewProfileIcon(): Locator {
        return this.page.locator('img[alt="user"]')
    }

    private get loggedInUserLink(): Locator {
        return this.page.locator('//a[contains(href, "lightning/r/User")][class="profile-link-label"]');
    }

    private get appLauncherButton(): Locator {
        return this.page.locator('button[title="App Launcher"]');
    }

    private get appLauncherSearchInput(): Locator {
        return this.page.getByPlaceholder('Search apps and items...');
    }

    private get salesAppMenuItem(): Locator {
        return this.page.locator('a[id="07pdL000005kD7fQAE"]');
    }

    async searchRecord(searchItem: string, recordType: string): Promise<void> {
        await this.globalSearchButton.click();
        await this.globalSearchTypeDropdown.fill(recordType);
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Tab');
        await this.globalSearchBar.fill(searchItem);
        await this.page.keyboard.press('Enter');
        await this.waitForPageLoad();
    }

    async isGlobalSearchBarVisible(): Promise<boolean> {
        return await this.globalSearchBar.isVisible();
    }

    async clickViewProfileIcon(): Promise<void> {
        await this.viewProfileIcon.click();
    }

    async getUserUrl(): Promise<string> {
        const userUrl = await this.loggedInUserLink.getAttribute('href');
        return userUrl ?? '';
    }

    async isAppLauncherButtonVisible(): Promise<boolean> {
        return await this.appLauncherButton.isVisible();
    }

    async clickAppLauncherButton(): Promise<void> {
        await this.appLauncherButton.click();
    }

    async searchInAppLauncher(searchTerm: string): Promise<void> {
        await this.appLauncherSearchInput.fill(searchTerm);
    }

    async clickSalesAppMenuItem(): Promise<void> {
        await this.salesAppMenuItem.click();
    }
}