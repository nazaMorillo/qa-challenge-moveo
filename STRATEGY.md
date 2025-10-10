# qa-challenge-moveo
## Strategy & Performance

### 1. What to Automate and When

- **UI Tests**: Automate critical smoke scenarios (e.g., login, checkout) to run on every pull request for fast feedback. Schedule broader regression suites nightly to cover more user flows and edge cases.
- **API Tests**: Run contract and functional tests on pull requests to validate endpoints and data structures. Use data-driven regression tests nightly to ensure stability across varied payloads and scenarios.
- **Non-functional Tests**: Execute basic performance smoke tests before releases to catch major bottlenecks early.

### 2. CI/CD Integration (GitHub Actions)

- **Workflow Outline**:
    1. **Checkout Code**: Use `actions/checkout` to pull the latest code.
    2. **Install Dependencies**: Set up Node.js, Python, or other required environments.
    3. **Run API Tests**: Execute Newman collections (`newman run ...`) and upload results as artifacts.
    4. **Run UI Tests**: Execute Playwright tests, using sharding or parallelization (`npx playwright test --shard=...`). Store traces, videos, and logs.
    5. **Store Artifacts**: Use `actions/upload-artifact` to save test results, traces, and videos for later review.
    6. **Gate Merges**: Mark jobs as required checks in branch protection rules. Prevent merges unless all jobs pass.
    7. **Tag Flaky Tests**: Use Playwright's `test.fail()` or custom annotations to tag flaky tests. Track them separately to avoid blocking merges and prioritize fixing.

- **Example Workflow YAML**:
    ```yaml
    name: QA Pipeline
    on: [pull_request, schedule]
    jobs:
      api-tests:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - name: Install Node.js
            uses: actions/setup-node@v4
          - run: npm ci
          - run: newman run tests/api_collection.json
          - uses: actions/upload-artifact@v4
            with:
              name: api-results
              path: results/
      ui-tests:
        runs-on: ubuntu-latest
        strategy:
          matrix:
            shard: [1, 2]
        steps:
          - uses: actions/checkout@v4
          - name: Install dependencies
            run: npm ci
          - run: npx playwright test --shard=${{ matrix.shard }}
          - uses: actions/upload-artifact@v4
            with:
              name: ui-artifacts
              path: test-results/
    ```

### 3. Performance Approach

- **Tool Selection**: Use Apache JMeter or Locust (Python) based on team expertise and integration needs.
- **Scenario**: Simulate 20 virtual users with a 1–2 minute ramp-up, then maintain a steady load for 3–5 minutes targeting the `/booking` (create) endpoint.
- **Metrics to Monitor**:
    - p95 latency for realistic user experience.
    - Error rate (% failed requests).
    - Throughput (requests per second).
    - HTTP status codes (2xx, 4xx, 5xx).
    - Timeouts and resource saturation signals (connection limits, dropped requests).
- **Test Data**: Randomize payloads (names, dates, additional needs) and booking timestamps to mimic real-world usage and concurrent activity, avoiding caching and duplicate artifacts.
