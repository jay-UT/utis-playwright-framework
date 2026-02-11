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

    }
    async isHomePageExist() {
        let title: string = await this.page.title()
        if (title) {
            return true
        }
        return false
    }

    async ClickIcon(){
        try{
        await CommonMethods.safeClick(this.page,this.icon_xpath)
        }
        catch(error){
            console.log(`Exception occurs while clicking the icon :"${error}`)
            throw error;
        }
    }
     
    async ClickSignIn(){
        try{    
            await CommonMethods.safeClick(this.page,this.sign_in_xpath)
        }
        catch(error){
            console.log(`Exception occurs while clicking the sign in :" ${error}`)
            throw error;
        }
    }

    async FillUsername(username : string){
        try {
            await CommonMethods.writeText(this.page,this.username_xpath,username)
        }catch(error){
            console.log(`Exception occurs while writing the username :" ${error}`)
            throw error;
        }
    }

    async FillPassword(password : string){
        try{
            await CommonMethods.writeText(this.page,this.password_xpath,password)
        }catch(error){
            console.log(`Exception occurs while writing the password :" ${error}`)
            throw error;
        }
    }

    async ClickSignInSubmitButton(){
        try {
            await CommonMethods.safeClick(this.page,this.sign_in_submit_btn_xpath)
        } catch (error) {
            console.log(`Exception occurs while clicking the sign in submit button:" ${error}`)
            throw error;
        }
    }

    async ClickSignUpButton(){
        try {
            await CommonMethods.safeClick(this.page,this.sign_up_xpath)
        } catch (error) {
            console.log(`Exception occurs while clicking the sign up button:" ${error}`)
            throw error;
        }
    }

    async FillRegistrationUsername(regUsername : string){
        try {
            await CommonMethods.writeText(this.page, this.reg_username_input, regUsername)
        } catch (error) {
            console.log(`Exception occurs while filling the username for registration:" ${error}`)
            throw error;
        }
    }

    async FillRegistrationPassword(regPassword : string){
        try {
            await CommonMethods.writeText(this.page, this.reg_password_input, regPassword)
        } catch (error) {
            console.log(`Exception occurs while filling the password for registration:" ${error}`)
            throw error;
        }
    }

    async FillRegistrationConfirmPassword(cnfRegPassword : string){
        try {
            await CommonMethods.writeText(this.page,this.reg_confirm_password_input,cnfRegPassword)
        } catch (error) {
            console.log(`Exception occurs while filling the confirm password for registration:" ${error}`)
            throw error;
        }
    }

    async FillRegistrationEmail(email : string){
        try {
            await CommonMethods.writeText(this.page,this.reg_email_input,email)
        } catch (error) {
            console.log(`Exception occurs while filling the email for registration:" ${error}`)
            throw error;
        }
    }
    async ClickRegistrationNextButton(){
        try {
            await CommonMethods.safeClick(this.page,this.reg_next_step_btn)
        } catch (error) {
            console.log(`Exception occurs while clicking the next button in registration:" ${error}`)
            throw error;
        }
    }
    async ClickRegistrationContinueButton(){
        try {
            await CommonMethods.safeClick(this.page,this.continue_btn)
        } catch (error) {
            console.log(`Exception occurs while clicking the continue button in registration:" ${error}`)
            throw error;
        }
    }

    async FillTextInSearchBar(searchInput : string){
        try {
            await CommonMethods.writeText(this.page,this.search_input,searchInput)
        } catch (error) {
            console.log(`Exception occurs when the search is not happend" ${error}`)
            throw error;
        }  
    }

    async ClickTopSupplies(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_Top_Supplies)
        } catch (error) {
            console.log(`Exception occurs when clicking the top supplies" ${error}`)
            throw error;
        }
    }

    async ClickTopEquipment(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_Top_Equipment)
        } catch (error) {
            console.log(`Exception occurs when clicking the top equipment" ${error}`)
            throw error;
        }
    } 

    async ClickPharmaceuticals(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_Pharmaceuticals)
        } catch (error) {
            console.log(`Exception occurs when clicking the Pharmaceuticals" ${error}`)
            throw error;
        }
    }

    async ClickFurnitureDetail(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_Furniture)
        } catch (error) {
            console.log(`Exception occurs when clicking the furniture details" ${error}`)
            throw error;
        }
    }
    
    async ClickMainMenuDashboard(){
        try {
            await CommonMethods.safeClick(this.page,this.main_menu_My_Dashboard)
        } catch (error) {
            console.log(`Exception occurs when clicking the Dashboard" ${error}`)
            throw error;
        }
        
    }

}