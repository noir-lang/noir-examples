import { Worker } from 'worker_threads';
import fs from 'fs';
import { resolve } from 'path';
import eligible from './eligible.json' with { type: 'json' };

const numCPUs = require('os').cpus().length;
const depth = process.env.MERKLE_TREE_DEPTH as unknown as number;
const totalAddresses = Math.pow(2, depth) - 1;

const addresses: string[] = [...eligible];
const remainingAddresses = totalAddresses - addresses.length;

console.log(`Starting with ${addresses.length} eligible addresses`);
console.log(`Need to generate ${remainingAddresses} more addresses`);

let activeWorkers = 0;
let workersCompleted = 0;
const maxWorkers = Math.max(1, Math.min(numCPUs - 1, 4));

function checkCompletion() {
  if (addresses.length >= totalAddresses) {
    console.log(`Finished generating ${addresses.length} addresses`);
    console.log(`Total addresses: ${addresses.length}`);
    fs.writeFileSync(
      resolve(__dirname, './merkle.json'),
      JSON.stringify(
        {
          depth,
          addresses: addresses.slice(0, totalAddresses),
        },
        null,
        2,
      ),
    );
    process.exit(0);
  }
}

function spawnWorker(addressesToGenerate: number) {
  const worker = new Worker(resolve(__dirname, './generateAddressesWorker.ts'));
  activeWorkers++;

  worker.on('error', error => {
    console.error('Worker error:', error);
    worker.terminate();
    activeWorkers--;
    workersCompleted++;
    checkCompletion();
  });

  worker.on('exit', () => {
    workersCompleted++;
    checkCompletion();
  });

  worker.on('message', (result: string[]) => {
    const needed = totalAddresses - addresses.length;
    if (needed > 0) {
      addresses.push(...result.slice(0, needed));
    }

    console.log(
      `Generated ${result.length} addresses. Total: ${addresses.length}/${remainingAddresses}`,
    );

    if (addresses.length >= remainingAddresses) {
      worker.terminate();
      activeWorkers--;
      checkCompletion();
    }
  });

  worker.postMessage(addressesToGenerate);
}

// Initial spawn of workers
const initialBatchSize = Math.ceil(remainingAddresses / maxWorkers);
for (let i = 0; i < maxWorkers && addresses.length < remainingAddresses; i++) {
  spawnWorker(initialBatchSize);
}
