# Test Cases & Execution Matrix: Page Creation & Publishing Lifecycle

## 1. Scope & Module Details
- **Application:** BookStack Demo (v24+)
- **Base URL:** https://demo.bookstackapp.com/
- **Target Module:** Page Creation, Draft Autosave, Tagging, and Publishing Lifecycle
- **Tester:** Abdullah Nazmus Sakib
- **Status Summary:** 8 Total Executed | 6 Passed | 2 Failed
- **Excel Spreadsheet:** `manual-testing/BookStack_Test_Cases.xlsx`

---

## 2. Test Execution Matrix

| Test ID | Module | Scenario Description | Test Type | Pre-conditions | Test Steps | Test Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-PAGE-001** | Page Editor | Verify successful creation and publishing of a standard page | Positive | User logged in as admin; inside existing book or chapter. | 1. Click "New Page".<br>2. Fill title and markdown/WYSIWYG body.<br>3. Click "Save Page". | Title: `Release Documentation v1.0`<br>Body: `Standard markdown text body.` | Page publishes successfully; permalink generated; success toast displayed. | Page created, URL slug generated, content displays cleanly. | **PASS** |
| **TC-PAGE-002** | Page Editor | Verify draft autosave persistence and session recovery | Positive | Editor opened for a new or existing draft. | 1. Type title and body text.<br>2. Wait 30 seconds without saving.<br>3. Navigate away.<br>4. Re-open page draft. | Title: `Draft Autosave Test`<br>Body: `Unsaved test draft content.` | Banner informs user of draft recovery; draft content restored intact. | Notification displayed; draft restored without data loss. | **PASS** |
| **TC-PAGE-003** | Page Editor | Verify validation blocking save when required Title is empty | Negative | In active page editor. | 1. Leave page title input empty.<br>2. Add text in body.<br>3. Click "Save Page". | Title: `[EMPTY]`<br>Body: `Body without title.` | Form submission blocked; inline error highlights required title. | Submission prevented; inline validation displayed. | **FAIL** |
| **TC-PAGE-004** | Attachments | Verify rejection of prohibited file formats in page attachments | Negative | Page in edit or view mode; Attachments drawer open. | 1. Open Attachments tab.<br>2. Attempt to upload an executable (`.exe` or `.sh`).<br>3. Submit file. | File: `payload_test.exe` | Upload rejected with error prompt indicating disallowed file format. | Rejected with system validation message. | **PASS** |
| **TC-PAGE-005** | Page Editor | Verify boundary length on Page Title (Upper limit 255 chars) | Boundary | In active page editor. | 1. Paste exactly 255 alphanumeric chars in Title.<br>2. Save page.<br>3. Attempt with 256 characters. | Length 255: `A` * 255<br>Length 256: `A` * 256 | 255 chars saved and displayed; 256th character truncated or blocked by validation. | 255 chars saved cleanly; 256th character restricted by `maxlength="255"`. | **PASS** |
| **TC-PAGE-006** | Metadata Tags | Verify handling of boundary tag names and values | Boundary | In active page editor; Tags drawer open. | 1. Enter empty tag name with valid value.<br>2. Enter valid tag name with empty value.<br>3. Save page. | Tag 1: Name: ``, Value: `Doc`<br>Tag 2: Name: `Category`, Value: `` | System ignores incomplete tag pair or saves valid key cleanly without errors. | Empty tag pair omitted; valid metadata saved. | **PASS** |
| **TC-PAGE-007** | Security | Verify script tag and raw HTML sanitization in Title (XSS check) | Edge Case | In active page editor. | 1. Enter script payload in Title.<br>2. Save and inspect rendered HTML. | Title: `<script>alert('XSS')</script>Test Page` | Input sanitized and escaped as HTML entity (`&lt;script&gt;`); no script executes. | Encoded as plain text; zero script execution. | **PASS** |
| **TC-PAGE-008** | UI Layout | Verify layout stability when Title contains unbroken 200+ characters | Edge Case | In active page editor. | 1. Enter unbroken 250-character string in Title.<br>2. Save page.<br>3. Inspect sidebar navigation and breadcrumbs. | Title: `SuperLongWordWithoutSpacesOrHyphens...` (250 chars) | Text breaks or truncates with ellipsis; sidebar width remains stable. | Text overflows navigation container, expanding sidebar and clipping content. | **FAIL** |