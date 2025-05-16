const BasePage = require('./base.page');

class AccountPage extends BasePage {
    constructor(page) {
        super(page);
        this.accountMenu = 'text=Hesabım Siparişlerim Cüzdanım';
        this.logoutLink = 'a[role="link"]:has-text("Çıkış Yap")';
        this.loginLink = 'a[role="link"]:has-text("Giriş Yap / Hesap Oluştur")';
        this.profileHeader = 'h2.title';
    }

    async openAccountMenu() {
        await this.page.getByText('Hesabım Siparişlerim Cüzdanım').click();
    }

    async logout() {
        await this.openAccountMenu();
        await this.page.getByRole('link', { name: 'Çıkış Yap' }).click();
    }

    async verifyLogout() {
        await this.page.waitForSelector('a[role="link"]:has-text("Giriş Yap / Hesap Oluştur")');
    }

    async verifyProfilePage() {
        await this.waitForElement(this.profileHeader);
        const headerText = await this.getText(this.profileHeader);
        return headerText.includes('Kişisel Bilgileriniz');
    }
}

module.exports = AccountPage; 