import { Page, expect, Locator } from '@playwright/test'
import path from 'node:path';

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
    public readonly address_tooltip_xpath:Locator;
    public readonly sliderBanner_xpath:Locator;
    public readonly sliderBannerActive_xpath:Locator;
    public readonly slideNavButton:Locator;
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

    //constructor
    constructor(page: Page) {
        this.page = page
        this.icon_xpath = page.locator("(//div[@class='logo'])[1]")
        this.sign_in_xpath = page.locator("//button[contains(@id,'sign-in')]")
        this.username_xpath = page.locator("//input[@data-placeholder='Username']")
        this.password_xpath = page.locator("//input[@data-placeholder='password']")
        this.sign_in_submit_btn_xpath=page.locator("//button[@type='submit']")
        this.user_account_tab_xpath=page.locator("//li[@class='userdetails-mbl']")
        this.sign_in_error_icon_xpath=page.locator("//div[@class='errorIcon']")
        this.sign_in_error_msg_xpath=page.locator("//div[@class='errorIcon']/following::div[contains(@class,'errorMessage')]")
        this.address_tooltip_xpath=page.locator("(//div[@class='address-info cursor-pointer'])[1]")
        this.sliderBanner_xpath = page.locator("//div[@class='carousel slide hero-carousel-container']")
        this.sliderBannerActive_xpath=page.locator("//div[@class='carousel-item active']")
        this.slideNavButton=page.locator("(//span[@class='carousel-control-next-icon'])[1]")
    //Action methods
        this.sign_in_submit_btn_xpath = page.locator("//button[@type='submit']")
        this.user_account_tab_xpath = page.locator("//li[@class='userdetails-mbl']")
        this.sign_in_error_icon_xpath = page.locator("//div[@class='errorIcon'][1]")
        this.sign_in_error_msg_xpath = page.locator("//div[@data-test-id='login.unknownKey1']")
        this.main_menu = page.locator("//span[@data-test-id='mega_menu_component_span_41']")
        this.main_menu_Corporate = page.locator("//a[@data-test-id='menu_list_component_a_4' and contains(@title,'Corporate')]")
        this.main_menu_About_HenrySchein = page.locator("//a[@data-test-id='menu_list_component_a_4' and contains(@title,'About Henry Schein')]")
        //main_menu_Blog = //a[@data-test-id='menu_list_component_a_4' and contains(@title,'Blog')]
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
        this.footer_Legal_Terms=page.locator("//a[text()=' Legal Terms ']")
        this.footer_Privacy_Notice=page.locator("//a[text()=' Privacy Notice ']")
        this.footer_Delivery_and_Returns = page.locator("//a[text()=' Delivery and Returns ']")
        this.footer_LinkedIn = page.locator("//a[@text='Follow HenrySchein on linkedIn link ']")
        

    }
    async isHomePageExist() {
        let title: string = await this.page.title()
        if (title) {
            return true
        }
        return false


    }


}