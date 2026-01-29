import { Page, expect, Locator } from '@playwright/test'

export class CommonMethods {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page
  }

  static async navigateToPageUKMedical(
    page: Page,
    url: string,
    timeout: number = 30000
  ): Promise<boolean> {
    try {
      await page.goto(url, { timeout });
      await page.waitForLoadState('domcontentloaded', { timeout });
      await page.waitForLoadState('networkidle', { timeout });

      // Accept cookies if present
      try {
        const acceptButton = page.locator('button:has-text("Accept")');
        await acceptButton.waitFor({ timeout: 50000 });
        await acceptButton.click();
        //console.log(`Cookies accepted on ${url}`);
      } catch (error) {
        //console.log(`[INFO] No cookies popup found or failed to click: ${error}`);
      }

      // Click UK Medical
      try {
        const ukMedicalXpath = "//div[text()='UK Medical']";
        const ukMedical = page.locator(ukMedicalXpath);
        await ukMedical.waitFor({ timeout: 50000 });
        await ukMedical.click();
        // console.log(`'UK Medical' clicked on ${url}`);
      } catch (error) {
        // console.log(`[INFO] 'UK Medical' element not found or failed to click: ${error}`);
      }

      return true;

    } catch (error) {
      console.error(`[ERROR] Navigation failed to ${url}: ${error}`);
      return false;
    }
  }

  static async safeClick(
    page: Page,
    Locator: Locator,
    timeout: number = 35000
  ): Promise<void> {
    await expect(Locator).toBeVisible({ timeout });
    await Locator.click();
  }

  static logConsoleMessage(msg: any): void {
    console.log(`[CONSOLE] ${msg.text()}`);
  }

  static async isElementDisplayed(
    page: Page,
    Locator: Locator,
    timeout: number = 35000
  ): Promise<boolean> {
    try {
      //const element = page.locator(selector);
      await Locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch (error) {
      console.error(`[ERROR] Element is not displayed ${Locator}: ${error}`);
      return false;
    }
  }

  static async writeText(
    page: Page,
    Locator: Locator,
    text: string,
    timeout: number = 15000
  ): Promise<void> {
    //const locator = page.locator(selector);
    await Locator.waitFor({ state: 'visible', timeout });
    await Locator.fill(text);
  }

  static async getTextFromElement(
    page: Page,
    //selector: string
    Locator: Locator,
  ): Promise<string | null> {
    //return await page.locator(selector).textContent();
    return await Locator.textContent();
  }
}