import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Fail the build on CI if test.only is left */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* 🔹 REPORTERS: Allure + HTML */
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['allure-playwright', { resultsDir: 'allure-results' }]
  ],

  /* Shared settings for all the projects */
  use: {
    /* Capture trace on first retry */
    trace: 'on-first-retry',

    headless: true,

    launchOptions: {
      slowMo: 500, // wait 500ms between each action
    },

    /* Allure-friendly attachments */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // }
  ],
});
