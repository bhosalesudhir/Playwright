import { Locator, Page } from "@playwright/test"
import { envConfig } from "../../../../playwright.config"

export class LoginPage {
    private usernameInput:Locator ;
    private passwordInput :Locator ;
    private loginButton :Locator ;
    private page: Page


    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByText('Login');
    }


    async Launch(url: string="") {

        if (url !== '')
            await this.page.goto(url);
        else  
            await this.page.goto(envConfig.URL) ;    
        
        await this.page.waitForLoadState('networkidle');
        await  this.loginButton.waitFor({ state: 'visible' });


    }
    async loginToApp(username: string="", password: string="") {

        if (username === '')
            username = envConfig.Username;
        await this.usernameInput.fill( username);
        if (password === '')
                password = envConfig.Password;
        await this.passwordInput.fill( password);
        
        await this.loginButton.click();
    }
}