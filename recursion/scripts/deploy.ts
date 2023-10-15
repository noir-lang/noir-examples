import { writeFileSync } from 'fs';
const hardhat = require("hardhat") // damn commonjs

async function main() {
  // Deploy the verifier contract
  const Verifier = await hardhat.ethers.getContractFactory('UltraVerifier');
  const verifier = await Verifier.deploy();

  // Get the address of the deployed verifier contract
  const verifierAddr = await verifier.deployed();

  // Create a config object
  const config = {
    chainId: hardhat.ethers.provider.network.chainId,
    verifier: verifierAddr.address
  };

  // Print the config
  console.log('Deployed with', config);
  writeFileSync('utils/addresses.json', JSON.stringify(config), { flag: 'w' });
  process.exit();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
