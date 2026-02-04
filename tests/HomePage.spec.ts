//import {test,expect} from '@playwright/test' 
import { HomePage } from '../pages/HomePage'
import { CommonMethods } from '../utils/commonSteps'
import { DataProvider } from '../utils/dataProviders'
import { TestConfig} from '../test.config'
import { test,expect} from '../utils/fixture'
import { Assert, fail } from 'node:assert'
import { assert } from 'node:console'

/*
1)Testcase-01 : To verify the Henry Schein icon is present on the Home page
 Tags : @regression
 Steps 
 1.Navigate to  Henry Schein url
 2.verify the Henry Schein icon should be visible on the page
 3.click the icon
 4.verify the page is navigated to home page
*/

test('01-To verify the Henry Schein icon is present on the Home page',
   {
      tag: ['@regression', '@smoke', '@homepage', '@demo'],
   },
   async ({ page, home, config }) => {
      //  const config= new TestConfig();
      //  const home =new HomePage(page);

      await test.step("Step 1: Navigate to Henry Schein UK Medical URL", async () => {
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
         console.log("verified the page is navigated to home page")
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

test('02-To Verify the sign-in functionality on the Home page', {
   tag: ['@regression', '@smoke', '@signin' ,'@demo'],
},
   async ({ page, home, config }) => {

      //  1.Navigate to  Henry Schein url
      await test.step("Step 1: Navigate to the Henry Schein website.", async () => {
         await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 10000)
         console.log("Navigated to  Henry Schein url")
      })
      // 2.Verify the sign in button should be visible on the home page
      await test.step("Step 2: Confirm that the Sign In button is visible.", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 20000)
         console.log("Verified the sign in button should be visible on the home page")
      })
      // 3.Enter the username and password
      await test.step("Step 3: Enter a valid username and password.", async () => {
         await CommonMethods.safeClick(page, home.sign_in_xpath, 15000)
         await CommonMethods.writeText(page, home.username_xpath, config.username, 10000)
         await CommonMethods.writeText(page, home.password_xpath, config.password, 10000)
         console.log("Entered the username and password")
      })
      // 4.click the sign-in submit button
      await test.step("Step 4: Click the Sign In button.", async () => {
         await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
         console.log("clicked the sign-in submit button")
      })
      // 5.Verify the user is successfully logged in
      await test.step("Step 5: Verify the user is successfully logged in", async () => {
         await CommonMethods.isElementDisplayed(page, home.user_account_tab_xpath, 10000)
         console.log("Verified the user is successfully logged in")
      })
   })

/*
3)Testcase-03 : Verify that the user cannot sign in with invalid credentials
 

Tags : @regression

Steps 
1.Navigate to  Henry Schein url
2.Verify the sign in button should be visible on the home page
3.Enter invalid username and password
4.click the sign-in submit button
5.Verify the user cannot sign in successfully
*/

test('03-To Verify that the user cannot sign in with invalid credentials',
   {
      tag: ['@regression', '@smoke', '@signin' ,'@invalidsignin'],
   },
   async ({ page, home, config }) => {

      await test.step("Step 1: Navigate to  HenrySchein url", async () => {
         await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000)
         console.log("Navigated to  HenrySchein url")
      })
      await test.step("Step 2: Verify the sign in button should be visible on the home page", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 30000)
         console.log("Verified the sign in button should be visible on the home page")
      })
      await test.step("Step 3: Enter invalid username and password", async () => {
         await CommonMethods.safeClick(page, home.sign_in_xpath, 35000)
         await CommonMethods.writeText(page, home.username_xpath, config.invalid_username, 30000)
         await CommonMethods.writeText(page, home.password_xpath, config.invalid_password, 30000)
         console.log("Entered invalid username and password")
      })
      await test.step("Step 4: Click the sign-in submit button", async () => {
         await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
         console.log("Clicked the sign-in submit button")
      })
      await test.step("Step 5: Verify the user cannot sign in successfully", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_in_error_msg_xpath, 30000)
         console.log("Please enter valid Username/Password")
         const errorMsg = (home.sign_in_error_msg_xpath);
         await expect(errorMsg).toBeVisible();
         await expect(errorMsg).toContainText('username and/or password entered is incorrect');
      })

   })

/*
4) Testcase-04 : Verify the Sign up button functionality on the Home page

Tags : @regression

Steps
1.Navigate to Henry Schein url
2.Verify the Sign up button is visible on the home page
3.Click on the Sign up button
4.Verify user is navigated to Sign up / Registration page
*/

test('04-To verify the Sign up flow on the Home page',
   {
      tag: ['@regression', '@smoke', '@signup'],
   },
   async ({ page, home, config }) => {

      // 1.Navigate to Henry Schein url
      await test.step("Step 1: Navigate to Henry Schein url", async () => {
         await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 10000)
         console.log("Navigated to Henry Schein url")
      })
      await test.step("Step 2: Verify the Sign up button should be visible on the home page", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_up_xpath, 15000)
         console.log("Verified the Sign up button is visible on the home page")
      })
      // 3.Click on the Sign up button
      await test.step("Step 3: Click on the Sign up button", async () => {
         await CommonMethods.safeClick(page, home.sign_up_xpath, 10000)
         console.log("Clicked on the Sign up button")
      })
      // 4.Verify user is navigated from home page
      await test.step("Step 4: Verify user is navigated from home page", async () => {
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
   })

/*
05)Testcase-05 : Verify that the search bar accepts input and displays relevant suggestions

Steps
1.Navigate to Henry Schein url
2.Verify search bar is visible
3.Enter search keyword
4.Scroll the page till bottom
*/

// 1. Navigate to Henry Schein url
test('05-Verify that the search bar accepts input and displays relevant suggestions',
   {
      tag: ['@regression', '@search'],
   },
   async ({ page, home, config }) => {
      await test.step("Step 1: Navigate to Henry Schein url", async () => {
         await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 10000);
         console.log("Navigated to Henry Schein url");
      })
      // 2. Verify search bar is visible
      await test.step("Step 2: Verify search bar is visible", async () => {
         await CommonMethods.isElementDisplayed(page, home.search_input, 10000);
         console.log("Search bar is visible");
      })
      // 3. Enter search keyword
      await test.step("Step 3: Enter search keyword", async () => {
         await CommonMethods.writeText(page, home.search_input, "mask", 10000);
         console.log("Entered search keyword");
         await page.keyboard.press("Enter");
      })
      await test.step("Step 4: Verify search suggestions are displayed", async () => { })
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
   })

/*
6)Testcase-06 : Verify Main Menu Buttons Are Enabled and Interactive

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

test('06-Verify Main Menu Buttons Are Enabled and Interactive',
   {
      tag: ['@regression', '@menu', '@buttons'],
   },
   async ({ page, home, config }) => {

      await test.step("Step 1: Navigate to  HenrySchein url", async () => {
         await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000)
         console.log("Navigated to  Henry Schein url")
      })
      await test.step("Step 2: Click Sign-In button on the home page to log in", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 20000)
         console.log("Clicked the Sign-In button on home page")
      })
      await test.step("Step 3: Enter the username and password", async () => {
         await CommonMethods.safeClick(page, home.sign_in_xpath, 35000)
         await CommonMethods.writeText(page, home.username_xpath, config.username, 10000)
         await CommonMethods.writeText(page, home.password_xpath, config.password, 10000)
         console.log("Entered the username and password")
      })
      await test.step("Step 4: Click the sign-in submit button", async () => {
         await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
         console.log("Clicked the sign-in submit button")
      })
      await test.step("Step 5: Verify the user is successfully logged in", async () => {
         await CommonMethods.isElementDisplayed(page, home.user_account_tab_xpath, 30000)
         console.log("Verified the user is successfully logged in")
      })
      await test.step("Step 6: Click Top Supplies button from main menu", async () => {
         await CommonMethods.isElementDisplayed(page, home.main_menu_Top_Supplies, 30000)
         console.log("Top Supplies button is enabled")
      })
      await test.step("Step 7: I should see list of Top Supplies", async () => {
         await CommonMethods.safeClick(page, home.main_menu_Top_Supplies, 30000)
         const Top_Supplies = home.main_menu_Top_Supplies_detail
         await expect(Top_Supplies).toContainText('Supplies')
         console.log("List of Top Supplies are displayed")
      })
      await test.step("Step 8: Click Top Equipment button from main menu", async () => {
         await CommonMethods.isElementDisplayed(page, home.main_menu_Top_Equipment, 30000)
         console.log("Top Equipment button is enabled")
      })
      await test.step("Step 9: I should see list of Top Equipment", async () => {
         await CommonMethods.safeClick(page, home.main_menu_Top_Equipment, 30000)
         const Top_Equipment = home.main_menu_Top_Equipment_detail
         await expect(Top_Equipment).toContainText('Equipment')
         console.log("List of Top Equipment are displayed")
      })
      await test.step("Step 10: Click Pharmaceuticals button from main menu", async () => {
         await CommonMethods.isElementDisplayed(page, home.main_menu_Pharmaceuticals, 30000)
         console.log("Pharmaceuticals button is enabled")
      })
      await test.step("Step 11: I should see list of Pharmaceuticals", async () => {
         await CommonMethods.safeClick(page, home.main_menu_Pharmaceuticals, 30000)
         const List_Pharmaceuticals = home.main_menu_Pharmaceuticals_details
         await expect(List_Pharmaceuticals).toContainText('Pharmaceuticals')
         console.log("List of Pharmaceuticals are displayed")
      })
      await test.step("Step 12: Click Furniture button from main menu", async () => {
         await CommonMethods.isElementDisplayed(page, home.main_menu_Furniture, 30000)
         console.log("Furniture button is enabled")
      })
      await test.step("Step 13: I should see list of Furniture", async () => {
         await CommonMethods.safeClick(page, home.main_menu_Furniture, 30000)
         const List_Furniture = home.main_menu_Furniture_details
         await expect(List_Furniture).toContainText('Furniture')
         console.log("List of Furniture are displayed")
      })
      await test.step("Step 14: Click My Dashboard button from main menu", async () => {
         await CommonMethods.isElementDisplayed(page, home.main_menu_My_Dashboard, 30000)
         console.log("My Dashboard button is enabled")
      })
      await test.step("Step 15: I should see list of My Dashboard", async () => {
         await CommonMethods.safeClick(page, home.main_menu_My_Dashboard, 10000)
         const Dashboard = home.main_menu_My_Dashboard_details
         await expect(Dashboard).toContainText('My Organisation')
         console.log("My Dashboard details are displayed")
      })
   })

/*
7)Testcase-07 : Verify Main Menu Links Are Enabled and Interactive

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

test('07-Verify Main Menu Links Are Enabled and Interactive',
   {
      tag: ['@regression', '@menu', '@links'],
   },
   async ({ page, home, config }) => {

      await test.step("Step 1: Navigate to  Henry Schein url", async () => {
         await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000)
         console.log("Navigated to  Henry Schein url")
      })
      await test.step("Step 2: Click Sign-In button on the home page to log in", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 20000)
         console.log("Clicked the Sign-In button on home page")
      })
      await test.step("Step 3: Enter the username and password", async () => {
         await CommonMethods.safeClick(page, home.sign_in_xpath, 35000)
         await CommonMethods.writeText(page, home.username_xpath, config.username, 10000)
         await CommonMethods.writeText(page, home.password_xpath, config.password, 10000)
         console.log("Entered the username and password")
      })
      await test.step("Step 4: Click the sign-in submit button", async () => {
         await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
         console.log("Clicked the sign-in submit button")
      })
      await test.step("Step 5: Verify the user is successfully logged in", async () => {
         await CommonMethods.isElementDisplayed(page, home.user_account_tab_xpath, 25000)
         console.log("Verified the user is successfully logged in")
      })
      await test.step("Step 6: Click Clearance link from main menu", async () => {
         await CommonMethods.safeClick(page, home.main_menu_Clearance)
         console.log("Clicked Clearance Link")
      })
      await test.step("Step 7: Link should navigate to Clearance Page", async () => {
         await expect(page).toHaveURL('https://www.henryschein.co.uk/promo/promotions/medical-clearance');
         console.log("Verified the page is navigated to Clearance page")
      })
      await test.step("Step 8: Click Blog link from main menu", async () => {
         await CommonMethods.safeClick(page, home.main_menu_Blog)
         console.log("Clicked Blog Link")
      })
      await test.step("Step 9: Link should navigate to Blog Page", async () => {
         await expect(page).toHaveURL('https://www.henryschein.co.uk/blog/medical-blog');
         console.log("Verified the page is navigated to Blog page")
      })
      await test.step("Step 10: Click Order From History link from main menu", async () => {
         await CommonMethods.safeClick(page, home.main_menu_Order_From_History, 30000)
         console.log("Clicked Order From History Link")
      })
      await test.step("Step 11: Link should navigate to Order From History", async () => {
         await expect(page).toHaveURL('https://www.henryschein.co.uk/dashboard/myorders?activetab=item-history-tab');
         console.log("Verified the page is navigated to Order From History page")
      })
   })


/*
08)Testcase-08: Verify that the cart icon displays the correct item count when products are added to the cart
1.Navigate to  Henry Schein url
2.Click Sign-In button on the home page to log in
3.Enter valid username and password
4.click the sign-in submit button
5.Verify the user is successfully logged in
6.Verify the Cart badge quantity
7.Add a product to cart
8.Verify the cart count and cart badge count are correct */

test('08-Verify that the cart icon displays the correct item count when products are added to the cart',
   {
      tag: ['@regression', '@cart'],
   },
   async ({ page, home, config }) => {

      let initialCount: number;

      await test.step("Step 1: Navigate to  Henry Schein url", async () => {
         await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000)
         console.log("Navigated to  Henry Schein url")
      })
      await test.step("Step 2: Click Sign-In button on the home page to log in", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 20000)
         console.log("Clicked the Sign-In button on home page")
      })
      await test.step("Step 3: Enter the username and password", async () => {
         await CommonMethods.safeClick(page, home.sign_in_xpath, 35000)
         await CommonMethods.writeText(page, home.username_xpath, config.username, 10000)
         await CommonMethods.writeText(page, home.password_xpath, config.password, 10000)
         console.log("Entered the username and password")
      })
      await test.step("Step 4: Click the sign-in submit button", async () => {
         await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
         console.log("Clicked the sign-in submit button")
      })
      await test.step("Step 5: Verify the user is successfully logged in", async () => {
         await CommonMethods.isElementDisplayed(page, home.user_account_tab_xpath, 25000)
         console.log("Verified the user is successfully logged in")
      })
      await test.step("Step 6: Verify the Cart badge quantity", async () => {
         await expect(home.view_basket_qty).toBeVisible();
         const cartText = await home.view_basket_qty.innerText();
         console.log(`Cart badge text: ${cartText}`);

         initialCount = parseInt(cartText.replace(/\D/g, '') || '0');

      })
      await test.step("Step 7: Add product to cart", async () => {
         await CommonMethods.writeText(page, home.search_input, "DIS258");
         await page.keyboard.press("Enter");
         console.log("Entered Product Id");
         await CommonMethods.safeClick(page, home.product_1)
         console.log("Selected Product")
         await CommonMethods.safeClick(page, home.Add_to_basket)
         console.log("Product added to Cart");
      })
      await test.step("Step 8: Verify the cart count and cart badge count are correct", async () => {
         await CommonMethods.safeClick(page, home.view_basket, 30000);
         console.log("Clicked View Basket")
         await expect(home.view_basket_qty).toBeVisible();
         await page.reload();
         const updatedText = await CommonMethods.getTextFromElement(page, home.view_basket_qty);
         const updatedCount = parseInt(updatedText?.replace(/\D/g, '') || '0');
         console.log(`Updated cart count: ${updatedCount}`);

         expect(updatedCount).toBe(initialCount + 1);
      });
   })

/*
09.)Testcase-09: Verify tooltip displays address on hover over address info icon

Tags: @regression

Steps:

1.)Go to the Henry Schein website.
2.)Ensure the Sign In button is visible.
3.)Enter valid username and password.
4.)Click the Sign In button.
5.)Verify that the address tooltip is visible in the menu bar.
6.)Hover over the address tooltip and check that the tooltip displays the address information.
*/

test("09-Verify that the tooltip is displays the address when hovering over the address information icon",
   {
      tag: ['@regression', '@tooltip'],
   },
   async ({ page, home, config }) => {

      // 1.)Go to the Henry Schein website.
      await test.step("Step 1: Navigate to the Henry Schein website.", async () => {
         await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 10000)
         console.log("Navigated to  Henry Schein url")
      })
      // 2.)Ensure the Sign In button is visible.
      await test.step("Step 2: Confirm that the Sign In button is visible.", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 20000)
         console.log("Verified the sign in button should be visible on the home page")
      })
      // 3.)Enter valid username and password.
      await test.step("Step 3: Enter a valid username and password.", async () => {
         await CommonMethods.safeClick(page, home.sign_in_xpath, 15000)
         await CommonMethods.writeText(page, home.username_xpath, config.USERNAME, 10000)
         await CommonMethods.writeText(page, home.password_xpath, config.PASSWORD, 10000)
         console.log("Entered the username and password")
      })
      // 4.)Click the Sign In button.
      await test.step("Step 4: Click the Sign In button.", async () => {
         await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
         console.log("clicked the sign-in submit button")
      })
      // 5.)Verify that the address tooltip is visible in the menu bar.
      await test.step("Step 5: Verify that the address tooltip is visible in the menu bar.", async () => {
         await CommonMethods.isElementDisplayed(page, home.address_tooltip_xpath)
         console.log("the address-tooltip is visible")
      })
      // 6.)Hover over the address tooltip and check that the tooltip displays the address information.
      await test.step("Step 6: Hover over the address tooltip and check that the tooltip displays the address information.", async () => {
         await CommonMethods.mouseOver(page, home.address_tooltip_xpath)
         //var addressInfo:String;
         const tooltipText: string | null = await CommonMethods.getTextFromElement(page, home.address_tooltip_xpath)
         if (tooltipText == null) {
            fail("The address-tool tip is empty");
         }
         expect(tooltipText).toContain('Address');
         expect(tooltipText).toContain('Ship Location');
         const shipLocationXpath = page.locator("//div[@data-test-id='userdata_shiploc']")
         const addressXpath = page.locator("//div[@data-test-id='userdata_address_text']")
         const shipLocation: string | null = await CommonMethods.getTextFromElement(page, shipLocationXpath)
         const address: string | null = await CommonMethods.getTextFromElement(page, addressXpath)

         console.log("Verified that the address-tooltip is displays the address when it is hovered ")
         console.log("Ship Location :" + shipLocation)
         console.log("Address " + address)
      })
   })

/*
10)Testcase-10 : Verify that the banner slider displays all slides with their respective content and automatically transitions between slides without user interaction.

Tags : regression

Steps:

1.)Navigate to the Henry Schein website.
2.)Confirm that the Sign In button is visible.
3.)Enter a valid username and password.
4.)Click the Sign In button.
5.)Verify that the banner is displayed on the home page.
6.)Verify that the banner slides automatically without any user interaction.*/

test("11-Verify that the banner slider displays all slides with their respective content and transitions between slides when the Navigation Arrows buttons are clicked.",
   {
      tag: ['@regression', '@slider'],
   },
   async ({ page, home, config }) => {

      await test.step("Step 1: Navigate to the Henry Schein website.", async () => {
         await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 10000)
         console.log("Navigated to  Henry Schein url")
      })
      await test.step("Step 2: Confirm that the Sign In button is visible.", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 20000)
         console.log("Verified the sign in button should be visible on the home page")
      })

      await test.step("Step 3: Enter a valid username and password.", async () => {
         await CommonMethods.safeClick(page, home.sign_in_xpath, 15000)
         await CommonMethods.writeText(page, home.username_xpath, config.username, 10000)
         await CommonMethods.writeText(page, home.password_xpath, config.password, 10000)
         console.log("Entered the username and password")
      })

      await test.step("Step 4: Click the Sign In button.", async () => {
         await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
         console.log("clicked the sign-in submit button")
      })

      await test.step("Step 5: Verify that the banner is displayed on the home page.", async () => {
         await CommonMethods.isElementDisplayed(page, home.sliderBanner_xpath)
         console.log("The banner is displayed")
      })

      await test.step("Step 6: Verify that the banner slides when the user clicks Navigation Arrows buttons .", async () => {
         const bannerSlides: string[] = [];
         for (let i = 0; i < 10; i++) {
            const bannerSlidesInfo = await CommonMethods.getTextFromElement(page, home.sliderBannerActive_xpath)
            if (bannerSlidesInfo) {
               bannerSlides.push(bannerSlidesInfo)
            }
            else {
               throw new Error(`Banner slide text is null at iteration ${i}`);
            }
            await CommonMethods.safeClick(page, home.slideNavButton, 10000)
         }
         const UniqueSlides = new Set(bannerSlides)
         console.log(UniqueSlides)
         expect(UniqueSlides.size).toBe(5)
      })

   })

/*
11)Testcase-11 : Verify Footer Links Are Interactive and Navigate to respective pages 

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

test('11-Verify Footer Links Are Interactive and Navigate to respective pages',
   {
      tag: ['@regression', '@footer'],
   },
   async ({ page, home, config }) => {

      await test.step("Step 1: Navigate to  Henry Schein url", async () => {
         await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000)
         console.log("Navigated to  Henry Schein url")
      })
      await test.step("Step 2: Click Sign-In button on the home page to log in", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 20000)
         console.log("Clicked the Sign-In button on home page")
      })
      await test.step("Step 3: Enter the username and password", async () => {
         await CommonMethods.safeClick(page, home.sign_in_xpath, 35000)
         await CommonMethods.writeText(page, home.username_xpath, config.username, 10000)
         await CommonMethods.writeText(page, home.password_xpath, config.password, 10000)
         console.log("Entered the username and password")
      })
      await test.step("Step 4: Click the sign-in submit button", async () => {
         await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
         console.log("Clicked the sign-in submit button")
      })
      await test.step("Step 5: Verify the user is successfully logged in", async () => {
         await CommonMethods.isElementDisplayed(page, home.user_account_tab_xpath, 25000)
         console.log("Verified the user is successfully logged in")
      })
      await test.step("Step 6: Click Legal Terms link on footer section", async () => {
         await CommonMethods.safeClick(page, home.footer_Legal_Terms, 3000)
         console.log("Clicked Legal Terms Link")
      })
      await test.step("Step 7: Link should navigate to Legal Terms Page", async () => {
         await expect(page).toHaveURL('https://www.henryschein.co.uk/about/terms-and-conditions');
         console.log("Verified the page is navigated to Legal Terms page")
      })
      await test.step("Step 8: Click Privacy Notice link on footer section", async () => {
         await CommonMethods.safeClick(page, home.footer_Privacy_Notice, 30000)
         console.log("Clicked Privacy Notice Link")
      })
      await test.step("Step 9: Link should navigate to Privacy Notice Page", async () => {
         await expect(page).toHaveURL('https://www.henryschein.co.uk/about/privacy-notice');
         console.log("Verified the page is navigated to Privacy Notice page")
      })
      await test.step("Step 10: Click Delivery and Returns link on footer section", async () => {
         await CommonMethods.safeClick(page, home.footer_Delivery_and_Returns, 3000)
         console.log("Clicked Delivery and Returns Link")
      })
      await test.step("Step 11: Link should navigate to Delivery and Returns page", async () => {
         await expect(page).toHaveURL('https://www.henryschein.co.uk/about/delivery-and-returns');
         console.log("Verified the page is navigated to Delivery and Returns page")
      })
      await test.step("Step 12: Click LinkedIn link on footer section & wait for new tab", async () => {
         const [linkedinPage] = await Promise.all([page.context().waitForEvent('page'), CommonMethods.safeClick(page, home.footer_LinkedIn)]);
         console.log("Clicked LinkedIn Link");
         // Wait for LinkedIn page to load",async()=>{
         await linkedinPage.waitForLoadState('domcontentloaded');
      })
      await test.step("Step 13: Verify LinkedIn URL", async () => {
         const [linkedinPage] = await Promise.all([page.context().waitForEvent('page'), CommonMethods.safeClick(page, home.footer_LinkedIn)]);
         await expect(linkedinPage).toHaveURL('https://www.linkedin.com/showcase/henry-schein-medical-uk/?viewAsMember=true');
         console.log("Verified navigation to LinkedIn page");
      })
   })

/*
12)Testcase-12 : Verify that the user cannot sign in with invalid credentials (Failure case)
*/
test('12-To Verify the error message for invalid login credentials',
   {
      tag: ['@regression', '@signin', '@failure_case' ],
   },
   async ({ page, home, config }) => {

      await test.step("Step 1: Navigate to  HenrySchein url", async () => {
         await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000)
         console.log("Navigated to  HenrySchein url")
      })
      await test.step("Step 2: Verify the sign in button should be visible on the home page", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 30000)
         console.log("Verified the sign in button should be visible on the home page")
      })
      await test.step("Step 3: Enter invalid username and password", async () => {
         await CommonMethods.safeClick(page, home.sign_in_xpath, 35000)
         await CommonMethods.writeText(page, home.username_xpath, config.invalid_username, 30000)
         await CommonMethods.writeText(page, home.password_xpath, config.invalid_password, 30000)
         console.log("Entered invalid username and password")
      })
      await test.step("Step 4: Click the sign-in submit button", async () => {
         await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
         console.log("Clicked the sign-in submit button")
      })
      await test.step("Step 5: Verify the user cannot sign in successfully", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_in_error_msg_xpath, 30000)
         console.log("Please enter valid Username/Password")
         const errorMsg = (home.sign_in_error_msg_xpath);
         await expect(errorMsg).toBeVisible();
         await expect(errorMsg).toContainText('Please enter valid Username/Password');
      })

   })
















   
   /*
08)Testcase-08: Verify User Is Able to Place an Order Successfully 
1.Navigate to  Henry Schein url
2.Click Sign-In button on the home page to log in
3.Enter valid username and password
4.click the sign-in submit button
5.Verify the user is successfully logged in
6.Add a product to the cart
5.Navigate to the cart page
6.Verify the product is added to the cart
7.Click Proceed to Checkout
8.Review order summary


test('08-Verify User Is Able to Place an Order Successfully',
   {
      tag: ['@regression', '@warmup', '@order'],
   },
   async ({ page, home, config }) => {

      await test.step("Step 1: Navigate to  Henry Schein url", async () => {
         await CommonMethods.navigateToPageUKMedical(page, config.appUrl, 30000)
         console.log("Navigated to  Henry Schein url")
      })
      await test.step("Step 2: Click Sign-In button on the home page to log in", async () => {
         await CommonMethods.isElementDisplayed(page, home.sign_in_xpath, 20000)
         console.log("Clicked the Sign-In button on home page")
      })
      await test.step("Step 3: Enter the username and password", async () => {
         await CommonMethods.safeClick(page, home.sign_in_xpath, 35000)
         await CommonMethods.writeText(page, home.username_xpath, config.username, 10000)
         await CommonMethods.writeText(page, home.password_xpath, config.password, 10000)
         console.log("Entered the username and password")
      })
      await test.step("Step 4: Click the sign-in submit button", async () => {
         await CommonMethods.safeClick(page, home.sign_in_submit_btn_xpath)
         console.log("Clicked the sign-in submit button")
      })
      await test.step("Step 5: Verify the user is successfully logged in", async () => {
         await CommonMethods.isElementDisplayed(page, home.user_account_tab_xpath, 25000)
         console.log("Verified the user is successfully logged in")
      })
      await test.step("Step 6: Add product to cart", async () => {
         await CommonMethods.writeText(page, home.search_input, "DIS258", 30000);
         await page.keyboard.press("Enter");
         console.log("Entered Product Id to search");
      })
      await test.step("Step 7: Clicked product", async () => {
         await CommonMethods.safeClick(page, home.product_1)
         console.log("Selected Product");
      })
      await test.step("Step 8: Added product to cart", async () => {
         await CommonMethods.safeClick(page, home.Add_to_basket)
         console.log("Added Product to Cart");
      })
      await test.step("Step 9: Navigate to cart and verify product", async () => {
         await CommonMethods.safeClick(page, home.view_basket);
         console.log("Clicked View Basket button")
      })
      await test.step("Step 10: Proceed to checkout", async () => {
         await CommonMethods.isElementDisplayed(page, home.Proceed_Shipping_Billing, 10000)
         console.log("Proced to checkout is available")
         const checkoutBtn = (home.Proceed_Shipping_Billing)
         await checkoutBtn.waitFor({ state: 'visible', timeout: 30000 });
         await checkoutBtn.scrollIntoViewIfNeeded();
         await checkoutBtn.click();
         const Cart_Page = (home.Cart_Page)
         await expect(Cart_Page).toContainText('Shipping & Billing')
      })

      await test.step("Step 11: Review Order Summary", async () => {
         await CommonMethods.safeClick(page, home.Review_Order, 30000)
         const Review_Order_Page = (home.Review_Order_Page)
         await expect(Review_Order_Page).toContainText('Review Order')
      })
   })
*/
