#!/bin/bash

set -e

echo "🚀 Exporting Solidity verifier..."

bb write_solidity_verifier \
  -k ./target/vk \
  -o ./target/Verifier.sol

echo "✅ Verifier exported to ./target/Verifier.sol"
