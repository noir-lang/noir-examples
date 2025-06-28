#!/bin/bash
set -e

echo "Compiling circuit..."
if ! nargo compile; then
    echo "❌ Circuit compilation failed. Exiting..."
    exit 1
fi

echo "Generating verification key (vkey)..."
if ! bb write_vk --oracle_hash keccak -b ./target/prove_weighted_threshold_compliance.json -o ./target; then
    echo "❌ Failed to generate verification key. Exiting..."
    exit 1
fi

echo "Generating Solidity verifier contract..."
if ! bb write_solidity_verifier -k ./target/vk -o ../contract/Verifier.sol; then
    echo "❌ Failed to generate Solidity verifier. Exiting..."
    exit 1
fi

echo "✅ Build complete!"
