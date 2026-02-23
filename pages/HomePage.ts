import { Page, expect, Locator } from '@playwright/test'
import path from 'node:path';
import { CommonMethods } from '../utils/commonSteps';
import { compileFunction } from 'node:vm';

export class HomePage {
    //Locators
    public readonly page: Page;
    public readonly icon_xpath: Locator;
    public readonly sign_in_xpath: Locator;
    public readonly username_xpath: Locator;
    public readonly password_xpath: Locator;
    public readonly sign_in_submit_btn_xpath: Locator;
    public readonly user_account_tab_xpath: Locator;
    public readonly sign_in_error_icon_xpath: Locator;
    public readonly sign_in_error_msg_xpath: Locator;
    public readonly address_tooltip_xpath: Locator;
    public readonly sliderBanner_xpath: Locator;
    public readonly sliderBannerActive_xpath: Locator;
    public readonly slideNavButton: Locator;
    public readonly main_menu: Locator;
    public readonly main_menu_Corporate: Locator;
    public readonly main_menu_About_HenrySchein: Locator;
    public readonly main_menu_Top_Supplies: Locator;
    public readonly main_menu_Top_Supplies_detail: Locator;
    public readonly main_menu_Top_Equipment: Locator;
    public readonly main_menu_Top_Equipment_detail: Locator;
    public readonly main_menu_Pharmaceuticals: Locator;
    public readonly main_menu_Pharmaceuticals_details: Locator;
    public readonly main_menu_Furniture: Locator;
    public readonly main_menu_Furniture_details: Locator;
    public readonly main_menu_Clearance: Locator;
    public readonly main_menu_Blog: Locator;
    public readonly main_menu_My_Dashboard: Locator;
    public readonly main_menu_Order_From_History: Locator;
    public readonly main_menu_My_Dashboard_details: Locator;
    public readonly footer_Legal_Terms: Locator;
    public readonly footer_Privacy_Notice: Locator;
    public readonly footer_Delivery_and_Returns: Locator;
    public readonly footer_LinkedIn: Locator;
    public readonly accept_cookies_btn: Locator;
    public readonly sign_up_xpath: Locator;
    public readonly reg_username_input: Locator;
    public readonly reg_email_input: Locator;
    public readonly reg_password_input: Locator;
    public readonly reg_confirm_password_input: Locator;
    public readonly reg_next_step_btn: Locator;
    public readonly continue_btn: Locator;
    public readonly search_input: Locator;
    public readonly product_1: Locator;
    public readonly view_basket_qty: Locator;
    public readonly Add_to_basket: Locator;
    public readonly cart_items: Locator;
    public readonly Proceed_Shipping_Billing: Locator;
    public readonly Cart_Page: Locator;
    public readonly Review_Order: Locator;
    public readonly Review_Order_Page: Locator;
    public readonly view_basket: Locator;
    //Amazon variables
    public readonly amazonSearchBar : Locator;
    public readonly amazonSearchIcon : Locator;
    public readonly freeShipping : Locator;
    public readonly amazonAddToCartBtn : Locator;
    public readonly amazonCartIcon : Locator;
    public readonly freeShippingText : Locator;
    public readonly product_title : Locator;
    public readonly proceedToBuyBtn : Locator;
    public readonly subtotal : Locator; 
    //constructor
    constructor(page: Page) {
        this.page = page;
        this.icon_xpath = page.locator("(//div[@class='logo'])[1]");
        this.sign_in_xpath = page.locator("//button[contains(@id,'sign-in')]");
        this.username_xpath = page.locator("//input[@data-placeholder='Username']");
        this.password_xpath = page.locator("//input[@data-placeholder='password']");
        this.sign_in_submit_btn_xpath = page.locator("//button[@type='submit']");
        this.user_account_tab_xpath = page.locator("//li[@class='userdetails-mbl']");
        this.sign_in_error_icon_xpath = page.locator("//div[@class='errorIcon']");
        this.sign_in_error_msg_xpath = page.locator("//div[@class='errorIcon']/following::div[contains(@class,'errorMessage')]");
        this.sign_up_xpath = page.locator("//span[@class='signUp ng-star-inserted']");
        this.reg_username_input = page.locator("[data-test-id='username-input']");
        this.accept_cookies_btn = page.locator("//button[contains(text(),'Accept') or contains(text(),'Allow')]");
        this.reg_email_input = page.locator("[data-test-id='email-input']");
        this.reg_password_input = page.locator("[data-test-id='new-pass-Input']");
        this.reg_confirm_password_input = page.locator("[data-test-id='confirm-pass-input']");
        this.reg_next_step_btn = page.locator("[data-test-id='next-step-button']");
        this.continue_btn = page.locator("//button[normalize-space()='Continue']");
        this.search_input = page.locator("//input[@data-test-id='RecipientUsername']");
        this.address_tooltip_xpath = page.locator("(//div[@class='address-info cursor-pointer'])[1]")
        this.sliderBanner_xpath = page.locator("//div[@class='carousel slide hero-carousel-container']")
        this.sliderBannerActive_xpath = page.locator("//div[@class='carousel-item active']")
        this.slideNavButton = page.locator("(//span[@class='carousel-control-next-icon'])[1]")
        //Action methods
        this.sign_in_submit_btn_xpath = page.locator("//button[@type='submit']")
        this.user_account_tab_xpath = page.locator("//li[@class='userdetails-mbl']")
        this.sign_in_error_icon_xpath = page.locator("//div[@class='errorIcon'][1]")
        this.sign_in_error_msg_xpath = page.locator("//div[@data-test-id='login.unknownKey1']")
        this.main_menu = page.locator("//span[@data-test-id='mega_menu_component_span_41']")
        this.main_menu_Corporate = page.locator("//a[@data-test-id='menu_list_component_a_4' and contains(@title,'Corporate')]")
        this.main_menu_About_HenrySchein = page.locator("//a[@data-test-id='menu_list_component_a_4' and contains(@title,'About Henry Schein')]")
        this.main_menu_Top_Supplies = page.locator("//button[@data-test-id='mega_menu_component_button_37']//span[contains(normalize-space(),'Top Supplies')]")
        this.main_menu_Top_Supplies_detail = page.locator("//div[contains(@class,'equipment-details')]//h3[contains(normalize-space(),'Top Supplies')]")
        this.main_menu_Top_Equipment = page.locator("//button[@data-test-id='mega_menu_component_button_37']//span[contains(normalize-space(),'Top Equipment')]")
        this.main_menu_Top_Equipment_detail = page.locator("//div[contains(@class,'equipment-details')]//h3[contains(normalize-space(),'Top Equipment')]")
        this.main_menu_Pharmaceuticals = page.locator("//button[@data-test-id='mega_menu_component_button_37']//span[contains(normalize-space(),'Pharmaceuticals')]")
        this.main_menu_Pharmaceuticals_details = page.locator("//div[contains(@class,'equipment-details')]//h3[contains(normalize-space(),'Pharmaceuticals')]")
        this.main_menu_Furniture = page.locator("//button[@data-test-id='mega_menu_component_button_37']//span[contains(normalize-space(),'Furniture')]")
        this.main_menu_Furniture_details = page.locator("//div[contains(@class,'equipment-details')]//h3[contains(normalize-space(),'Furniture')]")
        this.main_menu_Clearance = page.locator("//a[@title='Clearance']")
        this.main_menu_Blog = page.locator("//span[@data-test-id='megaMenu.NavigationTitle2' and contains(normalize-space(),'Blog')]")
        this.main_menu_My_Dashboard = page.locator("//button[@data-test-id='mega_menu_component_button_37']//span[contains(normalize-space(),'My Dashboard')]")
        this.main_menu_Order_From_History = page.locator("//span[@data-test-id='megaMenu.NavigationTitle2' and contains(normalize-space(),'Order From History')]")
        this.main_menu_My_Dashboard_details = page.locator("//div[@class='tab-pane collapse show']")
        this.footer_Legal_Terms = page.locator("//a[text()=' Legal Terms ']")
        this.footer_Privacy_Notice = page.locator("//a[text()=' Privacy Notice ']")
        this.footer_Delivery_and_Returns = page.locator("//a[text()=' Delivery and Returns ']")
        this.footer_LinkedIn = page.locator("//a[@text='Follow HenrySchein on linkedIn link ']")
        this.product_1 = page.locator("//div[@data-test-id='productdetails-standalone' and contains(.,'DIS258')]")
        this.Add_to_basket = page.locator("(//button[@data-test-id='pdp_button_addcart'])[1]")
        this.view_basket_qty = page.locator("//span[@data-test-id='cart_image_qty']")
        this.cart_items = page.locator("//h4[@data-test-id='cart-productname']")
        this.Proceed_Shipping_Billing = page.locator("//button[@data-test-id='cart_button_shippingbilling']")
        this.Cart_Page = page.locator("//span[@data-test-id='shippingBilling.ShippingBillingText1']")
        this.Review_Order = page.locator("//button[@data-test-id='shipping_button_revieworder']")
        this.Review_Order_Page = page.locator("//h1[@data-test-id='reviewOrder.ReviewOrderTitleText3']")
        this.view_basket = page.locator("//img[@data-test-id='cart_image_icon']")

        //Amazon locators
        this.amazonSearchBar =  page.getByRole('searchbox')
        this.amazonSearchIcon= page.locator('#nav-search-submit-button')
        this.freeShipping = page.locator("//span[contains(@data-csa-c-content-id,'p_n_free_shipping')]")
        this.amazonAddToCartBtn = page.locator("(//button[@aria-label='Add to cart'])[1]")
        this.amazonCartIcon = page.locator("//a[@id='nav-cart']")
        this.freeShippingText =  page.locator("(//div[@class='a-row a-color-base udm-primary-delivery-message'])[1]/div[@class='a-column a-span12']")
        this.product_title= page.locator("(//div[@class='a-section a-spacing-small a-spacing-top-small'])[1]//div[@data-cy='title-recipe']")
        this.proceedToBuyBtn = page.locator("//input[@name='proceedToRetailCheckout']")
        this.subtotal = page.locator("//span[@id='sc-subtotal-label-activecart']")
    }
    async isHomePageExist() {
        let title: string = await this.page.title()
        if (title) {
            return true
        }
        return false
    }

    async navigateToHsUKMedical(url : string){
        try{
        await CommonMethods.navigateToPageUKMedical(this.page,url);
        }
        catch(error){
            console.log(`Exception occurs while navigating to HS home page :"${error}`)
            throw error;
        }
    }
    async clickIcon(){
        try{
        await CommonMethods.safeClick(this.page,this.icon_xpath)
        }
        catch(error){
            console.log(`Exception occurs while clicking the icon :"${error}`)
            throw error;
        }
    }
     
    async clickSignIn(){
        try{    
            await CommonMethods.safeClick(this.page,this.sign_in_xpath)
        }
        catch(error){
            console.log(`Exception occurs while clicking the sign in :" ${error}`)
            throw error;
        }
    }

    async fillUsername(username : string){
        try {
            await CommonMethods.writeText(this.page,this.username_xpath,username)
        }catch(error){
            console.log(`Exception occurs while writing the username :" ${error}`)
            throw error;
        }
    }

    async fillPassword(password : string){
        try{
            await CommonMethods.writeText(this.page,this.password_xpath,password)
        }catch(error){
            console.log(`Exception occurs while writing the password :" ${error}`)
            throw error;
        }
    }

    async clickSignInSubmitButton(){
        try {
            await CommonMethods.safeClick(this.page,this.sign_in_submit_btn_xpath)
        } catch (error) {
            console.log(`Exception occurs while clicking the sign in submit button:" ${error}`)
            throw error;
        }
    }

    async clickSignUpButton(){
        try {
            await CommonMethods.safeClick(this.page,this.sign_up_xpath)
        } catch (error) {
            console.log(`Exception occurs while clicking the sign up button:" ${error}`)
            throw error;
        }
    }

    async fillRegistrationUsername(regUsername : string){
        try {
            await CommonMethods.writeText(this.page, this.reg_username_input, regUsername)
        } catch (error) {
            console.log(`Exception occurs while filling the username for registration:" ${error}`)
            throw error;
        }
    }

    async fillRegistrationPassword(regPassword : string){
        try {
            await CommonMethods.writeText(this.page, this.reg_password_input, regPassword)
        } catch (error) {
            console.log(`Exception occurs while filling the password for registration:" ${error}`)
            throw error;
        }
    }

    async fillRegistrationConfirmPassword(cnfRegPassword : string){
        try {
            await CommonMethods.writeText(this.page,this.reg_confirm_password_input,cnfRegPassword)
        } catch (error) {
            console.log(`Exception occurs while filling the confirm password for registration:" ${error}`)
            throw error;
        }
    }

    async fillRegistrationEmail(email : string){
        try {
            await CommonMethods.writeText(this.page,this.reg_email_input,email)
        } catch (error) {
            console.log(`Exception occurs while filling the email for registration:" ${error}`)
            throw error;
        }
    }
    async clickRegistrationNextButton(){
        try {
            await CommonMethods.safeClick(this.page,this.reg_next_step_btn)
        } catch (error) {
            console.log(`Exception occurs while clicking the next button in registration:" ${error}`)
            throw error;
        }
    }
    async clickRegistrationContinueButton(){
        try {
            await CommonMethods.safeClick(this.page,this.continue_btn)
        } catch (error) {
            console.log(`Exception occurs while clicking the continue button in registration:" ${error}`)
            throw error;
        }
    }

    async fillTextInSearchBar(searchInput : string){
        try {
            await CommonMethods.writeText(this.page,this.search_input,searchInput)
        } catch (error) {
            console.log(`Exception occurs when the search is not happend" ${error}`)
            throw error;
        }  
    }

    async clickTopSupplies(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_Top_Supplies)
        } catch (error) {
            console.log(`Exception occurs when clicking the top supplies" ${error}`)
            throw error;
        }
    }

    async clickTopEquipment(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_Top_Equipment)
        } catch (error) {
            console.log(`Exception occurs when clicking the top equipment" ${error}`)
            throw error;
        }
    } 

    async clickPharmaceuticals(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_Pharmaceuticals)
        } catch (error) {
            console.log(`Exception occurs when clicking the Pharmaceuticals" ${error}`)
            throw error;
        }
    }

    async clickFurnitureDetail(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_Furniture)
        } catch (error) {
            console.log(`Exception occurs when clicking the furniture details" ${error}`)
            throw error;
        }
    }
    
    async clickMainMenuDashboard(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_My_Dashboard)
        } catch (error) {
            console.log(`Exception occurs when clicking the Dashboard" ${error}`)
            throw error;
        }
        
    }

    async clickMainMenuClearance(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_Clearance)
        } catch (error) {
            console.log(`Exception occurs when clicking the Clearance" ${error}`)
            throw error;
        }
    }

    async clickMainMenuBlog(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_Blog)
        } catch (error) {
             console.log(`Exception occurs when clicking the Blog" ${error}`)
            throw error;
        }
    }
    
    async clickMainMenuOrderFromHistory(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_Order_From_History)
        } catch (error) {
           console.log(`Exception occurs when clicking the Order from history" ${error}`)
           throw error;
        }
    }

    async mouseHoverTooltip(){
        try {
            await CommonMethods.mouseOver(this.page,this.address_tooltip_xpath)
        } catch (error) {
           console.log(`Exception occurs when hovering hover tooltip" ${error}`)
           throw error;
        }
    }

    async clickBannerNavigationButton(){
        try {
            await CommonMethods.safeClick(this.page,this.slideNavButton)
        } catch (error) {
            console.log(`Exception occurs when clicking the navigation button" ${error}`)
            throw error;
        }
    }
    
    async clickFooterLegalTerms(){
        try {
            await CommonMethods.safeClick(this.page,this.footer_Legal_Terms)
        } catch (error) {
            console.log(`Exception occurs when clicking the footer legal terms" ${error}`)
            throw error;
        }
    }

    async clickFooterPrivacyNotice(){
        try {
            await CommonMethods.safeClick(this.page,this.footer_Privacy_Notice)
        } catch (error) {
            console.log(`Exception occurs when clicking the footer privacy notice" ${error}`)
            throw error;
        }
    }

    async clickFooterDeliveryAndReturns(){
        try {
            await CommonMethods.safeClick(this.page,this.footer_Delivery_and_Returns)
        } catch (error) {
            console.log(`Exception occurs when clicking the footer delivery and returns" ${error}`)
            throw error;
        }
    }
    
    async clickFooterLinkedIn(){
        try {
            await CommonMethods.safeClick(this.page,this.footer_LinkedIn)
        } catch (error) {
            console.log(`Exception occurs when clicking the footer linked_In" ${error}`)
            throw error;
        }
    }

    async fillTextInAmazonSearchBar(searchInput : string){
         try {
            await CommonMethods.writeText(this.page,this.amazonSearchBar,searchInput)
        } catch (error) {
            console.log(`Exception occurs when the search is not happend" ${error}`)
            throw error;
        }  
    }

    async clickAmazonSearchBtn(){
        try {
            await CommonMethods.safeClick(this.page,this.amazonSearchIcon)
        } catch (error) {
            console.log(`Exception occurs when clicking the search icon" ${error}`)
            throw error;
        }
    }

    async checkFreeShippingCheckBox(){
        try {
           // await CommonMethods.Check_CheckBox(this.page,this.freeShipping)
           await CommonMethods.safeClick(this.page,this.freeShipping)
        } catch (error) {
            console.log(`Exception occurs when free shipping checkbox is clicked" ${error}`)
            throw error;
        }
    }

    async clickAmazonAddToCartBtn(){
        try {
            await CommonMethods.safeClick(this.page,this.amazonAddToCartBtn)
        } catch (error) {
            console.log(`Exception occurs when Add to cart button is clicked" ${error}`)
            throw error;
        }
    }
    async clickAmazonCartIcon(){
        try {
            await CommonMethods.safeClick(this.page,this.amazonCartIcon)
        } catch (error) {
            console.log(`Exception occurs when cart Icon is clicked" ${error}`)
            throw error;
        }
    }
    
    async clickProceedtoBuyBtn(){
        try {
            await CommonMethods.safeClick(this.page,this.proceedToBuyBtn)
        } catch (error) {
            console.log(`Exception occurs when proceed to buy button is clicked" ${error}`)
            throw error;
        }
    }

    async isHSIconIsVisible(){
        try {
            await CommonMethods.isElementDisplayed(this.page,this.icon_xpath)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        }
    }

    async isSignInBtnVisible(){
        try {
            await CommonMethods.isElementDisplayed(this.page,this.sign_in_xpath)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        }
    }
    async isUserAccountTabVisible(){
        try {
            await CommonMethods.isElementDisplayed(this.page,this.user_account_tab_xpath)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        }
    }
    async isSignInErrorMsgVisible(){
         try {
            await CommonMethods.isElementDisplayed(this.page,this.sign_in_error_msg_xpath)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        }
    }

    async isSignUpBtnVisible(){
          try {
            await CommonMethods.isElementDisplayed(this.page,this.sign_up_xpath)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        }
    }

    async isSearchBarVisible(){
        try {
            await CommonMethods.isElementDisplayed(this.page,this.search_input)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        }
    }

    async isTopSuppliesBtnVisible(){
        try {
            await CommonMethods.isElementDisplayed(this.page,this.main_menu_Top_Supplies)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        }
    }
    async isTopEquipmentBtnVisible(){
       try {
            await CommonMethods.isElementDisplayed(this.page,this.main_menu_Top_Equipment)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        } 
    }

    async isPharmaceuticalsBtnVisible(){
        try {
            await CommonMethods.isElementDisplayed(this.page,this.main_menu_Pharmaceuticals)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        } 
    }

    async isFurnitureBtnVisible(){
        try {
            await CommonMethods.isElementDisplayed(this.page,this.main_menu_Furniture)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        } 
    }

    async isDashBoardBtnVisible(){
        try {
            await CommonMethods.isElementDisplayed(this.page,this.main_menu_My_Dashboard)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        } 
    }

    async isAddressToolTipVisible(){
       try {
            await CommonMethods.isElementDisplayed(this.page,this.address_tooltip_xpath)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        }  
    }

    async isSliderBannerVisible(){
        try {
            await CommonMethods.isElementDisplayed(this.page,this.sliderBanner_xpath)
        } catch (error) {
            console.log(`Exception occurs due to element is not displayed" ${error}`)
            throw error;
        } 
    }

    async clickAddToCartBtn(){
         try {
            await CommonMethods.safeClick(this.page,this.Add_to_basket)
        } catch (error) {
            console.log(`Exception occurs when clicking the add to basket button" ${error}`)
            throw error;
        } 
    }

    async clickBasketIcon(){
        try {
            await CommonMethods.safeClick(this.page,this.view_basket)
        } catch (error) {
            console.log(`Exception occurs when clicking the basket Icon" ${error}`)
            throw error;
        } 
    }
}