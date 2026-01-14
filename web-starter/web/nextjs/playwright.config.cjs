// playwright.config.js
// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    webServer: {
        command: 'yarn build && yarn start -p 3002',
        port: 3002,
        timeout: 180 * 1000, // Increased to 3 minutes for CI
    },
    use: {
        baseURL: 'http://localhost:3002',
        headless: true,
    },
    // Global test timeout for proof generation
    timeout: 300000, // 5 minutes
    expect: {
        timeout: 180 * 1000, // 3 minutes for assertions
    },
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox', use: { browserName: 'firefox' } },
        // WebKit skipped in CI due to high memory usage during proof generation
        ...(process.env.CI ? [] : /** @type {any} */ ([{ name: 'webkit', use: { browserName: 'webkit' } }])),
    ],
};

module.exports = config; 