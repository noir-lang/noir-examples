import { parentPort } from 'worker_threads';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

function generateEthereumAddresses(count: number) {
  const addresses = [];
  for (let i = 0; i < count; i++) {
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);
    addresses.push(account.address);
  }
  return addresses;
}

parentPort!.on('message', count => {
  const addresses = generateEthereumAddresses(count);
  parentPort!.postMessage(addresses);
  parentPort?.close();
});
