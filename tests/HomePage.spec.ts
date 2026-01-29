

//import {test,expect} from '@playwright/test' 
import { HomePage } from '../pages/HomePage'
import { CommonMethods } from '../utils/commonSteps'
import { DataProvider } from '../utils/dataProviders'
import { TestConfig} from '../test.config'
import { test,expect} from '../utils/fixture'

/*
1)Test case : To verify the Henry Schein icon is present on the Home page
     

 Tags : @regression

 Steps 
 1.Navigate to  Henry Schein url
 2.verify the Henry Schein icon should be visible on the page
 3.click the icon
 4.verify the page is navigated to home page
*/

test('To verify the Henry Schein icon is present on the Home page', async({page,home,config})=>{
//  const config= new TestConfig();
//  const home =new HomePage(page);
 
 //1.Navigate to  Henry Schein url
 await CommonMethods.navigateToPageUKMedical(page,config.appUrl,10000)
 console.log("Navigate to  Henry Schein url")
 //2.verify the Henry Schein icon should be visible on the page
 await CommonMethods.isElementDisplayed(page,home.icon_xpath,15000)
 console.log("verified the Henry Schein icon should be visible on the page")
 //3.click the icon
 await CommonMethods.safeClick(page,home.icon_xpath,10000)
 console.log("clicked the icon")
 //4.verify the page is navigated to home page
 await expect(page).toHaveURL('https://www.henryschein.co.uk/');
  console.log("verified the page is navigated to home page")
})


/*
2)Test case : Verify the sign-in functionality on the Home page
    

 Tags : @regression

 Steps 
 1.Navigate to  Henry Schein url
 2.Verify the sign in button should be visible on the home page
 3.Enter the username and password
 4.click the sign-in submit button
 5.Verify the user is successfully logged in
*/

test('To Verify the sign-in functionality on the Home page',async({page,home,config})=>{
   
//  1.Navigate to  Henry Schein url
   await CommonMethods.navigateToPageUKMedical(page,config.appUrl,10000)
   console.log("Navigated to  Henry Schein url")
// 2.Verify the sign in button should be visible on the home page
   await CommonMethods.isElementDisplayed(page,home.sign_in_xpath,20000)
   console.log("Verified the sign in button should be visible on the home page")
// 3.Enter the username and password
   await CommonMethods.safeClick(page,home.sign_in_xpath,15000)
   await CommonMethods.writeText(page,home.username_xpath,config.username,10000)
   await CommonMethods.writeText(page,home.password_xpath,config.password,10000)
   console.log("Entered the username and password")
// 4.click the sign-in submit button
   await CommonMethods.safeClick(page,home.sign_in_submit_btn_xpath)
   console.log("clicked the sign-in submit button")
// 5.Verify the user is successfully logged in
   await CommonMethods.isElementDisplayed(page,home.user_account_tab_xpath,10000)
   console.log("Verified the user is successfully logged in")
})


/*
3) Test case : Verify the Sign up button functionality on the Home page

Tags : @regression

Steps
1.Navigate to Henry Schein url
2.Verify the Sign up button is visible on the home page
3.Click on the Sign up button
4.Verify user is navigated to Sign up / Registration page
*/

test('To verify the Sign up flow on the Home page', async ({ page, home, config }) => {

  // 1.Navigate to Henry Schein url
  await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 10000)
  console.log("Navigated to Henry Schein url")

  /*// Maximize browser window (Playwright way)
  await page.setViewportSize({ width: 1920, height: 1080 })
  console.log("Browser window maximized")*/

  // 2.Verify the Sign up button should be visible on the home page
  await CommonMethods.isElementDisplayed(page, home.sign_up_xpath, 15000)
  console.log("Verified the Sign up button is visible on the home page")

  // 3.Click on the Sign up button
  await CommonMethods.safeClick(page, home.sign_up_xpath, 10000)
  console.log("Clicked on the Sign up button")

  // 4.Verify user is navigated from home page
  await expect(page).toHaveURL(/registration/)
  console.log("Verified navigation to Registration page")
  await page.waitForTimeout(2000); // waits for 2 seconds

  // Scroll username field into view (for visibility)
  await home.reg_username_input.scrollIntoViewIfNeeded();

  // 5.Enter Username
   const username = `testuser_${Date.now()}`;
   await CommonMethods.writeText(page, home.reg_username_input, username, 10000);
   
  //Email-Verification 
   const email = `testuser_${Date.now()}@gmail.com`;
   await home.reg_email_input.scrollIntoViewIfNeeded();
   await CommonMethods.writeText(page, home.reg_email_input, email, 10000);

  //Password-Verification:
   const password = "Test@1234";

   await home.reg_password_input.scrollIntoViewIfNeeded();
   await CommonMethods.writeText(page, home.reg_password_input, password, 10000);
    
   await home.reg_confirm_password_input.scrollIntoViewIfNeeded();
   await CommonMethods.writeText(page, home.reg_confirm_password_input, password, 10000);

   await home.reg_next_step_btn.scrollIntoViewIfNeeded();
   await CommonMethods.safeClick(page, home.reg_next_step_btn, 10000);
   

  // Handle New Customer Web Notice popup
   await expect(home.continue_btn).toBeVisible({ timeout: 10000 });
   await CommonMethods.safeClick(page, home.continue_btn, 10000);
   await page.waitForTimeout(5000);
   console.log("Clicked Continue and new sign-up stopped till here...");
})

/*
Test case : Verify that the search bar accepts input and displays relevant suggestions

Steps
1.Navigate to Henry Schein url
2.Verify search bar is visible
3.Enter search keyword
4.Verify search suggestions are displayed
*/

// 1. Navigate to Henry Schein url
  test('Verify that the search bar accepts input and displays relevant suggestions',async ({ page, home, config }) => {
    await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 10000);
   console.log("Navigated to Henry Schein url");

// 2. Verify search bar is visible
    await CommonMethods.isElementDisplayed(page, home.search_input, 10000);
    console.log("Search bar is visible");

// 3. Enter search keyword
    await CommonMethods.writeText(page, home.search_input, "mask", 10000);
    console.log("Entered search keyword");
    await page.keyboard.press("Enter");

    await expect(page.locator("//div[contains(@class,'suggestions')]")).toHaveCount(1, { timeout: 10000 });
    console.log("Search suggestions container exists");

//4 Scroll the page till bottom:
    await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
    let totalHeight = 0;
    const distance = 150; // smaller = slower scroll
    const timer = setInterval(() => {
      const scrollHeight = document.body.scrollHeight;
      window.scrollBy(0, distance);
      totalHeight += distance;

      if (totalHeight >= scrollHeight) {
        clearInterval(timer);
        resolve();
      }
    }, 200); // increase time = slower scroll
  });
});    

    }
);