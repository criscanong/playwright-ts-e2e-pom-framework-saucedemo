# Playwright TS E2E Framework - SauceDemo

<p align="center">

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=node.js&logoColor=white)
![Tests](https://img.shields.io/badge/Automated%20Tests-25%2F25-success)
![Coverage](https://img.shields.io/badge/Regression%20Coverage-100%25-brightgreen)
![Architecture](https://img.shields.io/badge/Architecture-POM%20%7C%20Component%20Model-orange)
![Allure](https://img.shields.io/badge/Reports-Allure-blue)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen)

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
* ✅ Custom Playwright Fixtures with `test.extend()`
* ✅ StorageState for session reuse across tests
* ✅ Multi-step checkout with dedicated Page Objects per screen
* ✅ Feature-based project organization
* ✅ Strongly typed domain models
* ✅ Reusable business methods
* ✅ Semantic locators
* ✅ Scoped locators
* ✅ Dynamic locator strategies
* ✅ Randomized test execution
* ✅ Bulk operation support
* ✅ Business-oriented test design
* ✅ Allure Report + Playwright HTML Report
* ✅ Screenshot capture on every step
* ✅ Cross-browser support (Chromium, Firefox, WebKit)
* ✅ CI/CD ready structure

---

# 🧠 Tech Stack

* Playwright
* TypeScript
* Node.js
* npm
* Allure Report

---

# 🏛 Architecture

The framework follows a layered architecture that separates responsibilities and encourages code reuse.

## Page Object Model (POM)

Each page encapsulates:

* Locators
* Business actions
* Business queries

Pages:

* `LoginPage`
* `InventoryPage`
* `CartPage`
* `CheckoutStepOnePage`
* `CheckoutStepTwoPage`
* `CheckoutCompletePage`

---

## Component Object Model

Reusable UI components shared across pages.

Current implementation:

* `HeaderComponent`

This avoids duplicating common functionality such as navigating to the shopping cart or validating the cart badge.

---

## Custom Fixtures

Page objects are injected via `test.extend<PageFixtures>()`, eliminating boilerplate instantiation from every spec. Authentication state is saved once via `storageState` and reused across all authenticated tests — no login on every test.

```typescript
test("TC10", async ({ inventoryPage, cartPage }) => {
    // inventoryPage is already at /inventory.html
    // session is already authenticated
});
```

---

## Domain Models

Business entities are represented through reusable TypeScript types.

Current model:

* `InventoryProduct` — carries `productCard`, `productName`, `productDescription`, `productPrice` (as `number`)

This allows methods to exchange meaningful business objects instead of isolated primitive values.

---

## Price Utilities

A shared `parsePriceLabel()` utility in `utils/parsers.ts` handles price string-to-number conversion across all page objects, following a functional, point-free approach.

---

# 📁 Project Structure

```text
project/
│
├── components/
│   └── HeaderComponent.ts
│
├── docs/
│   └── test-cases.md
│
├── pages/
│   ├── checkout/
│   │   ├── CheckoutStepOnePage.ts
│   │   ├── CheckoutStepTwoPage.ts
│   │   └── CheckoutCompletePage.ts
│   ├── CartPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
│
├── tests/
│   ├── fixtures/
│   │   ├── auth.setup.ts
│   │   └── pages.fixture.ts
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
│   ├── parsers.ts
│   ├── screenshot.ts
│   └── test-data.ts
│
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

# 🏛 Architecture Decision Record

## Why Playwright over Selenium?

| Criteria | Playwright | Selenium |
|---|---|---|
| Setup | Zero config, browsers bundled | Requires WebDriverManager or manual driver setup |
| Auto-waiting | Built-in, no explicit waits needed | Manual `FluentWait` / `WebDriverWait` required |
| Locator strategy | Semantic (`getByRole`, `getByText`) | CSS / XPath |
| Parallelism | Native, context-level isolation | Requires Grid or manual threading |
| TypeScript support | First-class | Via bindings, less idiomatic |
| Trace & debugging | Built-in Trace Viewer | Third-party tooling |
| storageState | Native session reuse | Manual cookie injection |

**Playwright was chosen** because this framework targets modern web apps where speed, reliability, and developer experience matter. Selenium remains the right choice for legacy apps, Java-first teams, or environments requiring IE/Edge legacy support — which is why a parallel Selenium + Java framework is maintained in this portfolio.

---

# 🧪 Regression Suite Coverage

## Authentication

| ID | Test Case | Status |
|---|---|---|
| TC01 | Successful login | ✅ |
| TC02 | Locked user | ✅ |
| TC03 | Invalid user | ✅ |
| TC04 | Missing password | ✅ |
| TC05 | Missing username | ✅ |

## Inventory

| ID | Test Case | Status |
|---|---|---|
| TC06 | Add random product | ✅ |
| TC07 | Remove random product | ✅ |
| TC08 | Add all products | ✅ |
| TC09 | Remove all products | ✅ |
| TC16 | Sort A-Z | ✅ |
| TC17 | Sort Z-A | ✅ |
| TC18 | Sort price low to high | ✅ |
| TC19 | Sort price high to low | ✅ |

## Cart

| ID | Test Case | Status |
|---|---|---|
| TC10 | View added product | ✅ |
| TC11 | Remove product | ✅ |
| TC12 | View multiple products | ✅ |
| TC13 | Remove multiple products | ✅ |

## Checkout

| ID | Test Case | Status |
|---|---|---|
| TC14 | Checkout with one product | ✅ |
| TC15 | Checkout with multiple products | ✅ |

---

# 📊 Coverage Summary

| Metric | Value |
|---|---:|
| Planned Test Cases | 25 |
| Automated | 25 |
| Coverage | 100% |
| Browsers | Chromium · Firefox · WebKit |

---

# ✅ Automation Techniques Implemented

* Page Object Model (POM)
* Component Object Model
* Custom Playwright fixtures (`test.extend()`)
* StorageState for session reuse
* Multi-step checkout with dedicated Page Objects
* Strong typing with TypeScript
* Business object modeling (`InventoryProduct`)
* Reusable business methods
* Dynamic locators
* Scoped locators
* Semantic locators (`getByRole`, `getByText`, `getByPlaceholder`)
* Data-driven approach (`users`, `customer` in `test-data.ts`)
* Randomized test execution
* Bulk operations
* Assertions with Playwright
* `test.step()` organization
* Manual screenshots on every step
* Business-oriented validations
* Price calculation validation (subtotal + tax = total)
* Functional utilities (`parsePriceLabel`, point-free style)

---

# 🚫 Anti-Patterns Avoided

* XPath abuse
* Fragile selectors
* Static waits (`waitForTimeout`)
* Test dependencies
* Login repetition on every test
* Monolithic checkout page object
* Logic inside test cases
* Duplicated locators
* Hardcoded test data
* Shared mutable state

---

# 📸 Reporting

The framework generates both **Allure Report** and **Playwright HTML Report**.

## Allure Report

```bash
npm run allure:generate
npm run allure:open
```

Or serve results directly:

```bash
npm run allure:serve
```

Includes:

* Test execution summary with pass/fail metrics
* Step-by-step visual timeline
* Screenshots attached per step
* Suite and behavior views
* Historical trend (when run in CI)

## Playwright HTML Report

```bash
npm run test:report
```

---

# ⚙️ Setup

## Install dependencies

```bash
npm install
```

## Install browsers

```bash
npx playwright install
```

---

# ▶️ Running Tests

## Execute all tests

```bash
npm run test
```

## Execute a specific browser

```bash
npm run test:chromium
```

## Execute a specific feature

```bash
npx playwright test tests/e2e/inventory
```

## Execute a specific test

```bash
npx playwright test -g "TC08"
```

## Execute in UI Mode

```bash
npx playwright test --ui
```

## Execute in headed mode

```bash
npx playwright test --headed
```

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
* Session management via storageState
* Functional utilities

---

# 🚀 Roadmap

* ✅ Authentication automation
* ✅ Inventory automation
* ✅ Cart automation
* ✅ Checkout automation
* ✅ Inventory sorting validation
* ✅ Custom Playwright fixtures
* ✅ Allure reporting
* ⏳ GitHub Actions pipeline
* ⏳ Docker execution
* ⏳ Cross-browser pipeline in CI
* ⏳ Test tagging strategy (smoke / regression)
* ⏳ Environment configuration (.env)

---

# 👨‍💻 Author

Automation Engineer focused on building scalable, maintainable, and enterprise-ready test automation frameworks using modern testing tools and software engineering best practices.

---

# 📄 License

This project is intended for educational purposes, portfolio demonstrations, and technical interview discussions.