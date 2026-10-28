# BookStack QA Test Suite & Test Automation Framework

[![Playwright Tests](https://img.shields.io/badge/Playwright-v1.40+-2EAD33?logo=playwright&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?logo=javascript&logoColor=black)]()
[![Reporting](https://img.shields.io/badge/Reporting-Allure%20%7C%20HTML-blue)]()
[![Platform](https://img.shields.io/badge/Target-BookStack%20Demo-0288D1)]()

Comprehensive Quality Assurance portfolio project for the [BookStack](https://demo.bookstackapp.com/) platform. This project encompasses manual functional validation, boundary testing, structured defect documentation, and an automated regression test suite using **Playwright (JavaScript)** with the **Page Object Model (POM)**.

---

## 📌 Repository Overview

| Directory / File | Description | Key Deliverables |
| :--- | :--- | :--- |
| [`manual-testing/`](./manual-testing/) | Manual test design, execution matrix, and BVA/edge cases | `Test_Cases.md`, `BookStack_Test_Cases.xlsx` |
| [`bug-reports/`](./bug-reports/) | Reproducible defect logs and evidence | `Bug_Report.md`, `BookStack_Bug_Reports.xlsx`, screenshots |
| [`automation/`](./automation/) | Playwright POM automated test suite and strategy | `Automation_Strategy.md`, specs, page objects |
| [`automation/report_Screenshot`](./docs/assets/) | Test execution reports and evidence screenshots | Playwright & Allure report artifacts |

---

## 🛠️ Tech Stack & Tooling

- **Application Under Test:** BookStack Demo Platform (`https://demo.bookstackapp.com/`)
- **Manual Testing:** Equivalence Partitioning, Boundary Value Analysis (BVA), Negative & Edge Case Validation, Excel Tracking
- **Automation Framework:** Playwright (JavaScript)
- **Architecture Pattern:** Page Object Model (POM)
- **Test Runner & Assertions:** Playwright Test Runner (`@playwright/test`)
- **Reporting Engine:** Playwright Native HTML Reporter & Allure Report (`allure-playwright`)
- **Version Control & CI:** Git, GitHub

---

## 🧪 Test Execution Summary

### 1. Manual Testing Breakdown (`manual-testing/`)
- **Total Test Cases Executed:** 8
- **Coverage Areas:** User journey happy paths, empty mandatory inputs, boundary limits (255 chars), XSS payload sanitization, and layout word-wrapping stress checks.
- **Artifacts:** Structured Markdown matrix and styled Excel workbook (`BookStack_Test_Cases.xlsx`).

### 2. Defect Analysis (`bug-reports/`)
- **Logged Defect:** `BUG-001` — Plain Text (.txt) page export collapses table structures into unaligned, delimiter-free text.
- **Classification:** Severity: *Minor* | Priority: *Medium*
- **Artifacts:** Markdown defect ticket with exact reproduction steps, fix suggestions, and linked Excel tracker.

### 3. Automated Test Scenarios (`automation/`)
- **Scenario 1:** Authentication Lifecycle (Login validation, session confirmation, and graceful logout).
- **Scenario 2:** Content Creation & Publishing (Book navigation, rich text authoring, slug persistence, and publish confirmation).
- **Scenario 3:** Global Entity Search (Keyword resolution, URL parameter encoding, and indexed result count verification).

---

## 📊 Test Execution Reports & Evidence

### Playwright HTML Report
Provides test execution traces, steps breakdown, video recordings, and failure snapshots.

![Playwright HTML Report](./automation/report_Screenshot/Playeright%20html%20report.png)

### Allure Executive Dashboard
Provides historical metrics, severity distribution, test suites hierarchy, and execution timelines.

![Allure Report Dashboard](./automation/report_Screenshot/Allure%20html%20report.png)

---

## 🚀 Setup & Execution Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (bundled with Node.js)

### 1. Clone & Install Dependencies
```bash
git clone git@github.com:AbdullahRFA/bookstack-qa-test-suite.git
cd bookstack-qa-test-suite
npm install
npx playwright install --with-deps
```

### 2. Execute Automated Tests
```bash
# Run all automated tests (Headless mode)
npx playwright test

# Run tests with visible browser window (Headed mode)
npx playwright test --headed

# Run tests in Playwright Interactive UI Mode
npx playwright test --ui

# Run only the BookStack regression spec
npx playwright test automation/tests/bookstack.spec.js
```

### 3. Generate & View Reports
Playwright Native HTML Report
```bash
# Serve the generated Playwright HTML report
npx playwright show-report
```

Allure Report
```bash
# Generate HTML report from allure-results
npx allure generate allure-results --clean -o allure-report

# Open and serve the Allure dashboard locally
npx allure open allure-report
```
---
## 📁 Framework Architecture

```bash

## 📁 Framework Architecture & Project Structure

```text
bookstack-qa-test-suite/
│
├── .gitignore                          # Git exclusion rules (node_modules, reports, caches)
├── LICENSE                             # MIT license distribution file
├── package.json                        # Node dependencies and project automation scripts
├── package-lock.json                   # Dependency lockfile ensuring reproducible builds
├── playwright.config.js                # Playwright execution, timeout, reporter & browser settings
├── README.md                           # Main documentation & testing summary
│
├── manual-testing/                     # Manual Testing Deliverables (Task 1)
│   ├── BookStack_Test_Cases.xlsx       # Formatted test case repository with execution results
│   └── Test_Cases.md                   # Markdown test matrix (Positive, Negative, Boundary, Edge)
│
├── bug-reports/                        # Defect Reporting & Tracking (Task 2)
│   ├── Bug_Report.md                   # Markdown defect ticket (BUG-001) with reproduction steps
│   ├── bug-reports_BookStack_Bug_Reports.xlsx # Defect tracking spreadsheet
│   └── evidence/                       # Visual proof validating logged defect
│       ├── BUG-001_Formated table on webpage.png
│       └── BUG-001_table_export_broken.png
│
├── automation/                         # Automated Testing Suite (Task 3: Playwright + POM)
│   ├── Automation_Strategy.md          # Candidate selection, BDD workflows & ROI justifications
│   ├── pages/                          # Page Object Model (POM) abstraction layers
│   │   ├── BasePage.js                 # Reusable base interactions, navigation & wait hooks
│   │   ├── LoginPage.js                # Auth page locators & session state management
│   │   ├── PageEditorPage.js           # Page creation, dynamic inputs & editor controls
│   │   └── SearchPage.js               # Global search input & query result locators
│   ├── tests/                          # E2E Test Specifications
│   │   └── bookstack.spec.js           # 3 automated business-critical scenarios
│   ├── report_Screenshot/              # High-resolution report evidence for portfolio/submission
│   │   ├── Allure html report.png      # Allure executive dashboard view
│   │   └── Playeright html report.png  # Native Playwright HTML test results run
│   └── utils/                          # Common test fixtures & shared helper utilities
│
├── allure-results/                     # Raw Allure test run metadata & attachments (Generated)
├── allure-report/                      # Standalone Allure HTML interactive report (Generated)
├── playwright-report/                  # Built-in Playwright HTML report (Generated)
└── test-results/                       # Traces, run artifacts, failure videos & snapshots
```

---

## 👤 Author

**Abdullah Nazmus Sakib**  
*Aspiring Software Engineer & Quality Assurance Enthusiast*  

- **GitHub:** [@AbdullahRFA](https://github.com/AbdullahRFA)
- **LinkedIn:** [Abdullah Nazmus Sakib](https://www.linkedin.com/in/abdullahrfa/)
- **Repository:** [bookstack-qa-test-suite](https://github.com/AbdullahRFA/bookstack-qa-test-suite)