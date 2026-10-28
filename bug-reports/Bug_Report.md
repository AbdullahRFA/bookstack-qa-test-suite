# Defect Report: BookStack Demo Application

## Defect Summary Table

| Defect ID | Title | Module | Severity | Priority | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-001** | Plain Text (.txt) page export collapses table structures into unaligned, delimiter-free text | Export Engine / Data Formatting | Minor | Medium | Open |

---

## Detailed Bug Record

### **BUG-001: Table Structure and Data Boundaries Lost in Plain Text (.txt) Export**

- **Bug ID:** `BUG-001`
- **Application Under Test:** BookStack Demo (v24+)
- **Base URL:** `https://demo.bookstackapp.com/`
- **Reported By:** Abdullah Nazmus Sakib
- **Date Logged:** October 2026
- **Environment:**
  - **OS:** macOS / Windows
  - **Browser:** Google Chrome (Latest Version) / Mozilla Firefox
  - **Export Format Tested:** Plain Text (`.txt`)
- **Severity:** **Minor** (Core page creation and viewing remain fully operational; export formatting for tabular content is degraded)
- **Priority:** **Medium** (Users relying on plain text exports, terminal reading, or raw documentation archives lose data readability)

---

### Description
When a BookStack page containing a standard table element is exported via the **Export -> Plain Text** feature, the export parser strips out all table formatting without introducing tab stops, whitespace padding, or markdown table delimiters (`|`, `---`). 

As a result, table headers, column entries, and adjacent row values run together into an unstructured stream of text, destroying the relationship between columns and rows and making data interpretation impossible without referencing the web UI.

---

### Pre-conditions
1. User is authenticated with permissions to create or view pages.
2. A page exists containing a table element with at least 2 columns and 2 rows populated with distinct text data.

---

### Steps to Reproduce
1. Log in to `https://demo.bookstackapp.com/` as `admin@example.com`.
2. Navigate to any existing book and click **New Page** (or edit an existing test page).
3. In the WYSIWYG/Markdown editor toolbar, click the **Table** icon and insert a `3x3 Table`.
4. Populate the header row (`Feature`, `Status`, `Severity`) and two rows of sample data:
   - Row 1: `Login Module`, `Passed`, `None`
   - Row 2: `Checkout Flow`, `Failed`, `Critical`
5. Click **Save Page**.
6. On the right-hand **Actions** sidebar, click **Export** -> select **Plain Text**.
7. Open the downloaded `.txt` file in any text editor.

---

### Expected Result
The plain text converter should preserve tabular relationships by:
- Converting the table to standard ASCII/Markdown table syntax (using pipes `|` and dashes `-`), OR
- Using tab stops (`\t`) or aligned whitespace padding between columns and newline breaks (`\n`) between rows.

*Example Expected Plain Text Output:*
```text
| Feature       | Status | Severity |
|---------------|--------|----------|
| Login Module  | Passed | None     |
| Checkout Flow | Failed | Critical |