// playwright.config.js
// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    webServer: {
        command: 'yarn build && yarn serve',
        port: 5173,
        timeout: 180 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL: 'http://localhost:5173',
        headless: true,
    },
    projects: [
        {
            name: 'chromium', use: { browserName: 'chromium' }},
        {
            name: 'firefox',
            use: { browserName: 'firefox' }
        },
        { name: 'webkit', use: { browserName: 'webkit' } },
    ],
};

module.exports = config; 