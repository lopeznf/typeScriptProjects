// auth.setup.ts (Updated for SauceDemo)

import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import path from 'path';
import fs from 'fs';
import { DashboardPage } from '../pages/DashboardPage';

const authFile = 'tests/.auth/user.json';
const validUsername = "gelabind09@gmail.com";
//"nflopezals.865b5fb05a82@agentforce.com";
const validPassword = "G3L@F0rc309!";

setup('save authenticated state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  await loginPage.navigateTo();
  await loginPage.login(validUsername, validPassword);

  await loginPage.waitUntil(30000); // Enter Emailed Verification Code during this 60-second timeout

  expect(await dashboardPage.isAppLauncherButtonVisible()).toBe(true); // Ensure the dashboard page is loaded by checking if App Launcher button is visible

  // Ensure directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Save storage state
  await page.context().storageState({ path: authFile });
});
