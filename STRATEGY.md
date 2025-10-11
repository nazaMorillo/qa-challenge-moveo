# qa-challenge-moveo
## Strategy & Performance

## 1. What to Automate and When

- **UI Tests**: Automate critical smoke scenarios (e.g., login, checkout) to run on every pull request for fast feedback. Schedule broader regression suites nightly to cover more user flows and edge cases.
- **API Tests**: Run contract and functional tests on pull requests to validate endpoints and data structures. Use data-driven regression tests nightly to ensure stability across varied payloads and scenarios.
- **Non-functional Tests**: Execute basic performance smoke tests before releases to catch major bottlenecks early.

## 2. CI/CD Integration (GitHub Actions)

- **a. Workflow Outline**:
    1. **Checkout Code**: Use `actions/checkout` to pull the latest code.
    2. **Install Dependencies**: Set up Node.js, Python, or other required environments.
    3. **Run API Tests**: Execute Newman collections (`newman run ...`) and upload results as artifacts.
    4. **Run UI Tests**: Execute Playwright tests, using sharding or parallelization (`npx playwright test --shard=...`). Store traces, videos, and logs.
    5. **Store Artifacts**: Use `actions/upload-artifact` to save test results, traces, and videos for later review.
    6. **Gate Merges**: Mark jobs as required checks in branch protection rules. Prevent merges unless all jobs pass.
    7. **Tag Flaky Tests**: Use Playwright's `test.fail()` or custom annotations to tag flaky tests. Track them separately to avoid blocking merges and prioritize fixing.

- **Example Workflow YAML**:
```yaml
name: QA Automation Pipeline

on:
  # Trigger the workflow on pushes and pull requests to the 'main' branch
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
    types: [ opened, synchronize, reopened ]

jobs:
  # JOB 1: API Testing with Newman
  api-tests:
    name: API Tests (Newman)
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Newman and Dependencies
        # Assuming collection and environment are in the /postman directory
        run: |
          npm install -g newman newman-reporter-htmlextra

      - name: Run Postman Collection with Newman
        # Adjust paths as necessary
        run: newman run ./postman/restful_booker_collection.json -e ./postman/restful_booker_env.json --reporters cli,htmlextra --reporter-htmlextra-export postman-reports/api-report.html

      - name: Store API Report Artifact
        uses: actions/upload-artifact@v4
        with:
          name: api-reports
          path: postman-reports/api-report.html
          retention-days: 7

  # JOB 2: Web UI Testing with Playwright (Parallelization/Sharding)
  ui-tests:
    name: UI Tests (Playwright - Parallel)
    runs-on: ubuntu-latest

    strategy:
      # Parallel execution strategy (sharding)
      fail-fast: false # Allow other shards to finish even if one fails
      matrix:
        # Create 3 parallel instances (shards)
        shard: [1, 2, 3]

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Dependencies (Playwright)
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: 🏃 Run UI Tests (Shard ${{ matrix.shard }})
        # The --shard flag splits tests for parallel execution.
        run: npx playwright test --shard ${{ matrix.shard }}/3 --reporter=json,list

      - name: Store Execution Artifacts (Traces, Videos, Screenshots)
        uses: actions/upload-artifact@v4
        if: always() # Upload artifacts even if the test fails (CRUCIAL for debugging)
        with:
          name: playwright-results-shard-${{ matrix.shard }}
          path: playwright-report/ # Default location for traces/videos/screenshots
          retention-days: 7
```
- **b. How you’d gate merges (required checks) and tag flaky tests.**:

#### Enforcing Merge Approval
- Mandatory Checks: Configure your version control system (e.g., GitHub) to enforce that specific automated checks must pass before a change can be merged.
- CI Pipeline: Ensure fast and stable API and unit tests run on every Pull Request (PR) to provide immediate feedback.
- Quality Control: Use this gating mechanism to enforce code quality, blocking merges when validation fails.
### Handling Flaky Tests
- Detection: Use your CI/CD tools to identify tests that fail inconsistently or randomly.
- Tagging: Label these tests to inform the team and manage them separately (e.g., flaky, investigate).
- Management: Automatically re-run failed tests and prioritize investigation for those confirmed as flaky to fix the root cause.
- Reporting: Track flaky tests to maintain confidence in the test automation and the overall pipeline. 

## 3. Performance Approach

**Tool**: 
- Tool Selection: The choice between Apache JMeter and Locust will depend on the team's preferences and the existing technology stack.
- Apache JMeter: This is the tool of choice if the team is more familiar with graphical user interfaces (GUIs) and prefers a tool with a long track record, a wide variety of features, and plugins.

- Locust: This is the option if the development team prefers to write tests as code, using Python. Being more lightweight, it's ideal for tests that require a lot of resources or for more complex test scenarios defined in code.

**Scenario**: 
- Simulate 20 Virtual Users with a 1-2 Minute Ramp-up, Followed by a Constant Load of 3-5 Minutes Against the /booking (create) Endpoint
- The approach is to execute a realistic, low-volume, yet sustained load test to evaluate the performance of the booking creation endpoint. This involves using a specific performance testing tool, configuring the user load to ramp up gradually, and monitoring key metrics on both the client and server sides to identify potential issues related to performance, stability, and scalability.

### Metrics to Monitor:

**p95 Latency (95th Percentile Response Time)**
- The maximum time it takes for 95% of all successful requests to be completed (excluding the slowest 5% which are often outliers).

- This metric is the most accurate measure of realistic User Experience (UX). If the p95 is acceptable, we know that the vast majority of our customers (95%) are receiving a fast and consistent service, making it better than simple average time (p50).

**Error Rate (% of Failed Requests)**
- The percentage of requests that result in a failure (HTTP codes 4xx or 5xx) relative to the total number of requests.
- It measures the system's reliability and stability under stress. A clear increase in the error rate under heavy load indicates that the system is failing to handle transactions correctly.

**Throughput (RPS - Requests Per Second)**
- The number of successfully completed transactions or requests that the system can handle per unit of time (usually per second).
- It is the primary measure of overall capacity and handling power. It allows us to determine how many simultaneous users the system can support before the quality of service begins to degrade.

**HTTP Status Codes**
- The standardized response codes from the server (e.g., 2xx for success, 3xx for redirection responses, 4xx for client error, 5xx for server error).
- Provides immediate diagnostics on the nature of the failure. An increase in 5xx under load almost always points to a bottleneck or failure in the backend or infrastructure, while 4xx may suggest data or authentication issues.

**Timeouts and Resource Saturation**
- Signals that the server is taking too long to respond (timeouts) and the exhaustion of internal resources (e.g., 100% CPU, database connection limits, full thread pools).
- These are the symptoms that precede a service collapse. They indicate that the system no longer has available resources to handle new requests, leading to system failure and user rejection.

### Test Data: 
Randomize payloads (names, dates, additional needs) and booking timestamps to mimic real-world usage and concurrent activity, avoiding caching and duplicate artifacts.

The collection is in the directory:
        qa-challenge-moveo/postman/LoadTest-RandomizePayloards

        BookerLoadTest.postman_collection.json