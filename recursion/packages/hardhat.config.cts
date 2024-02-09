import '@nomicfoundation/hardhat-toolbox-viem';
import '@nomicfoundation/hardhat-viem';
import '@nomicfoundation/hardhat-chai-matchers';

import { HardhatUserConfig } from 'hardhat/config';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { subtask } from 'hardhat/config';
import { TASK_COMPILE_SOLIDITY } from 'hardhat/builtin-tasks/task-names';

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
    version: '0.8.18',
    settings: {
      optimizer: { enabled: true, runs: 5000 },
    },
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    hardhat: {
      mining: {
        auto: true,
        interval: 1000,
      },
    },
  },
  mocha: {
    timeout: 200000,
  },
  paths: {
    sources: './noir/recursion/contract/recursion',
    artifacts: './hardhat/artifacts',
    cache: './hardhat/cache',
    tests: './hardhat/test',
  },
};

export default config;
