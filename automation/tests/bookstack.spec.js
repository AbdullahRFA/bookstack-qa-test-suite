const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const PageEditorPage = require("../pages/PageEditorPage");
const SearchPage = require("../pages/SearchPage");

test.describe("BookStack E2E Quality Engineering Suite", () => {
  let loginPage;
  let pageEditorPage;
  let searchPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pageEditorPage = new PageEditorPage(page);
    searchPage = new SearchPage(page);
  });

  test("Scenario 1: Authentication lifecycle (Login and Session Termination)", async ({
    page,
  }) => {
    await loginPage.login("admin@example.com", "password");

    // Assert successful login state
    await expect(page).not.toHaveURL(/.*\/login/);
    await expect(loginPage.userMenuButton).toBeVisible();

    // Perform and assert clean logout
    await loginPage.logout();

    // BookStack demo redirects to homepage on logout, showing the guest login link
    await expect(loginPage.headerLoginLink).toBeVisible();
    await expect(loginPage.userMenuButton).not.toBeVisible();
  });

  test("Scenario 2: Content Lifecycle - Create and publish a documentation page", async ({
    page,
  }) => {
    const timestamp = Date.now();
    const testTitle = `Automated QA Test Page ${timestamp}`;
    const testBody = `Automated execution verifying page creation and persistence. Timestamp: ${timestamp}`;

    await loginPage.login("admin@example.com", "password");

    // Agturong a direkta iti panagaramid ti panid
    await page.goto("/books/admins-only-book/create-page");

    await pageEditorPage.createAndPublishPage(testTitle, testBody);

    // Panangikeddeng a naipablaak ti panid
    await expect(page).not.toHaveURL(/.*\/create-page/);
    await expect(pageEditorPage.pageHeading).toContainText(testTitle);
  });

  test("Scenario 3: Global Entity Search - Query resolution and result indexing", async ({
    page,
  }) => {
    await loginPage.login("admin@example.com", "password");

    await searchPage.search("Admin");

    await expect(page).toHaveURL(/.*search.*term=Admin/);
    await expect(searchPage.searchResults.first()).toBeVisible();
    const resultCount = await searchPage.searchResults.count();
    expect(resultCount).toBeGreaterThan(0);
  });
});
