import { defineConfig, devices } from '@playwright/test';

const timestamp = new Date()
  .toISOString()
  .replace(/[:.]/g, '-');

export default defineConfig({
  
  timeout: 90 * 1000,   //30000 ms(30 secs)

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
    ['html', { outputFolder: `reports/html-report-${timestamp}`, open: 'never' }],
    ['json', { outputFile: 'playwright-results.json' }],
    ['list'],
    ['allure-playwright', { resultsDir: 'allure-results' }]
  ],

  /* Shared settings for all the projects */
  use: {
    /* Capture trace on first retry */
    trace: 'on-first-retry',

    headless: false,

    launchOptions: {
      slowMo: 500, // wait 500ms between each action
    },

    /* Allure-friendly attachments */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

 // grep: /@smoke/, 

  projects: [
    {
      name: 'HenrySchein',
      use: { ...devices['Desktop Chrome'] },
    },
    //{
      //name: 'firefox',
      //use: { ...devices['Desktop Firefox'] },
    //},
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // }
  ],

});
