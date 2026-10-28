# Test Automation Strategy & Candidate Selection

## 1. Framework Architecture Overview
- **Core Library:** Playwright (v1.40+)
- **Language:** JavaScript (ES6+ Modules / CommonJS)
- **Design Pattern:** Page Object Model (POM)
- **Assertion Engine:** Playwright built-in test assertions (`expect`)
- **Reporting:** Playwright HTML Reporter & Allure Report (`allure-playwright`)
- **Execution Target:** BookStack Demo (`https://demo.bookstackapp.com/`)

---

## 2. Selected Automation Candidates & Justifications

### Scenario 1: Authentication & Session Gate (Smoke Test)
- **Workflow:** User logs in with valid credentials, verifies redirection to the dashboard, confirms user profile avatar visibility, and tests session termination (logout).
- **Automation Test Steps:**
  1. Navigate to `/login`.
  2. Input valid credentials (`admin@example.com` / `password`).
  3. Click **Log In** button.
  4. Assert URL changes to root or dashboard path (`not.toContain('/login')`).
  5. Assert profile dropdown/avatar element is visible in the top header.
  6. Click user profile -> click **Log Out**.
  7. Assert redirection back to login view.
- **Why It Should Be Automated:**
  - **Critical Smoke Gate:** Acts as the blocker before any other E2E test runs; if auth fails, the entire suite should fail fast.
  - **High Execution Frequency:** Executed against every code push, pull request, and deployment environment.
  - **Zero Tolerance for Flakiness:** Low test maintenance, deterministic states, and immediate feedback.

---

### Scenario 2: End-to-End Page Lifecycle (Create, Edit, Publish & Content Verification)
- **Workflow:** Navigate to an existing Book, create a new draft page, populate title and body, save the page, and assert successful publication and URL slug generation.
- **Automation Test Steps:**
  1. Authenticate via reusable state or setup hook.
  2. Navigate to target Book details page (`/books/admins-only-book`).
  3. Click **New Page** button.
  4. Assert page editor is visible (`input[name="name"]`).
  5. Fill dynamic Title: `Automated Test Page - <timestamp>`.
  6. Fill Markdown/WYSIWYG content area.
  7. Click **Save Page** button.
  8. Assert notification toast message "Page successfully saved".
  9. Assert header text matches the generated dynamic title.
  10. Assert URL includes the generated slug.
- **Why It Should Be Automated:**
  - **Core Business Workflow:** Document management is the central function of BookStack.
  - **Regression Prevention:** Guards against breakages in editor state serialization, CSRF tokens, database write mutations, and slug generation logic.
  - **High Value-to-Effort Ratio:** Replaces tedious manual regression cycles before releases.

---

### Scenario 3: Global Entity Search & Filter Accuracy
- **Workflow:** Perform search queries using the global header search input, verify result accuracy, and validate item categorization filters.
- **Automation Test Steps:**
  1. Navigate to dashboard while authenticated.
  2. Locate search input in the global navigation bar (`header form input[name="search"]`).
  3. Enter search term: `Admin`.
  4. Press `Enter`.
  5. Assert search results page URL includes `/search?term=Admin`.
  6. Assert results count container is visible and displays at least 1 match.
  7. Assert returned card titles contain the keyword or expected entity tags.
- **Why It Should Be Automated:**
  - **Data Variation & Parameterization:** Manual search testing across multiple terms, characters, and filters is repetitive.
  - **High Risk of Regression:** Database indexing changes or backend query refactoring easily break search algorithms without obvious UI warnings.
  - **Speed & Isolation:** Search is read-only, non-destructive, and executes in milliseconds across parallel workers.