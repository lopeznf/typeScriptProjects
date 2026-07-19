import playwright = require("@playwright/test");
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Configure the static IP proxy globally
    proxy: {
      server: 'http://136.158.10.74:8080' // Replace with your proxy server address
    }
  }
});

projects: [
    {
        name: 'chromium',
        use: { ...playwright.devices['Desktop Chrome'] },  
    }
]