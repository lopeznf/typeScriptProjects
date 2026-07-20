import { Page, Locator } from "@playwright/test";
import { DashboardPage } from '../pages/DashboardPage';

export class SalesPage extends DashboardPage {
    constructor(page: Page) {
        super(page);
    }

    get appLabel(): Locator {
        return this.page.getByTitle('Sales');
    }

    async isAppLabelVisible(): Promise<boolean> {
        return await this.appLabel.isVisible();
    }
}