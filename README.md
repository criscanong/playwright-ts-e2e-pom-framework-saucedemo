# Playwright TS E2E Framework - SauceDemo

End-to-end test automation framework built with Playwright and TypeScript, applying Page Object Model (POM), scalable architecture, and industry best practices.

---

## 🚀 Overview

This project demonstrates a **real-world automation framework** for UI testing using modern tooling and design patterns.
It focuses on maintainability, readability, and scalability — aligned with how automation is implemented in professional environments.

---

## 🧠 Tech Stack

* Playwright (E2E testing framework)
* TypeScript
* Node.js

---

## 🧱 Architecture & Design Patterns

### ✔ Page Object Model (POM)

Encapsulates UI elements and actions to promote reuse and maintainability.

### ✔ Feature-based structure

Tests are organized by business functionality rather than technical layers.

### ✔ Test isolation

Each test is independent and can run in parallel.

### ✔ Data-driven approach (ready)

Test data is centralized and reusable.

---

## 📁 Project Structure

```
project/
├── tests/
│   └── e2e/
│       ├── auth/
│       ├── inventory/
│       ├── cart/
│       └── checkout/
│
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── utils/
│   └── test-data.ts
│
├── docs/
│   └── test-cases.md
│
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## 🧪 Test Coverage (Regression Suite)

### 🔐 Authentication

* Successful login
* Failed login

### 🛒 Cart

* Add/remove product from inventory
* Add/remove product from cart

### 📦 Inventory

* Product sorting (A-Z, Z-A, price)

### 💳 Checkout

* Purchase with single product
* Purchase with multiple products

---

## 📊 Test Management

Test cases are documented in:

```
docs/test-cases.md
```

Including:

* Feature mapping
* Priority
* Execution status
* Automation status

---

## ⚙️ Setup

### 1. Install dependencies

```
npm install
```

### 2. Install Playwright browsers

```
npx playwright install
```

---

## ▶️ Running Tests

### Run all tests

```
npx playwright test
```

### Run with UI mode (recommended for debugging)

```
npx playwright test --ui
```

### Run specific test

```
npx playwright test -g "Login"
```

---

## 📸 Reporting

After execution:

```
npx playwright show-report
```

Includes:

* Test results
* Screenshots on failure
* Execution traces

---

## 🧠 Best Practices Applied

* No hardcoded waits (`waitForTimeout`)
* Use of semantic locators (`getByRole`, `getByText`)
* Clean separation of concerns
* Reusable page objects
* Clear test naming aligned with business intent
* Minimal duplication

---

## ⚠️ Anti-Patterns Avoided

* Tests calling other tests
* Fragile CSS/XPath selectors
* Logic inside test cases
* Hardcoded data scattered across tests

---

## 🏢 Real-World Alignment

This project simulates how automation is implemented in enterprise environments:

* Scalable folder structure
* Clear test strategy
* Maintainable codebase
* Ready for CI/CD integration

---

## 🚀 Future Improvements

* API testing integration
* CI/CD pipeline (GitHub Actions / Azure DevOps)
* Environment configuration (dev/qa/prod)
* Custom fixtures
* Advanced reporting

---

## 👨‍💻 Author

Automation Engineer focused on building scalable and maintainable test frameworks.

---

## 📌 Notes

This project is intended for:

* Learning advanced Playwright usage
* Demonstrating professional automation practices
* Portfolio and technical interviews
