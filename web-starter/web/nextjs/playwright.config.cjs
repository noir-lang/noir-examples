// playwright.config.js
// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    webServer: {
        command: 'yarn build && yarn start',
        port: 3000,
        timeout: 180 * 1000, // Increased to 3 minutes for CI
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
    },
    // Global test timeout increased for proof generation
    timeout: 300 * 1000, // 5 minutes
    expect: {
        timeout: 60 * 1000, // 1 minute for assertions
    },
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox', use: { browserName: 'firefox' } },
        { name: 'webkit', use: { browserName: 'webkit' } },
    ],
};

module.exports = config; 