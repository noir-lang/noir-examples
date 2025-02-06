import { Worker, parentPort } from 'worker_threads';
import fs from 'fs';
import { resolve } from 'path';

const numCPUs = require('os').cpus().length;

const depth = process.env.MERKLE_TREE_DEPTH as unknown as number;
const totalAddresses = Math.pow(2, depth);
const addressesPerThread = totalAddresses / numCPUs;

const workers = [];
const addresses: string[] = [];

for (let i = 0; i < numCPUs; i++) {
  const worker = new Worker(resolve(__dirname, './generateAddressesWorker.ts'));
  worker.on('message', result => {
    addresses.push(...result);
    if (addresses.length === totalAddresses) {
      addresses.pop();
      console.log('Finished generating', addresses.length, 'addresses');
      fs.writeFileSync(resolve(__dirname, '../merkle.json'), JSON.stringify({ depth, addresses }));
      worker.terminate();
      process.exit(0);
    }
  });
  worker.postMessage(addressesPerThread);
  workers.push(worker);
}
