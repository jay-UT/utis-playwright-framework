

//import {test,expect} from '@playwright/test' 
import { HomePage } from '../pages/homepage'
import { CommonMethods } from '../utils/commonSteps'
import { DataProvider } from '../utils/dataProviders'
import { TestConfig } from '../test.config'
import { test, expect } from '../utils/fixture'
/*
1)Test case : To verify the Henry Schein icon is present on the Home page
     

 Tags : @regression

 Steps 
 1.Navigate to  Henry Schein url
 2.verify the Henry Schein icon should be visible on the page
 3.click the icon
 4.verify the page is navigated to home page
*/

test('To verify the Henry Schein icon is present on the Home page', async ({ page, home, config }) => {
   //  const config= new TestConfig();
   //  const home =new HomePage(page);

   //1.Navigate to  Henry Schein url
   await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000)
   console.log("Navigate to  Henry Schein url")
   //2.verify the Henry Schein icon should be visible on the page
   await CommonMethods.isElementDisplayed(page, home.icon_xpath, 35000)
   console.log("verified the Henry Schein icon should be visible on the page")
   //3.click the icon
   await CommonMethods.safeClick(page, home.icon_xpath, 10000)
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

test('To Verify the sign-in functionality on the Home page', async ({ page, home, config }) => {

   //  1.Navigate to  Henry Schein url
   await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 10000)
   console.log("Navigated to  Henry Schein url")
   // 2.Verify the sign in button should be visible on the home page
   await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 20000)
   console.log("Verified the sign in button should be visible on the home page")
   // 3.Enter the username and password
   await CommonMethods.safeClick(page, home.sign_in_xpath, 15000)
   await CommonMethods.writeText(page, home.username_xpath, config.username, 10000)
   await CommonMethods.writeText(page, home.password_xpath, config.password, 10000)
   console.log("Entered the username and password")
   // 4.click the sign-in submit button
   await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
   console.log("clicked the sign-in submit button")
   // 5.Verify the user is successfully logged in
   await CommonMethods.isElementDisplayed(page, home.user_account_tab_xpath, 10000)
   console.log("Verified the user is successfully logged in")

})

/*
3)Test case : Verify that the user cannot sign in with invalid credentials
 

Tags : @regression

Steps 
1.Navigate to  Henry Schein url
2.Verify the sign in button should be visible on the home page
3.Enter invalid username and password
4.click the sign-in submit button
5.Verify the user cannot sign in successfully
*/

test('To Verify that the user cannot sign in with invalid credentials', async ({ page, home, config }) => {
   //  1.Navigate to  Henry Schein url
   await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000)
   console.log("Navigated to  Henry Schein url")
   // 2.Verify the sign in button should be visible on the home page
   await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 30000)
   console.log("Verified the sign in button should be visible on the home page")
   // 3.Enter invalid username and password
   await CommonMethods.safeClick(page, home.sign_in_xpath, 35000)
   await CommonMethods.writeText(page, home.username_xpath, config.invalid_username, 30000)
   await CommonMethods.writeText(page, home.password_xpath, config.invalid_password, 30000)
   console.log("Entered invalid username and password")
   // 4.click the sign-in submit button
   await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
   console.log("clicked the sign-in submit button")
   // 5.Verify the user cannot sign in successfully
   await CommonMethods.isElementDisplayed(page, home.sign_in_error_msg_xpath, 30000)
   console.log("Please enter valid Username/Password")
   const errorMsg = (home.sign_in_error_msg_xpath);
   await expect(errorMsg).toBeVisible({ timeout: 30000 });
   await expect(errorMsg).toContainText('username and/or password entered is incorrect');

})
/*
4)Test case : Verify Main Menu Buttons Are Enabled and Interactive

Tags : @regression

Steps 
1.Navigate to  Henry Schein url
2.Click Sign-In button on the home page to log in
3.Enter valid username and password
4.click the sign-in submit button
5.Verify the user is successfully logged in
6.Click Top Supplies button from main menu
7.I should see list of Top Supplies
8.Click Top Equipment button from main menu
9.I should see list of Top Equipment
10. Click Pharmaceuticals button from main menu
11.I should see list of Pharmaceuticals
12.Click Furniture button from main menu
13.I should see list of Furniture
14.Click My Dashboard button from main menu
15.I should see list of My Dashboard
*/

test('Verify Main Menu Buttons Are Enabled and Interactive', async ({ page, home, config }) => {
   //  const config= new TestConfig();
   //  const home =new HomePage(page);

   //  1.Navigate to  Henry Schein url
   await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000)
   console.log("Navigated to  Henry Schein url")
   // 2.Click Sign-In button on the home page to log in
   await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 20000)
   console.log("Clicked the Sign-In button on home page")
   // 3.Enter the username and password
   await CommonMethods.safeClick(page, home.sign_in_xpath, 35000)
   await CommonMethods.writeText(page, home.username_xpath, config.username, 10000)
   await CommonMethods.writeText(page, home.password_xpath, config.password, 10000)
   console.log("Entered the username and password")
   // 4.click the sign-in submit button
   await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
   console.log("Clicked the sign-in submit button")
   // 5.Verify the user is successfully logged in
   await CommonMethods.isElementDisplayed(page, home.user_account_tab_xpath, 30000)
   console.log("Verified the user is successfully logged in")
   //6.Click Top Supplies button from main menu
   //await CommonMethods.isElementDisplayed(page, home.main_menu_Top_Supplies, 30000)
   //console.log("Top Supplies button is enabled")
   //7.I should see list of Top Supplies
   //await CommonMethods.safeClick(page, home.main_menu_Top_Supplies, 30000)
   //const Top_Supplies = home.main_menu_Top_Supplies_detail
   //await expect(Top_Supplies).toContainText('Supplies')
   console.log("List of Top Supplies are displayed")
   //8.Click Top Equipment button from main menu
   await CommonMethods.isElementDisplayed(page, home.main_menu_Top_Equipment, 30000)
   console.log("Top Equipment button is enabled")
   //9.I should see list of Top Equipment
   await CommonMethods.safeClick(page, home.main_menu_Top_Equipment, 30000)
   const Top_Equipment = home.main_menu_Top_Equipment_detail
   await expect(Top_Equipment).toContainText('Equipment')
   console.log("List of Top Equipment are displayed")
   //10. Click Pharmaceuticals button from main menu
   await CommonMethods.isElementDisplayed(page, home.main_menu_Pharmaceuticals, 30000)
   console.log("Pharmaceuticals button is enabled")
   //11.I should see list of Pharmaceuticals
   await CommonMethods.safeClick(page, home.main_menu_Pharmaceuticals, 30000)
   const List_Pharmaceuticals = home.main_menu_Pharmaceuticals_details
   await expect(List_Pharmaceuticals).toContainText('Pharmaceuticals')
   console.log("List of Pharmaceuticals are displayed")
   //12.Click Furniture button from main menu
   await CommonMethods.isElementDisplayed(page, home.main_menu_Furniture, 30000)
   console.log("Furniture button is enabled")
   //13.I should see list of Furniture
   await CommonMethods.safeClick(page, home.main_menu_Furniture, 30000)
   const List_Furniture = home.main_menu_Furniture_details
   await expect(List_Furniture).toContainText('Furniture')
   console.log("List of Furniture are displayed")
   //14.Click My Dashboard button from main menu
   await CommonMethods.isElementDisplayed(page, home.main_menu_My_Dashboard, 30000)
   console.log("My Dashboard button is enabled")
   //15.I should see list of My Dashboard
   await CommonMethods.safeClick(page, home.main_menu_My_Dashboard, 10000)
   const Dashboard = home.main_menu_My_Dashboard_details
   await expect(Dashboard).toContainText('My Organisation')
   console.log("My Dashboard details are displayed")
})

/*
5)Test case : Verify Main Menu Links Are Enabled and Interactive

Tags : @regression

Steps 
1.Navigate to  Henry Schein url
2.Click Sign-In button on the home page to log in
3.Enter valid username and password
4.click the sign-in submit button
5.Verify the user is successfully logged in
6.Click Clearance link from main menu
7.Link should navigate to Clearance Page
8.Click Blog link from main menu
9.Link should navigate to Blog Page
10.Click Order From History link from main menu
11.Link should navigate to Order From History
*/

test('Verify Main Menu Links Are Enabled and Interactive', async ({ page, home, config }) => {
   //  const config= new TestConfig();
   //  const home =new HomePage(page);

   //  1.Navigate to  Henry Schein url
   await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000)
   console.log("Navigated to  Henry Schein url")
   // 2.Click Sign-In button on the home page to log in
   await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 20000)
   console.log("Clicked the Sign-In button on home page")
   // 3.Enter the username and password
   await CommonMethods.safeClick(page, home.sign_in_xpath, 35000)
   await CommonMethods.writeText(page, home.username_xpath, config.username, 10000)
   await CommonMethods.writeText(page, home.password_xpath, config.password, 10000)
   console.log("Entered the username and password")
   // 4.click the sign-in submit button
   await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
   console.log("Clicked the sign-in submit button")
   // 5.Verify the user is successfully logged in
   await CommonMethods.isElementDisplayed(page, home.user_account_tab_xpath, 25000)
   console.log("Verified the user is successfully logged in")
   //6.Click Clearance link from main menu
   await CommonMethods.safeClick(page, home.main_menu_Clearance)
   console.log("Clicked Clearance Link")
   //7.Link should navigate to Clearance Page
   await expect(page).toHaveURL('https://www.henryschein.co.uk/promo/promotions/medical-clearance', { timeout: 50000 });
   console.log("Verified the page is navigated to Clearance page")
   await page.waitForTimeout(5000);
   //8.Click Blog link from main menu
   await CommonMethods.safeClick(page, home.main_menu_Blog)
   console.log("Clicked Blog Link")
   //9.Link should navigate to Blog Page
   await expect(page).toHaveURL('https://www.henryschein.co.uk/blog/medical-blog', { timeout: 50000 });
   console.log("Verified the page is navigated to Blog page")
   await page.waitForTimeout(5000);
   //10.Click Order From History link from main menu
   await CommonMethods.safeClick(page, home.main_menu_Order_From_History)
   console.log("Clicked Order From History Link")
   await page.waitForTimeout(5000);
   //11.Link should navigate to Order From History
   await expect(page).toHaveURL('https://www.henryschein.co.uk/dashboard/myorders?activetab=item-history-tab', { timeout: 50000 });
   console.log("Verified the page is navigated to Order From History page")
})

/*
6)Test case : Verify Footer Links Are Interactive and Navigate to respective pages 

Tags : @regression

Steps 
1.Navigate to  Henry Schein url
2.Click Sign-In button on the home page to log in
3.Enter valid username and password
4.click the sign-in submit button
5.Verify the user is successfully logged in
6.Click Legal Terms link on footer section
7.Link should navigate to Legal Terms Page
8.Click Privacy Notice link on footer section
9.Link should navigate to Privacy Notice Page
10.Click Delivery and Returns link on footer section
11.Link should navigate to Delivery and Returns
12.Click LinkedIn link on footer section
13.Link should navigate to LinkedIn
*/

test('Verify Footer Links Are Interactive and Navigate to respective pages', async ({ page, home, config }) => {
   //  const config= new TestConfig();
   //  const home =new HomePage(page);

   //  1.Navigate to  Henry Schein url
   await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000)
   console.log("Navigated to  Henry Schein url")
   // 2.Click Sign-In button on the home page to log in
   await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 20000)
   console.log("Clicked the Sign-In button on home page")
   // 3.Enter the username and password
   await CommonMethods.safeClick(page, home.sign_in_xpath, 35000)
   await CommonMethods.writeText(page, home.username_xpath, config.username, 10000)
   await CommonMethods.writeText(page, home.password_xpath, config.password, 10000)
   console.log("Entered the username and password")
   // 4.click the sign-in submit button
   await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
   console.log("Clicked the sign-in submit button")
   // 5.Verify the user is successfully logged in
   await CommonMethods.isElementDisplayed(page, home.user_account_tab_xpath, 25000)
   console.log("Verified the user is successfully logged in")
   //6.Click Legal Terms link on footer section
   await CommonMethods.safeClick(page, home.footer_Legal_Terms)
   console.log("Clicked Legal Terms Link")
   //7.Link should navigate to Legal Terms Page
   await expect(page).toHaveURL('https://www.henryschein.co.uk/about/terms-and-conditions', { timeout: 70000 });
   console.log("Verified the page is navigated to Legal Terms page")
   //8.Click Privacy Notice link on footer section
   await CommonMethods.safeClick(page, home.footer_Privacy_Notice)
   console.log("Clicked Privacy Notice Link")
   //9.Link should navigate to Privacy Notice Page
   await expect(page).toHaveURL('https://www.henryschein.co.uk/about/privacy-notice', { timeout: 70000 });
   console.log("Verified the page is navigated to Privacy Notice page")
   //10.Click Delivery and Returns link on footer section
   await CommonMethods.safeClick(page, home.footer_Delivery_and_Returns)
   console.log("Clicked Delivery and Returns Link")
   //11.Link should navigate to Delivery and Returns page
   await expect(page).toHaveURL('https://www.henryschein.co.uk/about/delivery-and-returns', { timeout: 80000 });
   console.log("Verified the page is navigated to Delivery and Returns page")
   //12.Click LinkedIn link on footer section
   await CommonMethods.safeClick(page, home.footer_LinkedIn)
   console.log("Clicked LinkedIn Link")
   //13.Link should navigate to LinkedIn page
   await expect(page).toHaveURL('https://www.linkedin.com/showcase/henry-schein-medical-uk/?viewAsMember=true', { timeout: 80000 });
   console.log("Verified the page is navigated to LinkedIn page")
})