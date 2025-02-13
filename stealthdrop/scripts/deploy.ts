import { writeFileSync } from 'fs';
import hre from 'hardhat';
const { viem } = hre;
import { LeanIMT } from '@zk-kit/lean-imt';
import { poseidon } from '../utils/bb.js';
import merkle from '../utils/mt/merkle.json' with { type: 'json' };
import { hashMessage, toHex } from 'viem';
import { MESSAGE_TO_HASH } from '../utils/const.js';
import { Airdrop } from '../utils/airdrop.js';

async function main() {
  const publicClient = await viem.getPublicClient();

  const verifier = await viem.deployContract('HonkVerifier');
  console.log(`Verifier deployed to ${verifier.address}`);

  // Setup merkle tree
  const merkleTree = new LeanIMT(poseidon);
  merkleTree.insertMany(merkle.addresses.map(BigInt));

  // const hashedMessage = hashMessage(MESSAGE_TO_HASH);
  const messageBytesHex = toHex(MESSAGE_TO_HASH, { size: 8 });
  // const messageBytes = MESSAGE_TO_HASH.split('').map((s, i) => MESSAGE_TO_HASH.charCodeAt(i));

  console.log('hashedMessage', messageBytesHex);
  console.log('verifier', verifier.address);
  console.log('merkleRoot', toHex(merkleTree.root, { size: 32 }));
  console.log('amount', '3500000000000000000000');
  const airdrop = new Airdrop(
    messageBytesHex,
    verifier.address,
    toHex(merkleTree.root, { size: 32 }),
    '3500000000000000000000',
  );
  await airdrop.deploy();

  // Create a config object
  const config = {
    chainId: publicClient.chain.id,
    verifier: verifier.address,
    ad: airdrop.address,
  };

  // Print the config
  console.log('Deployed at', config);
  writeFileSync('utils/addresses.json', JSON.stringify(config), { flag: 'w' });
  process.exit();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
