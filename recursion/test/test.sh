#!/bin/bash
export NODE_OPTIONS='--experimental-loader ts-node/esm/transpile-only --no-warnings=ExperimentalWarning'
export TS_NODE_PROJECT='tsconfig_hardhat.json'

# Compile contracts
hardhat compile

# Run deployment script
hardhat test
