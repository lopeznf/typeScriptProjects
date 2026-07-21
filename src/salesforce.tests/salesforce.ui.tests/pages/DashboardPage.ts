import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }  
        
    get url(): string {
        return "https://orgfarm-78fa3008fa-dev-ed.develop.lightning.force.com/lightning";
    }

    get globalSearchBar(): Locator {
        return this.page.locator('input[type="search"]');
    }

    get viewProfileIcon(): Locator {
        return this.page.locator('img[alt="user"]')
    }

    get loggedInUserLink(): Locator {
        return this.page.locator('a[text()="Gel Laro"]');
    }

    get appLauncherButton(): Locator {
        return this.page.locator('button[title="App Launcher"]');
    }

    get appLauncherSearchInput(): Locator {
        return this.page.getByPlaceholder('Search apps and items...');
    }

    get salesAppMenuItem(): Locator {
        return this.page.locator('a[id="07pdL000005kD7fQAE"]');
    }

    async isGlobalSearchBarVisible(): Promise<boolean> {
        return await this.globalSearchBar.isVisible();
    }

    async clickViewProfileIcon(): Promise<void> {
        await this.viewProfileIcon.click();
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