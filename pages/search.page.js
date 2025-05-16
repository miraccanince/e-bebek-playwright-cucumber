const BasePage = require('./base.page');

class SearchPage extends BasePage {
    constructor(page) {
        super(page);
        this.searchInput = 'input[role="textbox"][name="Ara"]';
        this.productBrand = 'h2.product-item__brand';
        this.searchResults = 'h2.product-item__brand';
    }

    async searchProduct(productName) {
        await this.page.getByRole('textbox', { name: 'Ara' }).click();
        await this.page.getByRole('textbox', { name: 'Ara' }).fill(productName);
        await this.page.getByRole('textbox', { name: 'Ara' }).press('Enter');
        await this.page.waitForLoadState('networkidle');
    }

    async verifySearchResults() {
        await this.waitForElement(this.searchResults);
        const resultsCount = await this.page.locator(this.searchResults).count();
        console.log(`Found ${resultsCount} search results`);
        return resultsCount > 0;
    }

    async selectFirstProduct() {
        await this.page.locator(this.productBrand).first().click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = SearchPage; 