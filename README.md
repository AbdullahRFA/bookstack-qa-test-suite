# BookStack QA Test Suite & Test Automation Framework

Comprehensive Quality Assurance portfolio project for the [BookStack](https://demo.bookstackapp.com/) platform. This project encompasses manual functional validation, boundary testing, structured defect documentation, and an automated regression test suite using **Playwright (JavaScript)** with the **Page Object Model (POM)**.

---

## 📌 Repository Overview

| Directory / File | Description | Deliverables |
| :--- | :--- | :--- |
| [`manual-testing/`](./manual-testing/) | Manual test design & execution | `Test_Cases.md`, `BookStack_Test_Cases.xlsx` |
| [`bug-reports/`](./bug-reports/) | Documented defects & visual evidence | `Bug_Report.md`, `BookStack_Bug_Reports.xlsx`, screenshots |
| [`automation/`](./automation/) | Playwright POM automated test suite | `Automation_Strategy.md`, specs, page objects, allure config |

---

## 🛠️ Tech Stack & Tooling

- **Application Under Test:** BookStack (Demo Environment)
- **Manual Testing:** Test design (BVA, Equivalence Partitioning, Negative, Edge cases), Excel tracking
- **Automation Framework:** Playwright (JavaScript)
- **Design Pattern:** Page Object Model (POM)
- **Reporting:** Playwright HTML Reporter, Allure Report
- **Version Control:** Git & GitHub

---

## 🚀 Automation Suite Setup & Execution

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
git clone git@github.com:AbdullahRFA/bookstack-qa-test-suite.git
cd bookstack-qa-test-suite
npm install
npx playwright install --with-deps