

//import {test,expect} from '@playwright/test' 
import { HomePage } from '../pages/homepage'
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