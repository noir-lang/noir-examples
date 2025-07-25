// playwright.config.js
// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    webServer: {
        command: 'yarn dev',
        port: 5173,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL: 'http://localhost:5173',
        headless: true,
    },
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                launchOptions: {
                    args: ['--enable-features=SharedArrayBuffer']
                }
            }
        },
        {
            name: 'firefox',
            use: {
                browserName: 'firefox',
                launchOptions: {
                    firefoxUserPrefs: {
                        'javascript.options.shared_memory': true
                    }
                }
            }
        },
        // Skip webkit as it has limited support for SharedArrayBuffer/Web Workers used by Noir
        // { name: 'webkit', use: { browserName: 'webkit' } },
    ],
};

module.exports = config; 