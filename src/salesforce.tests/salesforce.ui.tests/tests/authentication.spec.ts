import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

const validUsername = "nflopezals.865b5fb05a82@agentforce.com";
const validPassword = "G3L@F0rc309!";

test.describe("Authentication Tests", () => {
    test("Login with valid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);    
        const dashboardPage = new DashboardPage(page);
        await loginPage.navigateTo();
        await loginPage.login(validUsername, validPassword);
        await dashboardPage.waitForPageLoad();
        await expect(page).toHaveURL(dashboardPage.url);
    });

    test("Login with empty credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.login("", "");
        expect(await loginPage.isExpectedErrorMessageDisplayed("Error: Please enter your username and password.")).toBe(true);
    });

    test("Login with empty username", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.login("", validPassword);
        expect(await loginPage.isExpectedErrorMessageDisplayed("Error: Please enter your username.")).toBe(true);
    });

    test("Login with empty password", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.login(validUsername, "");
        expect(await loginPage.isExpectedErrorMessageDisplayed("Error: Please enter your password.")).toBe(true);
    });

    test("Login with invalid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidUsername = "invalid@example.com";
        const invalidPassword = "invalidpassword";
        await loginPage.navigateTo();
        await loginPage.login(invalidUsername, invalidPassword);
        await expect(page).toHaveURL(loginPage.url);
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
    });

    test("Login with invalid username", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidUsername = "invalid2@example.com";
        await loginPage.navigateTo();
        await loginPage.login(invalidUsername, validPassword);
        expect(await loginPage.isExpectedErrorMessageDisplayed("Error: Please check your username and password. If you still can't log in, contact your Salesforce administrator.")).toBe(true);
    });

    test("Login with invalid password", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidPassword = "invalidpassword2";
        await loginPage.navigateTo();
        await loginPage.login(validUsername, invalidPassword);
        expect(await loginPage.isExpectedErrorMessageDisplayed("Error: Please check your username and password. If you still can't log in, contact your Salesforce administrator.")).toBe(true);
    });

    test("Login with Remember Me checked", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.navigateTo();
        await loginPage.loginWithRememberMe(validUsername, validPassword);
        await dashboardPage.waitForPageLoad();
        await expect(page).toHaveURL(dashboardPage.url);
    });
});
