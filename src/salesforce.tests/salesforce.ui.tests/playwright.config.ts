import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Configure the static IP proxy globally
    proxy: {
      server: 'http://136.158.10.74,16.78.62.184' // Replace with your proxy server address
    }
  }
});
