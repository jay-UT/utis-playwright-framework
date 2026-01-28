

//import {test,expect} from '@playwright/test' 
import { HomePage } from '../pages/homepage'
import { CommonMethods } from '../utils/commonSteps'
import { DataProvider } from '../utils/dataProviders'
import { TestConfig} from '../test.config'
import { test,expect} from '../utils/fixture'
import { Assert, fail } from 'node:assert'
import { assert } from 'node:console'

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
Test Case: Verify tooltip displays address on hover over address info icon

Tags: @regression

Steps:

1.)Go to the Henry Schein website.
2.)Ensure the Sign In button is visible.
3.)Enter valid username and password.
4.)Click the Sign In button.
5.)Verify that the address tooltip is visible in the menu bar.
6.)Hover over the address tooltip and check that the tooltip displays the address information.
*/

test.only("Verify that the tooltip is displays the address when hovering over the address information icon",async({page,home,config})=>{

// 1.)Go to the Henry Schein website.
   await CommonMethods.navigateToPageUKMedical(page,config.appUrl,10000)
   console.log("Navigated to  Henry Schein url")
// 2.)Ensure the Sign In button is visible.
   await CommonMethods.isElementDisplayed(page,home.sign_in_xpath,20000)
   console.log("Verified the sign in button should be visible on the home page")
// 3.)Enter valid username and password.
   await CommonMethods.safeClick(page,home.sign_in_xpath,15000)
   await CommonMethods.writeText(page,home.username_xpath,config.USERNAME,10000)
   await CommonMethods.writeText(page,home.password_xpath,config.PASSWORD,10000)
   console.log("Entered the username and password")
// 4.)Click the Sign In button.
   await CommonMethods.safeClick(page,home.sign_in_submit_btn_xpath)
   console.log("clicked the sign-in submit button")
// 5.)Verify that the address tooltip is visible in the menu bar.
   await CommonMethods.isElementDisplayed(page,home.address_tooltip_xpath)
   console.log("the address-tooltip is visible")
// 6.)Hover over the address tooltip and check that the tooltip displays the address information.
   await CommonMethods.mouseOver(page,home.address_tooltip_xpath)
   //var addressInfo:String;
   const tooltipText: string|null = await CommonMethods.getTextFromElement(page,home.address_tooltip_xpath)
   if(tooltipText==null)
   {
    fail("The address-tool tip is empty");
   }
   expect(tooltipText).toContain('Address');
   expect(tooltipText).toContain('Ship Location');
   const  shipLocationXpath = page.locator("//div[@data-test-id='userdata_shiploc']")
   const  addressXpath= page.locator("//div[@data-test-id='userdata_address_text']")
   const shipLocation: string|null  =await CommonMethods.getTextFromElement(page,shipLocationXpath)
   const address: string|null = await CommonMethods.getTextFromElement(page,addressXpath)

   console.log("Verified that the address-tooltip is displays the address when it is hovered ")
   console.log("Ship Location :"+shipLocation)
   console.log("Address "+address)
})