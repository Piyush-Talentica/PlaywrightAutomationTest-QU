# PlaywrightDemo

This assignment demonstrates how to create UI tests using Playwright and JavaScript, following the Page Object Model (POM) framework. The project includes instructions for setting up and executing the tests.

## Project Structure

```
PlaywrightAutomationTest-QU/
├── allure-report/
├── allure-results/
├── node_modules/
├── pages/
│   ├── CheckoutPage.js
│   ├── GridPage.js
│   ├── LoginPage.js
│   └── searchPage.js
├── playwright-report/
├── resources/
│   ├── testDataCheckoutPage.json
│   ├── testDataGridPage.json
│   ├── testDataLoginPage.json
│   └── testDataSearchPage.json
├── tests-results/
├── tests/
│   ├── Checkout.spec.js
│   ├── grid.spec.js
│   ├── login_attempt.spec.js
│   └── search.spec.js
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
└── ReadMe.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone 
   cd PlaywrightAutomationTest-QU
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

## Running the Tests

### UI Tests

1. To run the UI tests:
   ```bash
   npx playwright test tests --config=playwright.config.js
   ```

2.2. The test results will be captured in [`test-results/.last-run.json`](./test-results/.last-run.json).

## Page Object Model

The POM framework is implemented in the [`pages/`](./pages) directory. Each page has its own class and methods to interact with the UI.

## Instructions to Execute Code

1. Clone the repository and install the dependencies.
2. use the command npx playwright test tests/Checkout.spec.js --headed  or replace the specfile with which you want to excute 
3. Run the tests using the Playwright CLI.
4. Please note UI tests are dependent on each other since we are writing data from one test to another, so it's recommended to run in serial mode only.
