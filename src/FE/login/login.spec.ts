import { test } from '../../FE/Fixture/FeFixture';
import { expect } from '@playwright/test';

test.beforeEach(async ({ loginPage,page }) => {
  await loginPage.Launch();
  await loginPage.loginToApp();
  
});
test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  
});
