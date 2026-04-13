import {test as base} from '@playwright/test';
import { LoginPage } from '../login/pajeObject/loginPage';

type FeFixture = {
    loginPage: LoginPage

}
export const test = base.extend< FeFixture> ({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
})