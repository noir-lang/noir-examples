import '@nomicfoundation/hardhat-toolbox-viem';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-viem';

import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-plugin-noir';

import { task, subtask, vars } from 'hardhat/config';
import { TASK_COMPILE_SOLIDITY } from 'hardhat/builtin-tasks/task-names';
import path, { join } from 'path';
import { writeFile } from 'fs/promises';
import fs from 'fs';
import { resolve } from 'path';
import { writeFileSync } from 'fs';
import { Chain } from 'viem';
import merkle from '../utils/merkle.json';
import { toHex } from 'viem';
import { MESSAGE_TO_HASH } from './const.cjs';

subtask(TASK_COMPILE_SOLIDITY).setAction(async (_, { config }, runSuper) => {
  const superRes = await runSuper();

  try {
    await writeFile(join(config.paths.artifacts, 'package.json'), '{ "type": "commonjs" }');
  } catch (error) {
    console.error('Error writing package.json: ', error);
  }

  return superRes;
});

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.27',
    settings: {
      optimizer: { enabled: true, runs: 5000 },
    },
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    holesky: {
      url: 'https://holesky.drpc.org',
      accounts: vars.has('holesky') ? [vars.get('holesky')] : [],
    },
  },
  paths: {
    sources: './ethereum/contracts',
    tests: './ethereum/test',
    cache: './ethereum/cache',
    artifacts: './ethereum/artifacts',
    noir: './noir',
  },
  noir: {
    version: '1.0.0-beta.1',
  },
  mocha: {
    timeout: 1000000,
  },
};

task('deploy', 'Deploys a verifier contract').setAction(async (_, hre) => {
  try {
    const { LeanIMT } = await import('@zk-kit/lean-imt');
    const { BarretenbergSync, Fr } = await import('@aztec/bb.js');
    const bbSync = await BarretenbergSync.new();

    const poseidon = (a: bigint, b: bigint) => {
      const hash = bbSync.poseidon2Hash([new Fr(a), new Fr(b)]);
      return BigInt(hash.toString());
    };

    const contractsDir = resolve('packages', 'contracts');
    if (fs.existsSync(contractsDir)) fs.rmdirSync(contractsDir, { recursive: true });

    await hre.run('compile');

    let verifier = await hre.viem.deployContract('HonkVerifier');
    console.log(`Verifier deployed to ${verifier.address}`);

    const merkleTree = new LeanIMT(poseidon);
    merkleTree.insertMany(merkle.addresses.map(BigInt));

    const messageBytesHex = toHex(MESSAGE_TO_HASH, { size: 8 });

    // @ts-ignore
    const airdrop = await hre.viem.deployContract('AD', [
      toHex(merkleTree.root, { size: 32 }),
      messageBytesHex,
      verifier.address,
      '420000000000000000000000000000000000000',
    ]);

    const networkConfig = (await import(`viem/chains`))[hre.network.name] as Chain;
    const config = {
      name: hre.network.name,
      addresses: {
        verifier: verifier.address,
        airdrop: airdrop.address,
      },
      networkConfig,
    };

    console.log(
      `Attached to address ${airdrop.address} with verifier ${verifier.address} at network ${hre.network.name} with chainId ${networkConfig.id}...`,
    );
    writeFileSync(path.resolve(__dirname, 'deployment.json'), JSON.stringify(config), {
      flag: 'w',
    });
  } catch (error) {
    console.error('Error deploying contracts: ', error);
  }
});

export default config;
