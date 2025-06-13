import { test, expect, Page } from '@playwright/test';

// Webpack version
test('proof verification works in the browser', async ({ page }: { page: Page }) => {
    await page.goto('/');
    await page.click('#generateProofBtn');
    // Wait for the result to contain 'Verified:' with increased timeout
    let resultText = '';
    try {
        await expect(page.locator('#result')).toContainText('Verified:', { timeout: 30000 });
        resultText = await page.locator('#result').innerText();
    } catch (e) {
        // Debug: print the current contents of #result if the check fails
        resultText = await page.locator('#result').innerText();
        console.log('DEBUG: #result contents at failure:', resultText);
        throw e;
    }
    // Check that the result contains 'Verified: true' (or similar)
    expect(resultText).toMatch(/Verified:\s*(true|1)/i);
}); 