import { parentPort } from 'worker_threads';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

parentPort?.on('message', (count: number) => {
  try {
    const addresses: string[] = [];
    const batchSize = 100;

    for (let i = 0; i < count && i < 5000; i += batchSize) {
      const currentBatch = Math.min(batchSize, count - i);

      for (let j = 0; j < currentBatch; j++) {
        const privateKey = generatePrivateKey();
        const account = privateKeyToAccount(privateKey);
        addresses.push(account.address);
      }

      if (addresses.length >= batchSize) {
        parentPort?.postMessage(addresses);
        addresses.length = 0;
      }
    }

    if (addresses.length > 0) {
      parentPort?.postMessage(addresses);
    }

    // Signal that we're done
    process.exit(0);
  } catch (error) {
    console.error('Worker error:', error);
    process.exit(1);
  }
});
