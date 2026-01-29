import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homepage'
import { CommonMethods } from './commonSteps'
import { TestConfig} from '../test.config'
import { TestHooks } from './hooks';

type Fixtures = {
  home: HomePage;
  config: TestConfig;
};

export const test = base.extend<Fixtures>({
  home: async ({ page }, use) => {
    const { home } = await TestHooks.beforeEach(page);
    await use(home);
    await TestHooks.afterEach(page);
  },

  config: async ({ page }, use) => {
    const { config } = await TestHooks.beforeEach(page);
    await use(config);
  },
});

export { expect } from '@playwright/test';