import { test, expect } from '@playwright/test';
import { SalesLeadsPage } from '../pages/SalesLeadsPage';
import { NewSalesLeadPage } from '../pages/NewSalesLeadPage';
import { SalesLeadDetailsPage } from '../pages/SalesLeadDetailsPage';

const STORAGE_STATE_PATH = 'tests/.auth/user.json';

test.use({ storageState: STORAGE_STATE_PATH }); // Use saved session

test.describe('Sales App > Leads Tab Tests', () => {
    let salesLeadsPage: SalesLeadsPage;
    let newSalesLeadPage: NewSalesLeadPage;
    let salesLeadDetailsPage: SalesLeadDetailsPage;

    test.beforeEach(async ({ page }) => {
        salesLeadsPage = new SalesLeadsPage(page);
        newSalesLeadPage = new NewSalesLeadPage(page);
        salesLeadDetailsPage = new SalesLeadDetailsPage(page);
        
        await salesLeadsPage.navigateTo();
        await salesLeadsPage.waitForPageLoad();
        await salesLeadsPage.clickNewLeadButton();
        await newSalesLeadPage.createNewLead('Test', 'Auto' + (Math.random() + 1).toString(36).substring(7), 'Acme Inc.', 'Web');
        await salesLeadDetailsPage.waitForPageLoad();
    });

    test('Verify Sales Lead can be added', async () => {
        expect(await salesLeadDetailsPage.isUniqueSalesLeadIdCreated()).toBe(true);
    });

    test('Verify Sales Lead can be updated', async () => {
        await salesLeadDetailsPage.clickLeadStatusTab('Working - Contacted');
        await salesLeadDetailsPage.waitForPageLoad();
        expect(salesLeadDetailsPage.leadStatusTab('Working - Contacted')).toHaveAttribute('aria-selected', 'true');
    });
});