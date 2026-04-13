import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '..envConfiguration') });
import { auto2025dot40ca } from './src/env/auto2025dot40ca';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */


const environmentConfigs: {[key:string]:any} = {
 "auto2025dot40ca": auto2025dot40ca
};



const timestamp = new Date().toLocaleString('en-GB', {  day: '2-digit',  month: 'short',  year: 'numeric',  hour: '2-digit',  minute: '2-digit',  second: '2-digit',  hour12: false}).replace(/[,:]/g, '');

const reportName = path.resolve(`playwright-report/Report-${timestamp}`);

const environment = process.env.Enviorment || 'auto2025dot40ca';
console.log(`Running tests on environment: ${environment}`);

export const envConfig= environmentConfigs['auto2025dot40ca'];

export default defineConfig({
 testDir: './src',
 testMatch: '**/*.{spec,test}.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: `${reportName}`, open: 'never' }]],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name:"FE-Login",
      testMatch: 'FE/*.spec.ts',
    }
    
  ],

  
});
