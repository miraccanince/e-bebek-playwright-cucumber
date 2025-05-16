const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

class CustomWorld {
    async init() {
        this.browser = await chromium.launch({ headless: false });
        this.page = await this.browser.newPage();
    }

    async cleanup() {
        await this.browser.close();
    }
}

setWorldConstructor(CustomWorld);

module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['step_definitions/*.js'],
        format: [
            'progress-bar',
            ['allure-cucumberjs', './allure-results']
        ],
        publishQuiet: true
    }
}; 