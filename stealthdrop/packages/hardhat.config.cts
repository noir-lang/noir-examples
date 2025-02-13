import '@nomicfoundation/hardhat-toolbox-viem';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-viem';

import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-plugin-noir';

import { subtask } from 'hardhat/config';
import { TASK_COMPILE_SOLIDITY } from 'hardhat/builtin-tasks/task-names';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import * as dotenv from 'dotenv';
dotenv.config();

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

export default config;
