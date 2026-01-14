import { test, expect, Page } from '@playwright/test';

// Next.js version
test('proof verification works in the browser', async ({ page }: { page: Page }) => {
    
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForSelector('#generateProofBtn');
    
    await page.click('#generateProofBtn');
    
    // Wait for proof generation to start
    await expect(page.locator('#result')).toContainText('Generating proof...', { timeout: 10000 });
    
    // Wait for the result to contain 'Verified:' with 5 minute timeout
    let resultText = '';
    try {
        await expect(page.locator('#result')).toContainText('Verified:', { timeout: 300000 });
        resultText = await page.locator('#result').innerText();
    } catch (e) {
        // Debug: print the current contents of #result if the check fails
        resultText = await page.locator('#result').innerText();
        throw e;
    }
    // Check that the result contains 'Verified: true' (or similar)
    expect(resultText).toMatch(/Verified:\s*(true|1)/i);
});

test('proof is correctly verified server side using Pages Router', async () => {
    // Import dependencies for proof generation
    const { Barretenberg, UltraHonkBackend } = await import('@aztec/bb.js');
    const { Noir } = await import('@noir-lang/noir_js');

    // Import circuit data
    const circuit = await import('../../../circuits/target/noir_uh_starter.json', { with: { type: 'json' } });

    // Prepare inputs matching the circuit
    const api = await Barretenberg.new({ threads: 8 });
    const noir = new Noir(circuit.default as any);
    const honk = new UltraHonkBackend(circuit.default.bytecode, api);
    const inputs = { x: 3, y: 3 };
    const { witness } = await noir.execute(inputs);
    const { proof, publicInputs } = await honk.generateProof(witness);

    // POST to the Pages Router API endpoint
    const res = await fetch('http://localhost:3002/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proof, publicInputs })
    });
    const data = await res.json();
    expect(data.verified).toBe(true);
}); 