const logger = require('../utils/logger');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async waitForElement(selector, options = {}) {
        try {
            await this.page.waitForSelector(selector, { 
                state: 'visible',
                timeout: 10000,
                ...options 
            });
            logger.info(`Element found: ${selector}`);
        } catch (error) {
            logger.error(`Failed to find element: ${selector}`, { error: error.message });
            throw new Error(`Element not found: ${selector}. Error: ${error.message}`);
        }
    }

    async click(selector, options = {}) {
        try {
            await this.waitForElement(selector);
            await this.page.click(selector, options);
            logger.info(`Clicked element: ${selector}`);
        } catch (error) {
            logger.error(`Failed to click element: ${selector}`, { error: error.message });
            throw new Error(`Failed to click element: ${selector}. Error: ${error.message}`);
        }
    }

    async type(selector, text, options = {}) {
        try {
            await this.waitForElement(selector);
            await this.page.fill(selector, text, options);
            logger.info(`Typed text into element: ${selector}`);
        } catch (error) {
            logger.error(`Failed to type into element: ${selector}`, { error: error.message });
            throw new Error(`Failed to type into element: ${selector}. Error: ${error.message}`);
        }
    }

    async getText(selector) {
        try {
            await this.waitForElement(selector);
            const text = await this.page.textContent(selector);
            logger.info(`Got text from element: ${selector}`);
            return text;
        } catch (error) {
            logger.error(`Failed to get text from element: ${selector}`, { error: error.message });
            throw new Error(`Failed to get text from element: ${selector}. Error: ${error.message}`);
        }
    }

    async isVisible(selector) {
        try {
            const isVisible = await this.page.isVisible(selector);
            logger.info(`Checked visibility of element: ${selector} - ${isVisible}`);
            return isVisible;
        } catch (error) {
            logger.error(`Failed to check visibility of element: ${selector}`, { error: error.message });
            throw new Error(`Failed to check visibility of element: ${selector}. Error: ${error.message}`);
        }
    }

    async waitForLoadState(state = 'networkidle') {
        try {
            await this.page.waitForLoadState(state);
            logger.info(`Page loaded with state: ${state}`);
        } catch (error) {
            logger.error(`Failed to wait for page load state: ${state}`, { error: error.message });
            throw new Error(`Failed to wait for page load state: ${state}. Error: ${error.message}`);
        }
    }
}

module.exports = BasePage; 