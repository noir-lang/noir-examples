import { writeFileSync } from 'fs';
import { viem } from 'hardhat';

async function main() {
  const publicClient = await viem.getPublicClient();

  const verifier = await viem.deployContract('UltraVerifier');
  console.log(`Verifier deployed to ${verifier.address}`);

  // Create a config object
  const config = {
    chainId: publicClient.chain.id,
    verifier: verifier.address,
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
