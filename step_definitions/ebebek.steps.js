const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const LoginPage = require('../pages/login.page');
const SearchPage = require('../pages/search.page');
const ProductPage = require('../pages/product.page');
const AccountPage = require('../pages/account.page');
require('dotenv').config();

// Set a higher default timeout (30 seconds)
setDefaultTimeout(30000);

let browser;
let page;
let loginPage;
let searchPage;
let productPage;
let accountPage;

Given('I am on the e-bebek homepage', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    searchPage = new SearchPage(page);
    productPage = new ProductPage(page);
    accountPage = new AccountPage(page);
    await page.goto('https://www.e-bebek.com');
});

When('I click on the login button', async function () {
    await loginPage.navigateToLoginPage();
});

When('I enter valid credentials', async function () {
    const email = process.env.EBEBEK_EMAIL;
    const password = process.env.EBEBEK_PASSWORD;
    
    if (!email || !password) {
        throw new Error('Email and password must be set in .env file');
    }
    
    await loginPage.login(email, password);
    await page.waitForTimeout(5000);
});

Then('I should be logged in successfully', async function () {
    await page.goto('https://www.e-bebek.com/my-account/update-profile');
    await page.waitForLoadState('networkidle');
    const isProfilePage = await accountPage.verifyProfilePage();
    if (!isProfilePage) {
        throw new Error('Login failed - profile page header not found');
    }
    console.log('Successfully verified login!');
});

When('I search for {string}', async function (product) {
    await searchPage.searchProduct(product);
});

Then('I should see search results', async function () {
    await searchPage.verifySearchResults();
});

When('I select the first product', async function () {
    await searchPage.selectFirstProduct();
});

When('I add the product to basket', async function () {
    await productPage.addToBasket();
});

Then('the product should be added successfully', async function () {
    await productPage.goToBasket();
    await productPage.verifyProductAdded();
});

When('I logout from the website', async function () {
    await accountPage.logout();
});

Then('I should be logged out successfully', async function () {
    await accountPage.verifyLogout();
});

After(async function () {
    if (browser) {
        await browser.close();
    }
}); 