//import {test,expect} from '@playwright/test' 
import { HomePage } from '../pages/HomePage'
import { CommonMethods } from '../utils/commonSteps'
import { DataProvider } from '../utils/dataProviders'
import { TestConfig} from '../test.config'
import { test,expect} from '../utils/fixture'
//import allure from 'allure-playwright';

/*
1)Testcase-01 : To verify the Henry Schein icon is present on the Home page
 Tags : @regression
 Steps 
 1.Navigate to  Henry Schein url
 2.verify the Henry Schein icon should be visible on the page
 3.click the icon
 4.verify the page is navigated to home page
*/

test('@regression To verify the Henry Schein icon is present on the Home page', async({page,home,config})=>{
//  const config= new TestConfig();
//  const home =new HomePage(page);
 
 await test.step("Step 1: Navigate to Henry Schein UK Medical URL"  , async () => {
    await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000);
  }); 

 await test.step("Step 2: Verify the Henry Schein icon should be visible on the page", async () => {
    await CommonMethods.isElementDisplayed(page, home.icon_xpath, 30000);
  });

 await test.step("Step 3: Click the Henry Schein icon", async () => {
    await CommonMethods.safeClick(page, home.icon_xpath, 30000);
  });

 await test.step("Step 4: Verify page navigates to Henry Schein home page", async () => {
    await expect(page).toHaveURL('https://www.henryschein.co.uk/');
 });
});

/*
2)Testcase-02 : Verify the sign-in functionality on the Home page
 Tags : @regression
 
 Steps 
 1.Navigate to  Henry Schein url
 2.Verify the sign in button should be visible on the home page
 3.Enter the username and password
 4.click the sign-in submit button
 5.Verify the user is successfully logged in
*/

test('@regression To Verify the sign-in functionality on the Home page',async({page,home,config})=>{


   await test.step("Step 1: Navigate to Henry Schein UK Medical URL", async () => {
    await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000);
  });
   
await test.step("Step 2: Verify the sign in button should be visible on the home page", async () => {
    await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 30000);
  }); 

   await test.step("Step 3: Enter username and password" , async () => {
    await CommonMethods.safeClick(page, home.sign_in_xpath, 15000);
    await CommonMethods.writeText(page, home.username_xpath, config.username, 10000);
    await CommonMethods.writeText(page, home.password_xpath, config.password, 10000);
  });
   
   await test.step("Step 4: Click on sign-in submit button", async () => {
    await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath);
  });
   
   await test.step("Step 5: Verify user is successfully logged in", async () => {
    await CommonMethods.isElementDisplayed(page, home.user_account_tab_xpath, 10000);
  });
   
});