import { defineConfig, devices } from '@playwright/test';

// Path to the storage state file used by the authenticated project
const STORAGE_STATE_PATH = 'tests/.auth/user.json';

export default defineConfig({  
  projects: [
    {
      name: 'setup',
      testMatch: ['**/*auth.setup.ts'],
      use: { 
        storageState: undefined // No storage state for the setup project
      }
    },
    {
      name: 'chromium',
        use: { 
          ...devices['Desktop Chrome'], 
          storageState: STORAGE_STATE_PATH // Path to the storage state file
        },
        dependencies: ['setup'] // Specify dependencies for this project
    },
    {
      name: 'edge',
        use: { 
          ...devices['Desktop Edge'], 
          storageState: STORAGE_STATE_PATH // Path to the storage state file
        },
        dependencies: ['setup'] // Specify dependencies for this project
    }
  ],
  outputDir: 'test-results/',
  testDir: './tests',
  timeout: 90000,
  reporter: [['html', { open: 'never' }]]
});
