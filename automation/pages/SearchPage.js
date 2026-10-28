const BasePage = require('./BasePage');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator('#header-search-box-input, input[name="search"]').first();
    this.searchResults = page.locator('.entity-list-item, .search-result-item, .entity-list .item-list');
  }

  async search(query) {
    await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = SearchPage;