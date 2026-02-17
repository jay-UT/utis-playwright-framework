import { defineConfig, devices, } from '@playwright/test';

const timestamp = new Date()
  .toISOString()
  .replace(/[:.]/g, '-');

export default defineConfig({
 // globalSetup: './global.setup.ts',
 /* use: {
    storageState: 'storageState.json',
    navigationTimeout: 30000,
    actionTimeout: 30000,
  },*/
  timeout: 90 * 1000,   //30000 ms(30 secs)

  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only is left */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* 🔹 REPORTERS: Allure + HTML */
  reporter: [
    ['html', { outputFolder: `reports/html-report-${timestamp}`, open: 'never' }],
    ['list'],
    ['allure-playwright', { resultsDir: 'allure-results' }]
  ],

  /* Shared settings for all the projects */
  use: {
    /* Capture trace on first retry */
    trace: 'retain-on-failure',

    headless: true,

    launchOptions: {
      slowMo: 500, // wait 500ms between each action
    },

    /* Allure-friendly attachments */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  //grep: /@master/, 

  projects: [

  {
      name: 'HenrySchein',
      use: { ...devices['Desktop Chrome'] },
  }, 

  {
    name: 'Mobile Safari',
    use: {
      ...devices['iPhone 14 Pro Max'],
        locale: 'en-GB',
        timezoneId: 'Europe/London',
    },
  },

 /* {
    name: 'Mobile Chrome',
    use: {
      ...devices['Pixel 7'],
    },
  },*/
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
