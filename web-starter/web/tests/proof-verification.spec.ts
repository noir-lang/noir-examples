import { test, expect, Page } from '@playwright/test';

test('proof verification works in the browser', async ({ page }: { page: Page }) => {
    await page.goto('/');
    await page.click('#generateProofBtn');
    // Wait for the result to contain 'Verified:'
    await expect(page.locator('#result')).toContainText('Verified:');
    // Check that the result contains 'Verified: true' (or similar)
    const resultText = await page.locator('#result').innerText();
    expect(resultText).toMatch(/Verified:\s*(true|1)/i);
}); 