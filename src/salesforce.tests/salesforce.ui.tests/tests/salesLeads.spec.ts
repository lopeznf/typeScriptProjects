import { test, expect } from '@playwright/test';
import { SalesLeadsPage } from '../pages/SalesLeadsPage';
import { NewSalesLeadPage } from '../pages/NewEditSalesLeadPage';
import { SalesLeadDetailsPage } from '../pages/SalesLeadDetailsPage';
import { ConvertSalesLeadPage } from '../pages/ConvertSalesLeadPage';
import { ConfirmedLeadConversionPage } from '../pages/ConfirmedLeadConversionPage';

const STORAGE_STATE_PATH = 'tests/.auth/user.json';

test.use({ storageState: STORAGE_STATE_PATH }); // Use saved session

test.describe('Sales App > Leads Tab Tests', () => {
    let salesLeadsPage: SalesLeadsPage;
    let newSalesLeadPage: NewSalesLeadPage;
    let salesLeadDetailsPage: SalesLeadDetailsPage;
    let convertSalesLeadPage: ConvertSalesLeadPage;
    let confirmedLeadConversionPage: ConfirmedLeadConversionPage;

    let leadStatus: string;
    let lastName: string;
    let company: string;

    test.beforeEach(async ({ page }) => {
        salesLeadsPage = new SalesLeadsPage(page);
        newSalesLeadPage = new NewSalesLeadPage(page);
        salesLeadDetailsPage = new SalesLeadDetailsPage(page);
        convertSalesLeadPage = new ConvertSalesLeadPage(page);
        confirmedLeadConversionPage = new ConfirmedLeadConversionPage(page);

        lastName = 'Auto' + (Math.random() + 1).toString(36).substring(7);
        company = 'Org' + (Math.random() + 1).toString(36).substring(7);
        
        await salesLeadsPage.navigateTo();
        await salesLeadsPage.waitForPageLoad();
        await salesLeadsPage.clickNewLeadButton();
        await newSalesLeadPage.createNewLead('Test', lastName, company, 'Web');
        await salesLeadDetailsPage.waitForPageLoad();
    });

    test.describe.configure({ mode: "serial" });

    test('Verify Sales Lead can be added', async () => {
        expect(await salesLeadDetailsPage.isUniqueSalesLeadIdCreated()).toBe(true);
    });

    test('Verify Sales Lead Status can be updated through tabs', async () => {
        leadStatus = 'Working - Contacted';
        await salesLeadDetailsPage.clickLeadStatusButton(leadStatus);
        await salesLeadDetailsPage.clickFinalizeLeadStatusButton('Mark as Current Status');
        await salesLeadDetailsPage.waitForPageLoad();
        expect(salesLeadDetailsPage.leadStatusButton(leadStatus)).toHaveAttribute('aria-selected', 'true');
    });

    test('Verify Lead is Converted successfully', async () => {
        leadStatus = 'Converted'
        await salesLeadDetailsPage.clickLeadStatusButton(leadStatus);
        await salesLeadDetailsPage.waitForPageLoad();
        await salesLeadDetailsPage.clickFinalizeLeadStatusButton('Select Converted Status');

        await convertSalesLeadPage.clickCreateNewAccountOption();
        await convertSalesLeadPage.clickCreateNewContactOption();
        
        expect(await confirmedLeadConversionPage.isOpportunityCreated(company)).toBe(true);
        expect(await confirmedLeadConversionPage.isOpportunityAccountNameSame(company)).toBe(true);
    });
});