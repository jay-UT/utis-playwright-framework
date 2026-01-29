import { Page } from '@playwright/test';
import { HomePage } from '../pages/homepage'
import { CommonMethods } from './commonSteps'
import { TestConfig} from '../test.config'

export class TestHooks {

  static async beforeEach(page: Page) {
    const config = new TestConfig();
    const home = new HomePage(page);

    // await CommonMethods.navigateToPageUKMedical(
    //   page,
    //   config.appUrl,
    //   10000
    // );

    return { home, config };
  }

  static async afterEach(page: Page) {
    await page.close();
  }
}