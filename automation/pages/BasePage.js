class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async navigateTo(path = '') {
    await this.page.goto(path);
  }

  async waitForToastNotification() {
    const toast = this.page.locator('.notification, .toast, [role="alert"]');
    await toast.first().waitFor({ state: 'visible', timeout: 5000 });
    return toast.first();
  }
}

module.exports = BasePage;