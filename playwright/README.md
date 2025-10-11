
# QA Challenge Moveo - Playwright Suite

## Quick Start

### 1. Install Git

**Windows:**
1. Download Git from [git-scm.com](https://git-scm.com/download/win)
2. Run the installer and follow the setup wizard.

**Linux:**
```bash
sudo apt update
sudo apt install git
```

### 2. Clone the Project

Open your terminal in an empty folder and run:
```bash
git clone https://github.com/nazaMorillo/qa-challenge-moveo.git
```
---



## Installation & Running

### 1. Install Node.js

**Node.js** is required to run Playwright. Download it from the official site:

- [Download Node.js (LTS)](https://nodejs.org/en/download)

Steps:
1. Go to https://nodejs.org/en/download
2. Download the recommended LTS version for your operating system.
3. Install following the setup wizard.
4. Verify installation in your terminal:
  ```bash
  node --version
  npm --version
  ```

  **Linux:**
```bash
# Download and install nvm:
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# is not necesary reboot the shell
\. "$HOME/.nvm/nvm.sh"
# Download and install Node.js:
nvm install 22
# Verify the Node.js version:
node -v # Should print "v22.20.0".
# Verify the npm version:
npm -v # Debería mostrar "10.9.3".
```

---

### 2. Install Playwright

**Playwright** is installed as a project dependency. You can do this with:

```bash
npm init playwright@latest
```
Or if you already have a project:
```bash
npm install -D @playwright/test
npx playwright install
```

This will install the required browsers and create the basic structure.

---

### 3. Install Project Dependencies

If you have already cloned the project, run:
```bash
npm ci
```
Or for local development:
```bash
npm install
```

---

### 4. Run the Tests

**Run all tests (headless mode by default):**
```bash
npx playwright test
```

**Run in headed mode (see the browser):**
```bash
npx playwright test --headed
```

**Run a single spec:**
```bash
npx playwright test tests/chekoutFlow.spec.ts
```

**Open Playwright Test UI:**
```bash
npx playwright test --ui
```

**View the HTML test report:**
```bash
npx playwright show-report
```

---

For more details, see the official documentation:
- [Playwright Introduction](https://playwright.dev/docs/intro)
- [Playwright Installation](https://playwright.dev/docs/installation)

## Running Headed vs. Headless

- **Headless (default):**
  ```bash
  npx playwright test
  ```
- **Headed (shows browser UI):**
  ```bash
  npx playwright test --headed
  ```

## Run a Single Spec

To run a specific test file:
```bash
npx playwright test tests/chekoutFlow.spec.ts
```
Or any other spec file:
```bash
npx playwright test tests/<spec-file>.spec.ts
```

## Playwright Test UI

To open the Playwright test runner UI:
```bash
npx playwright test --ui
```

---

## Stabilizing the Suite in CI

To ensure reliability and maintainability in CI pipelines:

- **Enable Screenshots & Video:**
  - Configure Playwright to capture screenshots and video on failure for easier debugging.
- **Retries:**
  - Use Playwright's `retries` option in `playwright.config.ts` to automatically retry flaky tests.
- **Trace Viewer:**
  - Enable trace collection to analyze failures with Playwright's trace viewer.
- **Reporting:**
  - Use Playwright's built-in HTML reports for visibility.
- **Test Data Management:**
  - Ensure tests use stable, isolated data to avoid flakiness.
- **Environment Consistency:**
  - Run tests in consistent environments (Docker, dedicated CI runners).

### Example Playwright Config for CI
```js
// playwright.config.ts
module.exports = {
  retries: 2, // Retry failed tests up to 2 times
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
};
```


## Notes

The following practices are recommended for stabilizing your test suite in CI:

- **Screenshots & Video:** Capture screenshots and video on test failure to support defect analysis and reporting.
- **Retries:** Use automatic retries for flaky tests, but always investigate and address root causes.
- **Trace Viewer:** Enable trace collection to provide detailed execution logs, supporting root cause analysis and reproducibility.
- **Test Independence:** Design tests to be independent and repeatable, minimizing shared state and dependencies.
- **Clear Assertions & Steps:** Use explicit assertions and well-defined test steps to improve reliability and facilitate debugging.
- **Stable Test Data:** Ensure test data is consistent and isolated to avoid flakiness.
- **Consistent Environments:** Run tests in controlled environments (e.g., Docker, CI runners) to reduce variability and increase reproducibility.
