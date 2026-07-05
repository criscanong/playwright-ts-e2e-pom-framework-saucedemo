# Playwright TS E2E Framework - SauceDemo

<p align="center">

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=node.js\&logoColor=white)
![Tests](https://img.shields.io/badge/Automated%20Tests-13%2F19-success)
![Coverage](https://img.shields.io/badge/Regression%20Coverage-68.4%25-blue)
![Architecture](https://img.shields.io/badge/Architecture-POM%20%7C%20Component%20Model-orange)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)

</p>

End-to-end UI automation framework built with **Playwright** and **TypeScript**, following modern automation architecture and enterprise-level best practices.

---

# 🚀 Overview

This project demonstrates how to build a **scalable, maintainable, and reusable UI automation framework** using Playwright.

Rather than focusing only on automating test cases, the project emphasizes clean architecture, reusable business components, and automation practices commonly adopted in enterprise environments.

The application under test is **SauceDemo**, which provides an excellent playground for implementing authentication, inventory management, shopping cart, and checkout flows.

---

# ⭐ Framework Highlights

* ✅ Playwright + TypeScript
* ✅ Page Object Model (POM)
* ✅ Component Object Model
* ✅ Feature-based project organization
* ✅ Strongly typed domain models
* ✅ Reusable business methods
* ✅ Semantic locators
* ✅ Scoped locators
* ✅ Dynamic locator strategies
* ✅ Randomized test execution
* ✅ Bulk operation support
* ✅ Business-oriented test design
* ✅ Rich HTML reports
* ✅ Screenshot capture
* ✅ Ready for CI/CD integration

---

# 🧠 Tech Stack

* Playwright
* TypeScript
* Node.js
* npm

---

# 🏛 Architecture

The framework follows a layered architecture that separates responsibilities and encourages code reuse.

## Page Object Model (POM)

Each page encapsulates:

* Locators
* Business actions
* Business queries

Examples:

* LoginPage
* InventoryPage
* CartPage
* CheckoutPage

---

## Component Object Model

Reusable UI components shared across pages.

Current implementation:

* HeaderComponent

This avoids duplicating common functionality such as navigating to the shopping cart or validating the cart badge.

---

## Domain Models

Business entities are represented through reusable TypeScript types.

Current model:

* InventoryProduct

This allows methods to exchange meaningful business objects instead of isolated primitive values.

---

# 📁 Project Structure

```text
project/
│
├── docs/
│   └── test-cases.md
│
├── pages/
│   ├── components/
│   │   └── HeaderComponent.ts
│   │
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/
│   └── e2e/
│       ├── auth/
│       ├── inventory/
│       ├── cart/
│       └── checkout/
│
├── types/
│   └── InventoryProduct.ts
│
├── utils/
│   ├── screenshot.ts
│   └── test-data.ts
│
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

# 🧪 Regression Suite Coverage

## Authentication

| Test Case        | Status |
| ---------------- | ------ |
| Successful login | ✅      |
| Locked user      | ✅      |
| Invalid user     | ✅      |
| Missing username | ✅      |
| Missing password | ✅      |

---

## Inventory

| Test Case             | Status |
| --------------------- | ------ |
| Add random product    | ✅      |
| Remove random product | ✅      |
| Add all products      | ✅      |
| Remove all products   | ✅      |
| Sort A-Z              | ⏳      |
| Sort Z-A              | ⏳      |
| Sort Low to High      | ⏳      |
| Sort High to Low      | ⏳      |

---

## Cart

| Test Case                | Status |
| ------------------------ | ------ |
| View added product       | ✅      |
| Remove product           | ✅      |
| View multiple products   | ✅      |
| Remove multiple products | ✅      |

---

## Checkout

| Test Case                       | Status |
| ------------------------------- | ------ |
| Checkout with one product       | ⏳      |
| Checkout with multiple products | ⏳      |

---

# 📊 Current Progress

| Metric             | Value |
| ------------------ | ----: |
| Planned Test Cases |    19 |
| Automated          |    13 |
| Progress           | 68.4% |

---

# ✅ Automation Techniques Implemented

* Page Object Model
* Component Object Model
* Strong typing with TypeScript
* Business object modeling
* Reusable business methods
* Dynamic locators
* Scoped locators
* Semantic locators
* Data-driven approach
* Randomized test execution
* Bulk operations
* Assertions with Playwright
* `test.step()` organization
* Manual screenshots
* Business-oriented validations

---

# 📸 Reporting

The framework generates Playwright HTML reports.

Run:

```bash
npx playwright show-report
```

Reports include:

* Test execution summary
* Execution time
* Failure details
* Stack traces
* Attached screenshots

---

# ⚙️ Setup

## Install dependencies

```bash
npm install
```

---

## Install browsers

```bash
npx playwright install
```

---

# ▶️ Running Tests

## Execute all tests

```bash
npx playwright test
```

---

## Execute a specific feature

```bash
npx playwright test tests/e2e/inventory
```

---

## Execute a specific test

```bash
npx playwright test -g "TC08"
```

or

```bash
npx playwright test -g "Add all products"
```

---

## Execute in UI Mode

```bash
npx playwright test --ui
```

---

## Execute in headed mode

```bash
npx playwright test --headed
```

---

## Debug a test

```bash
npx playwright test --debug
```

---

# 📚 Test Documentation

Business test cases are documented in:

```text
docs/test-cases.md
```

Including:

* Functional area
* Priority
* Execution status
* Automation status
* Notes

---

# ✅ Best Practices Applied

* No hardcoded waits
* Explicit business methods
* Separation of actions and validations
* Minimal code duplication
* Reusable components
* Strong typing
* Clear naming conventions
* Semantic locators
* Dynamic locator strategies
* Business-oriented test scenarios
* Independent tests
* Parallel execution ready

---

# 🚫 Anti-Patterns Avoided

* XPath abuse
* Fragile selectors
* Static waits (`waitForTimeout`)
* Test dependencies
* Logic inside test cases
* Duplicated locators
* Hardcoded test data
* Shared mutable state

---

# 🏢 Enterprise Alignment

This project follows practices commonly found in enterprise automation frameworks:

* Layered architecture
* Separation of concerns
* Business abstraction
* Reusable components
* Typed domain models
* Maintainable Page Objects
* Scalable project organization
* CI/CD ready structure

---

# 🚀 Roadmap

Upcoming improvements include:

* Checkout automation
* Inventory sorting validation
* Custom Playwright fixtures
* API testing integration
* Environment configuration
* GitHub Actions pipeline
* Azure DevOps pipeline
* Docker execution
* Cross-browser pipeline
* Parallel execution optimization
* Code coverage metrics
* Allure reporting
* Test tagging strategy
* Smoke and Regression suites

---

# 👨‍💻 Author

Automation Engineer focused on building scalable, maintainable, and enterprise-ready test automation frameworks using modern testing tools and software engineering best practices.

---

# 📄 License

This project is intended for educational purposes, portfolio demonstrations, and technical interview discussions.
