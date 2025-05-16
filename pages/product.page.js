const BasePage = require('./base.page');

class ProductPage extends BasePage {
    constructor(page) {
        super(page);
        this.addToBasketButton = 'button:has-text("Sepete Ekle")';
        this.basketSuccessMessage = 'text=Ürün Sepete Eklendi!';
        this.goToBasketLink = 'a[role="link"]:has-text("Sepete Git")';
        this.basketHeader = 'h1:has-text("Sepetim (1)")';
    }

    async addToBasket() {
        await this.page.waitForSelector(this.addToBasketButton, { state: 'visible' });
        await this.page.locator(this.addToBasketButton).first().click();
        await this.page.waitForSelector(this.basketSuccessMessage, { timeout: 10000 });
    }

    async goToBasket() {
        await this.page.getByRole('link', { name: 'Sepete Git' }).click();
    }

    async verifyProductAdded() {
        await this.page.waitForSelector(this.basketHeader);
        return await this.page.isVisible(this.basketHeader);
    }
}

module.exports = ProductPage; 