import { Locator, Page } from "@playwright/test"
import { envConfig } from "../../../../playwright.config"

export class LoginPage {
    private usernameInput:Locator ;
    private passwordInput :Locator ;
    private loginButton :Locator ;
    private page: Page


    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#loginButton');
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
            username = envConfig.USERNAME;
        await this.usernameInput.fill( username);
        if (password === '')
                password = envConfig.PASSWORD;
        await this.passwordInput.fill( password);
        
        await this.loginButton.click();
    }
}