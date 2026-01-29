import {Page,Locator} from '@playwright/test'

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
    public readonly accept_cookies_btn: Locator;
    public readonly sign_up_xpath: Locator;
    public readonly reg_username_input: Locator;
    public readonly reg_email_input: Locator;
    public readonly reg_password_input: Locator;
    public readonly reg_confirm_password_input: Locator;
    public readonly reg_next_step_btn: Locator;
    public readonly continue_btn: Locator;
    public readonly search_input: Locator;

    




    



    //constructor
    constructor(page:Page){
       this.page=page;
       this.icon_xpath = page.locator("(//div[@class='logo'])[1]");
       this.sign_in_xpath = page.locator("//button[contains(@id,'sign-in')]");
        this.username_xpath = page.locator("//input[@data-placeholder='Username']");
        this.password_xpath = page.locator("//input[@data-placeholder='password']");
        this.sign_in_submit_btn_xpath=page.locator("//button[@type='submit']");
        this.user_account_tab_xpath=page.locator("//li[@class='userdetails-mbl']");
        this.sign_in_error_icon_xpath=page.locator("//div[@class='errorIcon']");
        this.sign_in_error_msg_xpath=page.locator("//div[@class='errorIcon']/following::div[contains(@class,'errorMessage')]");
        this.sign_up_xpath = page.locator("//span[@class='signUp ng-star-inserted']");
        this.reg_username_input = page.locator("[data-test-id='username-input']");
        this.accept_cookies_btn = page.locator("//button[contains(text(),'Accept') or contains(text(),'Allow')]");
        this.reg_email_input = page.locator("[data-test-id='email-input']");
        this.reg_password_input = page.locator("[data-test-id='new-pass-Input']");
        this.reg_confirm_password_input = page.locator("[data-test-id='confirm-pass-input']");
        this.reg_next_step_btn = page.locator("[data-test-id='next-step-button']");
        this.continue_btn = page.locator("//button[normalize-space()='Continue']");
        this.search_input = page.locator("//input[@data-test-id='RecipientUsername']");


        

        



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