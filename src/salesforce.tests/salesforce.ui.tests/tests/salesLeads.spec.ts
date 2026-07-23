import { test, expect } from '@playwright/test';
import { LeadsPage } from '../pages/salesPages/LeadsPage';
import { NewEditLeadPage } from '../pages/salesPages/NewEditLeadPage';
import { LeadDetailsPage } from '../pages/salesPages/LeadDetailsPage';
import { ConvertLeadPage } from '../pages/salesPages/ConvertLeadPage';
import { ConfirmedLeadConversionPage } from '../pages/salesPages/ConfirmedLeadConversionPage';
import { OpportunityInfoPage } from '../pages/salesPages/OpportunityInfoPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

const STORAGE_STATE_PATH = 'tests/.auth/user.json';

test.use({ storageState: STORAGE_STATE_PATH }); // Use saved session

test.describe(' App > Leads Tab Tests', () => {
    let leadsPage: LeadsPage;
    let newLeadPage: NewEditLeadPage;
    let leadDetailsPage: LeadDetailsPage;
    let convertLeadPage: ConvertLeadPage;
    let confirmedLeadConversionPage: ConfirmedLeadConversionPage;
    let opportunityInfoPage: OpportunityInfoPage;
    let searchResultsPage: SearchResultsPage;

    let leadStatus: string;
    let lastName: string;
    let company: string;

    test.beforeEach(async ({ page }) => {
        leadsPage = new LeadsPage(page);
        newLeadPage = new NewEditLeadPage(page);
        leadDetailsPage = new LeadDetailsPage(page);
        convertLeadPage = new ConvertLeadPage(page);
        confirmedLeadConversionPage = new ConfirmedLeadConversionPage(page);
        opportunityInfoPage = new OpportunityInfoPage(page);
        searchResultsPage = new SearchResultsPage(page);

        lastName = 'Auto' + (Math.random() + 1).toString(36).substring(7);
        company = 'Org' + (Math.random() + 1).toString(36).substring(7);
        
        await leadsPage.navigateTo();
        await leadsPage.clickNewLeadButton();
        await newLeadPage.createNewLead('Test', lastName, company, 'Web');
        await leadDetailsPage.waitForPageLoad();
    });

    test.describe.configure({ mode: "serial" });

    test('Verify  Lead can be added', async () => {
        expect(await leadDetailsPage.isUniqueLeadIdCreated()).toBe(true);
    });

    test('Verify  Lead Status can be updated through tab buttons', async () => {
        leadStatus = 'Working - Contacted';
        await leadDetailsPage.clickLeadStatusButton(leadStatus);
        await leadDetailsPage.clickFinalizeLeadStatusButton();
        await leadDetailsPage.waitForPageLoad();

        expect(leadDetailsPage.isLeadStatusFinalized(leadStatus)).toBeTruthy();
    });

    test('Verify Lead is Converted into an Opportunity', async () => {
        let defaultOpportunityStage = 'Prospecting';
        let recordType = 'Opportunity';
        let opportunityOwnerUrl: string = '';
        let loggedInUserUrl: string = '';

        leadStatus = 'Converted'
        await leadDetailsPage.clickLeadStatusButton(leadStatus);
        await leadDetailsPage.clickFinalizeLeadStatusButton();
        
        await convertLeadPage.clickConvertButton();

        await leadDetailsPage.refreshPage();
        await leadDetailsPage.searchRecord(company + '-', recordType);

        // Check if Opportunity record exists
        expect(searchResultsPage.isSearchRecordLinkVisible(company + '-')).toBeTruthy();

        // Check if Account record exists
        expect(searchResultsPage.isSearchRecordTextVisible(company)).toBeTruthy();

        await searchResultsPage.clickSearchRecordLink(company + '-');

        await leadDetailsPage.waitUntil(30000);

        expect(await opportunityInfoPage.isContactLinkVisible(lastName)).toBeTruthy();

        expect(await opportunityInfoPage.isStageAsExpected(defaultOpportunityStage)).toBeTruthy();

        opportunityInfoPage.getOwnerUrl().then((value: string) => {
            opportunityOwnerUrl = value;
        });
        console.log('Opportunity Owner: ' + opportunityOwnerUrl);

        opportunityInfoPage.getUserUrl().then((value: string) => {
            loggedInUserUrl = value;
        });
        console.log('Logged-in User: ' + loggedInUserUrl);

        expect(opportunityOwnerUrl === loggedInUserUrl, 'Owner URL (' 
            + opportunityOwnerUrl + ') is different from User URL ('
            + loggedInUserUrl + ').');
    });
});