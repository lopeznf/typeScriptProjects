# Initial Setup
1. Download Node.JS at https://nodejs.org/en/download/current 
2. Install TypeScript globally:
    npm install -g TypeScript

3. Install @Playwright/Test globally:
    npm install -g @Playwright/Test

4. Install Playwright Test Runner:
    npx Playwright install

# Run Test (in any of the following options)
1. Run all tests in Interactive UI Mode (Recommended for debugging purposes)
    npx playwright test --ui 

2. Run all tests in Headless Mode (Default and Recommended for CI/CD Implementation)
    npx playwright test 

3. Run all tests in Headed Mode (Displays browser)
    npx playwright test --headed 

4. Run specific test file (With parameters)
    npx playwright test <filePath> <--headed|--ui> --project=<chromium|firefox|webkit> 

