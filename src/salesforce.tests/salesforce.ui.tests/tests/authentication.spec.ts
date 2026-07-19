import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

test.describe("Authentication Tests", () => {
    test("Login with valid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);    
        const dashboardPage = new DashboardPage(page);
        const validUsername = "nflopezals.865b5fb05a82@agentforce.com";
        const validPassword = "G3L@F0rc309!";
        await loginPage.navigateTo();
        await loginPage.login(validUsername, validPassword);
        await page.waitForTimeout(600000);
        await dashboardPage.waitForPageLoad();
        await expect(page).toHaveURL(dashboardPage.url);
    });
});
