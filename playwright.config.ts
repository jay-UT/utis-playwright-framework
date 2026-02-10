import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
const now = new Date();

const timestamp =
  String(now.getDate()).padStart(2, '0') + '-' +
  String(now.getMonth() + 1).padStart(2, '0') + '-' +
  now.getFullYear() + '_' +
  String(now.getHours()).padStart(2, '0') + '-' +
  String(now.getMinutes()).padStart(2, '0') + '-' +
  String(now.getSeconds()).padStart(2, '0');

// const timestamp = new Date()
//   .toTimeString()
//   .slice(0, 8)
//   .replace(/:/g, "")

const playwrightReportFolder = isCI
  ? 'reports/playwrightreport/cireports'
  : `reports/playwrightreport/localreports/playwright-${timestamp}`;

// Dynamic folder naming based on environment
// const folderSuffix = isCI ? 'cireports' : `localreport-${timestamp}`;

export default defineConfig({
  
  timeout: 90 * 1000,   //30000 ms(30 secs)
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only is left */
  forbidOnly: isCI,

  /* Retry on CI only */
  retries: isCI ? 1 : 0,

  /* Opt out of parallel tests on CI */
  workers: isCI ? 1 : 1,

  /* 🔹 REPORTERS: Allure + HTML */ 
reporter: [
  ['html', { outputFolder: process.env.PLAYWRIGHT_HTML_REPORT, open: 'never' }],
  ['json', { outputFile: 'playwright-results.json' }],
  ['list'],
  ['allure-playwright', { resultsDir: 'allure-results' }]
],

  // reporter: [
  //   ['html', { outputFolder: `reports/playwrightreport-${folderSuffix}`, open: 'never' }],
  //   ['json', { outputFile: 'playwright-results.json' }],
  //   ['list'],
  //   // ['allure-playwright', { 
  //   //   outputFolder: `reports/allurereport/${folderSuffix}` 
  //   // }],
  //   ['allure-playwright', { resultsDir: 'allure-results' }]
  // ],

  /* Shared settings for all the projects */
//   use: {
//   trace: process.env.CI ? 'retain-on-failure' : 'on',

//   headless: false,

//   launchOptions: {
//     slowMo: 500,
//   },

//   screenshot: process.env.CI ? 'only-on-failure' : 'on',
//   video: process.env.CI ? 'retain-on-failure' : 'on'
// }
  use: {
    /* Capture trace on first retry */
    // trace: 'on-first-retry',
    trace: 'retain-on-failure',
    headless: true,

    launchOptions: {
      slowMo: 500, // wait 500ms between each action
    },

    /* Allure-friendly attachments */
    screenshot: isCI ? 'only-on-failure' : 'on',
    video:  isCI ? 'retain-on-failure' : 'on',
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
