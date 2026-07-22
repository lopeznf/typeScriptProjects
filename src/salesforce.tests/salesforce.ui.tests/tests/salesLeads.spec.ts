import { test, expect } from '@playwright/test';
import { LeadsPage } from '../pages/salesPages/LeadsPage';
import { NewEditLeadPage } from '../pages/salesPages/NewEditLeadPage';
import { LeadDetailsPage } from '../pages/salesPages/LeadDetailsPage';
import { ConvertLeadPage } from '../pages/salesPages/ConvertLeadPage';
import { ConfirmedLeadConversionPage } from '../pages/salesPages/ConfirmedLeadConversionPage';
import { OpportunityInfoPage } from '../pages/salesPages/OpportunityInfoPage';

const STORAGE_STATE_PATH = 'tests/.auth/user.json';

test.use({ storageState: STORAGE_STATE_PATH }); // Use saved session

test.describe(' App > Leads Tab Tests', () => {
    let leadsPage: LeadsPage;
    let newLeadPage: NewEditLeadPage;
    let leadDetailsPage: LeadDetailsPage;
    let convertLeadPage: ConvertLeadPage;
    let confirmedLeadConversionPage: ConfirmedLeadConversionPage;
    let opportunityInfoPage: OpportunityInfoPage;

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

        await leadDetailsPage.waitUntil(30000);



        expect(await confirmedLeadConversionPage.isOpportunityCreated(company)).toBe(true);
        expect(await confirmedLeadConversionPage.isContactCreated(lastName)).toBe(true);

        await confirmedLeadConversionPage.clickOpportunityNameLink(company);
        await opportunityInfoPage.waitForPageLoad();
        expect(await opportunityInfoPage.isAccountNameInputVisible(company));

        expect(await opportunityInfoPage.isStageAsExpected(defaultOpportunityStage));

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
            + loggedInUserUrl + ').')
    });
});