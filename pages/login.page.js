const BasePage = require('./base.page');
const logger = require('../utils/logger');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.loginTabButton = '#btnLoginWithEmail';
        this.emailInput = '#txtEmail';
        this.initialLoginButton = 'button[aria-labelledby="login or register"]';
        this.welcomeHeader = 'h1.title-primary';
        this.passwordInput = '#txtPassword';
        this.submitButton = '#btnSubmitPassword';
        this.successElement = 'h2.title';
    }

    async navigateToLoginPage() {
        try {
            logger.info('Navigating to login page');
            await this.page.goto('https://www.e-bebek.com/login');
            await this.waitForLoadState();
            logger.info('Successfully navigated to login page');
        } catch (error) {
            logger.error('Failed to navigate to login page', { error: error.message });
            throw new Error(`Failed to navigate to login page: ${error.message}`);
        }
    }

    async login(email, password) {
        try {
            logger.info('Starting login process');
            await this.navigateToLoginPage();
            
            // Click on email login option
            logger.info('Clicking email login option');
            await this.click(this.loginTabButton);
            
            // Enter email
            logger.info('Entering email');
            await this.type(this.emailInput, email);
            
            // Click the initial login button
            logger.info('Clicking initial login button');
            await this.click(this.initialLoginButton);

            // Wait for welcome message
            logger.info('Waiting for welcome message');
            await this.waitForElement(this.welcomeHeader);
            
            // Enter password
            logger.info('Entering password');
            await this.type(this.passwordInput, password);
            
            // Click submit button
            logger.info('Clicking submit button');
            await this.click(this.submitButton);
            
            logger.info('Login process completed successfully');
        } catch (error) {
            logger.error('Login process failed', { error: error.message });
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    async verifyLoginSuccess() {
        try {
            logger.info('Verifying login success');
            await this.waitForElement(this.successElement);
            const header = await this.getText(this.successElement);
            const isSuccess = header.includes('Kişisel Bilgileriniz');
            logger.info(`Login verification result: ${isSuccess}`);
            return isSuccess;
        } catch (error) {
            logger.error('Failed to verify login success', { error: error.message });
            throw new Error(`Login verification failed: ${error.message}`);
        }
    }
}

module.exports = LoginPage; 