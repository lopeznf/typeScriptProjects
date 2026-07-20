import { test, expect } from '@playwright/test';
import { SalesPage } from '../pages/SalesPage';

const STORAGE_STATE_PATH = 'tests/.auth/user.json';

test.use({ storageState: STORAGE_STATE_PATH }); // Use saved session

test.describe('Dashboard Tests', () => {
    let salesPage: SalesPage;

    test.beforeEach(async ({ page }) => {
        salesPage = new SalesPage(page);
    });

    test('Verify App Launcher button is visible', async () => {
        salesPage.navigateTo();
        await salesPage.waitForPageLoad();
        await salesPage.clickAppLauncherButton();
        await salesPage.searchInAppLauncher('Sales');
        await salesPage.clickSalesAppMenuItem();
        await salesPage.waitForPageLoad();
        expect(await salesPage.isAppLabelVisible()).toBe(true);
    });
});