const BasePage = require('./BasePage');

class PageEditorPage extends BasePage {
  constructor(page) {
    super(page);
    this.titleInput = page.locator('input[name="name"]');
    this.saveButton = page.locator('button[type="submit"]').filter({ hasText: /Save Page/i }).first();
    this.pageHeading = page.locator('h1.page-title, .page-header-title, main h1').first();
  }

  async createAndPublishPage(title, content) {
    await this.titleInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.titleInput.fill(title);

    // Check for TinyMCE iframe first
    const iframeElement = this.page.frameLocator('iframe#tinymce_ifr, iframe[id*="mce"]');
    const iframeBody = iframeElement.locator('body');

    if (await iframeBody.count() > 0 && await iframeBody.isVisible()) {
      await iframeBody.click();
      await iframeBody.fill(content);
    } else {
      // Fallback for markdown editor / textarea
      const markdownArea = this.page.locator('.CodeMirror-scroll, textarea#html-editor, textarea[name="markdown"]').first();
      if (await markdownArea.isVisible()) {
        await markdownArea.click();
        await this.page.keyboard.type(content);
      }
    }

    await this.saveButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = PageEditorPage;