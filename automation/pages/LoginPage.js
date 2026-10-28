const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.locator('input#email, input[name="email"]');
    this.passwordInput = page.locator('input#password, input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In', exact: true });
    
    // Header elements
    this.userMenuButton = page.locator('header [refs="dropdown@toggle"]').first();
    this.logoutButton = page.locator('header form[action*="/logout"] button, header a[href*="/logout"]').first();
    this.headerLoginLink = page.locator('header a[href*="/login"]');
  }

  async login(email, password) {
    await this.navigateTo('/login');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async logout() {
    // Open user menu dropdown
    if (await this.userMenuButton.isVisible()) {
      await this.userMenuButton.click();
      await this.logoutButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.logoutButton.click();
    } else {
      // Fallback post direct logout if dropdown toggle not visible
      await this.page.goto('/logout');
    }
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = LoginPage;