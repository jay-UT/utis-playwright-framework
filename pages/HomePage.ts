import {Page,expect,Locator} from '@playwright/test'
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

    //constructor
    constructor(page:Page){
       this.page=page
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
    }
    async isHomePageExist(){
        let title:string =await this.page.title()
        if(title){
            return true
        }
        return false
        

    }

 
}